# back/routes/order_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from extensions import db
from models.order import Order, OrderItem
from models.cart import CartItem
from models.product import Product
from models.address import Address
import uuid
from datetime import datetime

order_bp = Blueprint('order', __name__)

def generate_order_no():
    return f"OD{datetime.now().strftime('%Y%m%d%H%M%S')}{str(uuid.uuid4().hex)[:4].upper()}"

@order_bp.route('/orders', methods=['POST'])
@login_required
def create_order():
    data = request.get_json() or {}
    required_fields = ['address_id', 'payment_method']
    if not all(k in data for k in required_fields):
        return jsonify({'success': False, 'message': '缺少地址ID/支付方式'}), 400
    
    address = Address.query.filter_by(id=data['address_id'], user_id=current_user.id).first()
    if not address:
        return jsonify({'success': False, 'message': '收货地址不存在'}), 404
    
    cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
    if not cart_items:
        return jsonify({'success': False, 'message': '购物车为空，无法创建订单'}), 400
    
    total_amount = 0.0
    order_items = []
    for item in cart_items:
        product = Product.query.filter_by(id=item.product_id, is_active=True).first()
        if not product:
            return jsonify({'success': False, 'message': f'商品ID{item.product_id}已下架'}), 404
        if product.stock < item.quantity:
            return jsonify({'success': False, 'message': f'商品「{product.name}」库存不足（当前{product.stock}）'}), 400
        
        total_amount += product.price * item.quantity
        order_items.append((product, item.quantity))
    
    order = Order(
        order_number=generate_order_no(),
        user_id=current_user.id,
        address_id=address.id,
        total_amount=round(total_amount, 2),
        payment_method=data['payment_method']
    )
    db.session.add(order)
    db.session.flush()
    
    for product, quantity in order_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=quantity,
            price=product.price
        )
        db.session.add(order_item)
        product.stock -= quantity
    
    CartItem.query.filter_by(user_id=current_user.id).delete()
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': '订单创建成功',
        'data': {
            'order_id': order.id,
            'order_number': order.order_number,
            'total_amount': order.total_amount,
            'status': order.status
        }
    }), 201

@order_bp.route('/orders', methods=['GET'])
@login_required
def get_orders():
    if current_user.is_admin:
        orders = Order.query.order_by(Order.created_at.desc()).all()
    else:
        orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.created_at.desc()).all()
    
    result = []
    for order in orders:
        items = []
        for item in order.items:
            product = Product.query.get(item.product_id)
            items.append({
                'product_id': item.product_id,
                'product_name': product.name if product else '已下架商品',
                'quantity': item.quantity,
                'price': item.price,
                'subtotal': round(item.price * item.quantity, 2)
            })
        
        result.append({
            'id': order.id,
            'order_number': order.order_number,
            'total_amount': order.total_amount,
            'status': order.status,
            'payment_method': order.payment_method,
            'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'items': items
        })
    
    return jsonify({
        'success': True,
        'data': {
            'orders': result,
            'total': len(result)
        }
    })

@order_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
@login_required
def update_order_status(order_id):
    if not current_user.is_admin:
        return jsonify({'success': False, 'message': '仅管理员可更新订单状态'}), 403
    
    order = Order.query.get_or_404(order_id)
    data = request.get_json() or {}
    new_status = data.get('status')
    
    valid_status = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
    if new_status not in valid_status:
        return jsonify({'success': False, 'message': f'无效状态，可选：{valid_status}'}), 400
    
    order.status = new_status
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': '订单状态更新成功',
        'data': {'order_number': order.order_number, 'new_status': new_status}
    })
