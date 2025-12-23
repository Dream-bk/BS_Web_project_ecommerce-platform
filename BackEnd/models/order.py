# back/models/order.py
from datetime import datetime
from extensions import db

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(30), unique=True, nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'),
        nullable=False
    )
    address_id = db.Column(
        db.Integer, db.ForeignKey('addresses.id', ondelete='SET NULL'),
        nullable=False
    )
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    payment_method = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    items = db.relationship(
        'OrderItem', backref='order', lazy='select',
        cascade='all, delete-orphan', passive_deletes=True
    )
    
    def __repr__(self):
        return f'<Order {self.order_number} ￥{self.total_amount} ({self.status})>'

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(
        db.Integer, db.ForeignKey('orders.id', ondelete='CASCADE'),
        nullable=False
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey('products.id', ondelete='SET NULL'),
        nullable=False
    )
    quantity = db.Column(db.Integer, default=1, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<OrderItem Order:{self.order_id} Product:{self.product_id} Qty:{self.quantity}>'
