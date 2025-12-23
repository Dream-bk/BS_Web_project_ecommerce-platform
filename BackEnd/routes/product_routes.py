# back/routes/product_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from extensions import db
from models.product import Product

product_bp = Blueprint('product', __name__)

@product_bp.route('/products', methods=['GET'])
def get_products():
    page = int(request.args.get('page', 1))
    per_page = min(int(request.args.get('per_page', 10)), 50)
    category = request.args.get('category')
    keyword = request.args.get('keyword')
    
    query = Product.query.filter_by(is_active=True)
    if category:
        query = query.filter(Product.category == category)
    if keyword:
        query = query.filter(Product.name.like(f'%{keyword}%'))
    
    pagination = query.order_by(Product.created_at.desc()).paginate(page=page, per_page=per_page)
    products = pagination.items
    
    return jsonify({
        'success': True,
        'data': {
            'products': [{
                'id': p.id,
                'name': p.name,
                'price': p.price,
                'original_price': p.original_price,
                'category': p.category,
                'stock': p.stock,
                'image': p.image
            } for p in products],
            'pagination': {
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': page,
                'per_page': per_page
            }
        }
    })

@product_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product_detail(product_id):
    product = Product.query.filter_by(id=product_id, is_active=True).first_or_404()
    return jsonify({
        'success': True,
        'data': {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'original_price': product.original_price,
            'category': product.category,
            'stock': product.stock,
            'image': product.image,
            'created_at': product.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    })

@product_bp.route('/products', methods=['POST'])
@login_required
def add_product():
    if not current_user.is_admin:
        return jsonify({'success': False, 'message': '仅管理员可添加商品'}), 403
    
    data = request.get_json() or {}
    required_fields = ['name', 'price', 'stock']
    if not all(k in data for k in required_fields):
        return jsonify({'success': False, 'message': '缺少必填字段（名称/价格/库存）'}), 400
    
    if data['price'] <= 0 or data['stock'] < 0:
        return jsonify({'success': False, 'message': '价格必须>0，库存≥0'}), 400
    
    product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        original_price=data.get('original_price'),
        image=data.get('image', ''),
        category=data.get('category', ''),
        stock=data['stock']
    )
    db.session.add(product)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': '商品添加成功',
        'data': {'product_id': product.id}
    }), 201

@product_bp.route('/products/<int:product_id>', methods=['PUT'])
@login_required
def update_product(product_id):
    if not current_user.is_admin:
        return jsonify({'success': False, 'message': '仅管理员可更新商品'}), 403
    
    product = Product.query.get_or_404(product_id)
    data = request.get_json() or {}
    
    if 'name' in data:
        product.name = data['name']
    if 'price' in data and data['price'] > 0:
        product.price = data['price']
    if 'stock' in data and data['stock'] >= 0:
        product.stock = data['stock']
    if 'is_active' in data:
        product.is_active = data['is_active']
    
    db.session.commit()
    return jsonify({'success': True, 'message': '商品更新成功'})

@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    if not current_user.is_admin:
        return jsonify({'success': False, 'message': '仅管理员可删除商品'}), 403
    
    product = Product.query.get_or_404(product_id)
    product.is_active = False
    db.session.commit()
    
    return jsonify({'success': True, 'message': '商品已下架（逻辑删除）'})
