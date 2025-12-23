# back/routes/user_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from models.user import User
from models.address import Address

user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    
    required_fields = ['username', 'email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({
            'success': False,
            'message': '缺少必填字段：用户名/邮箱/密码'
        }), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({
            'success': False,
            'message': '用户名已被注册'
        }), 409
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({
            'success': False,
            'message': '邮箱已被注册'
        }), 409
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=generate_password_hash(data['password'], method='sha256')
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': '注册成功',
        'data': {
            'user_id': new_user.id,
            'username': new_user.username,
            'email': new_user.email
        }
    }), 201

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    
    if not all(field in data for field in ['email', 'password']):
        return jsonify({
            'success': False,
            'message': '请输入邮箱和密码'
        }), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({
            'success': False,
            'message': '邮箱或密码错误'
        }), 401
    
    login_user(user, remember=data.get('remember', False))
    return jsonify({
        'success': True,
        'message': '登录成功',
        'data': {
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin
        }
    })

@user_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({
        'success': True,
        'message': '退出成功'
    })

@user_bp.route('/user', methods=['GET'])
@login_required
def get_user_info():
    user = current_user
    return jsonify({
        'success': True,
        'data': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin,
            'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    })

@user_bp.route('/user/address', methods=['POST'])
@login_required
def add_address():
    data = request.get_json() or {}
    required_fields = ['recipient', 'phone', 'province', 'city', 'district', 'detail']
    
    if not all(field in data for field in required_fields):
        return jsonify({
            'success': False,
            'message': '请填写完整的收货地址信息'
        }), 400
    
    if not (len(data['phone']) == 11 and data['phone'].isdigit()):
        return jsonify({
            'success': False,
            'message': '手机号格式错误（需为11位数字）'
        }), 400
    
    if data.get('is_default', False):
        Address.query.filter_by(
            user_id=current_user.id,
            is_default=True
        ).update({'is_default': False})
    
    new_address = Address(
        user_id=current_user.id,
        recipient=data['recipient'],
        phone=data['phone'],
        province=data['province'],
        city=data['city'],
        district=data['district'],
        detail=data['detail'],
        is_default=data.get('is_default', False)
    )
    db.session.add(new_address)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': '地址添加成功',
        'data': {'address_id': new_address.id}
    }), 201

@user_bp.route('/user/addresses', methods=['GET'])
@login_required
def get_addresses():
    addresses = Address.query.filter_by(user_id=current_user.id).order_by(
        Address.is_default.desc(),
        Address.created_at.desc()
    ).all()
    
    return jsonify({
        'success': True,
        'data': {
            'addresses': [{
                'id': addr.id,
                'recipient': addr.recipient,
                'phone': addr.phone,
                'province': addr.province,
                'city': addr.city,
                'district': addr.district,
                'detail': addr.detail,
                'is_default': addr.is_default,
                'created_at': addr.created_at.strftime('%Y-%m-%d %H:%M:%S')
            } for addr in addresses]
        }
    })
