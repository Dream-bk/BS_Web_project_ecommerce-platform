# back/models/user.py
from datetime import datetime
from flask_login import UserMixin
from extensions import db

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<User {self.username} ({self.email})>'

from models.address import Address
from models.order import Order
from models.cart import CartItem

User.addresses = db.relationship(
    Address, backref='user', lazy='select',
    cascade='all, delete-orphan', passive_deletes=True
)

User.orders = db.relationship(
    Order, backref='user', lazy='select',
    cascade='all, delete-orphan', passive_deletes=True
)

User.cart_items = db.relationship(
    CartItem, backref='user', lazy='select',
    cascade='all, delete-orphan', passive_deletes=True
)
