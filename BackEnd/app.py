from flask import Flask, request, jsonify, send_from_directory, abort
import os
import sys
from pathlib import Path

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from extensions import db, login_manager
from werkzeug.security import generate_password_hash

base_dir = Path(__file__).resolve().parents[1]
frontend_root = base_dir / 'FrontEnd'
app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-secret-key-123456'
db_path = (Path(__file__).resolve().parent / 'instance' / 'ecommerce.db')
db_path.parent.mkdir(parents=True, exist_ok=True)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path.as_posix()}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_AS_ASCII'] = False
app.config['JSON_SORT_KEYS'] = False

db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = 'user.login'
login_manager.login_message_category = 'info'

@login_manager.user_loader
def load_user(user_id):
    from models.user import User
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({'success': False, 'message': '请先登录'}), 401

def register_blueprints():
    try:
        from routes.user_routes import user_bp
        app.register_blueprint(user_bp, url_prefix='/api')
        print("✅ 用户模块路由注册成功")
    except ImportError as e:
        print(f"❌ 用户模块路由注册失败：{e}")
    
    try:
        from routes.product_routes import product_bp
        app.register_blueprint(product_bp, url_prefix='/api')
        print("✅ 商品模块路由注册成功")
    except ImportError as e:
        print(f"❌ 商品模块路由注册失败：{e}")
    
    try:
        from routes.cart_routes import cart_bp
        app.register_blueprint(cart_bp, url_prefix='/api')
        print("✅ 购物车模块路由注册成功")
    except ImportError as e:
        print(f"❌ 购物车模块路由注册失败：{e}")
    
    try:
        from routes.order_routes import order_bp
        app.register_blueprint(order_bp, url_prefix='/api')
        print("✅ 订单模块路由注册成功")
    except ImportError as e:
        print(f"❌ 订单模块路由注册失败：{e}")

def init_database():
    with app.app_context():
        from models.user import User
        from models.address import Address
        from models.product import Product
        from models.cart import CartItem
        from models.order import Order, OrderItem
        
        db.create_all()
        
        if not User.query.filter_by(username='admin').first():
            admin_user = User(
                username='admin',
                email='admin@example.com',
                password=generate_password_hash('admin123', method='pbkdf2:sha256'),
                is_admin=True
            )
            db.session.add(admin_user)
            db.session.commit()
            print('管理员账号创建成功：用户名=admin，密码=admin123，邮箱=admin@example.com')

@app.route('/')
def index():
    return send_from_directory(frontend_root, 'index.html')


@app.route('/<path:filename>')
def serve_frontend_files(filename: str):
    if filename.startswith('api/'):
        abort(404)
    return send_from_directory(frontend_root, filename)


register_blueprints()
init_database()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
