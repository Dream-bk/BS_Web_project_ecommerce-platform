# back/routes/cart_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from extensions import db
from models.cart import CartItem
from models.product import Product

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/cart', methods=['GET'])
@login_required
def get_cart():
    cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
    total_amount = 0.0
    items = []
    
    for item in cart_items:
        product = Product.query.get(item.product_id)
        if not product or not product.is_active:
            db.session.delete(item)
            db.session.commit()
            continue
        
        subtotal = product.price * item.quantity
        total_amount += subtotal
        items.append({
            'id': item.id,
            'product_id': product.id,
            'product_name': product.name,
            'product_image': product.image,
            'price': product.price,
            'quantity': item.quantity,
            'subtotal': round(subtotal, 2),
            'stock': product.stock
        })
    
    return jsonify({
        'success': True,
        'data': {
            'items': items,
            'total_amount': round(total_amount, 2),
            'total_quantity': sum(item['quantity'] for item in items)
        }
    })

@cart_bp.route('/cart', methods=['POST'])
@login_required
def add_to_cart():
    data = request.get_json() or {}
    required_fields = ['product_id', 'quantity']
    if not all(k in data for k in required_fields):
        return jsonify({'success': False, 'message': '缺少商品ID/数量'}), 400
    
    product_id = data['product_id']
    quantity = int(data['quantity'])
    
    if quantity <= 0:
        return jsonify({'success': False, 'message': '数量必须>0'}), 400
    
    product = Product.query.filter_by(id=product_id, is_active=True).first()
    if not product:
        return jsonify({'success': False, 'message': '商品不存在或已下架'}), 404
    if product.stock < quantity:
        return jsonify({'success': False, 'message': f'库存不足（当前{product.stock}）'}), 400
    
    cart_item = CartItem.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(
            user_id=current_user.id,
            product_id=product_id,
            quantity=quantity
        )
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify({'success': True, 'message': '添加到购物车成功'})

@cart_bp.route('/cart/<int:item_id>', methods=['PUT'])
@login_required
def update_cart_item(item_id):
    cart_item = CartItem.query.filter_by(id=item_id, user_id=current_user.id).first_or_404()
    data = request.get_json() or {}
    quantity = int(data.get('quantity', 1))
    
    if quantity <= 0:
        return jsonify({'success': False, 'message': '数量必须>0'}), 400
    
    product = Product.query.filter_by(id=cart_item.product_id, is_active=True).first()
    if not product:
        return jsonify({'success': False, 'message': '商品已下架'}), 404
    if product.stock < quantity:
        return jsonify({'success': False, 'message': f'库存不足（当前{product.stock}）'}), 400
    
    cart_item.quantity = quantity
    db.session.commit()
    
    return jsonify({'success': True, 'message': '购物车更新成功'})

@cart_bp.route('/cart/<int:item_id>', methods=['DELETE'])
@login_required
def delete_cart_item(item_id):
    cart_item = CartItem.query.filter_by(id=item_id, user_id=current_user.id).first_or_404()
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({'success': True, 'message': '商品已从购物车删除'})

@cart_bp.route('/cart/clear', methods=['POST'])
@login_required
def clear_cart():
    CartItem.query.filter_by(user_id=current_user.id).delete()
    db.session.commit()
    
    return jsonify({'success': True, 'message': '购物车已清空'})
