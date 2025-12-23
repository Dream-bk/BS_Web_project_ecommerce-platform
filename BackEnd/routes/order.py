# back/routes/order.py
from datetime import datetime
import app

class Order(app.db.Model):
    __tablename__ = 'orders'
    id = app.db.Column(app.db.Integer, primary_key=True)
    order_number = app.db.Column(app.db.String(20), unique=True, nullable=False, comment='订单编号')
    user_id = app.db.Column(app.db.Integer, app.db.ForeignKey('users.id'), nullable=False, comment='用户ID')
    address_id = app.db.Column(app.db.Integer, app.db.ForeignKey('addresses.id'), nullable=False, comment='收货地址ID')
    total_amount = app.db.Column(app.db.Float, nullable=False, comment='订单总金额')
    status = app.db.Column(app.db.String(20), default='pending', comment='订单状态：pending/paid/shipped/delivered/completed/cancelled')
    payment_method = app.db.Column(app.db.String(50), comment='支付方式')
    created_at = app.db.Column(app.db.DateTime, default=datetime.utcnow, comment='创建时间')
    updated_at = app.db.Column(app.db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, comment='更新时间')
    
    items = app.db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Order {self.order_number} (User:{self.user_id})>'

class OrderItem(app.db.Model):
    __tablename__ = 'order_items'
    id = app.db.Column(app.db.Integer, primary_key=True)
    order_id = app.db.Column(app.db.Integer, app.db.ForeignKey('orders.id'), nullable=False, comment='订单ID')
    product_id = app.db.Column(app.db.Integer, app.db.ForeignKey('products.id'), nullable=False, comment='商品ID')
    quantity = app.db.Column(app.db.Integer, default=1, comment='商品数量')
    price = app.db.Column(app.db.Float, nullable=False, comment='下单时的商品价格')
    
    def __repr__(self):
        return f'<OrderItem {self.id} (Order:{self.order_id}, Product:{self.product_id})>'
