# back/models/cart.py
from extensions import db

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'),
        nullable=False
    )
    quantity = db.Column(db.Integer, default=1, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    
    def __repr__(self):
        return f'<CartItem User:{self.user_id} Product:{self.product_id} Qty:{self.quantity}>'
