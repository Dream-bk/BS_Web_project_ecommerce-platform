# back/models/product.py
from datetime import datetime
from extensions import db

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float, nullable=True)
    image = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(50), nullable=True)
    stock = db.Column(db.Integer, default=0, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    cart_items = db.relationship('CartItem', backref='product', lazy='select', cascade='all, delete-orphan')
    order_items = db.relationship('OrderItem', backref='product', lazy='select', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Product {self.name} ￥{self.price}>'
