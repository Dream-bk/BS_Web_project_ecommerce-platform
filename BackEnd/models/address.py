# back/models/address.py
from extensions import db

class Address(db.Model):
    __tablename__ = 'addresses'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    recipient = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    province = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    district = db.Column(db.String(50), nullable=False)
    detail = db.Column(db.String(200), nullable=False)
    is_default = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    
    orders = db.relationship('Order', backref='address', lazy='select')
    
    def __repr__(self):
        return f'<Address {self.recipient} ({self.phone}) - {self.province}{self.city}>'
