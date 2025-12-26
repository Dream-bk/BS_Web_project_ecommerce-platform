🛒 E-Commerce Platform

基于 Flask 的电商平台（课程设计 / Web 综合实验）

📖 1. 项目简介

本项目实现一个简易电商平台，包含：
用户登录、商品展示、购物车、订单管理等核心功能。
项目基于 B/S 架构 + Flask + Jinja2/RESTful API，用于课程实验与 Web 开发学习。

✨ 2. 项目功能

👤 用户功能

• 注册 / 登录 / 退出

• 查看订单记录

🛍 商品功能

• 浏览商品列表

• 查看商品详情

• 搜索商品

• 后台商品管理（管理员）

🛒 购物车功能

• 加入购物车

• 修改数量

• 删除商品

📦 订单功能

• 提交订单

• 查看订单

• 管理员订单管理


🧱 3. 项目结构


ecommerce/

│

├── backend/              # Flask 后端

│   ├── app.py

│   ├── models/

│   ├── routes/

│

├── frontend/             

│   ├── html/

│   ├── js/

│   └── css/

│

└── docs/                 # 文档（需求/设计/测试）

│   ├── requirements.md

│   ├── design.md

│   ├── test.md

│   └── usage.md





🚀 4. 环境配置与运行

4.1 安装依赖
~~~
pip install Flask
pip install flask-cors
pip install sqlalchemy
~~~

4.2 启动后端

python app.py


浏览器访问：

http://127.0.0.1:5000

4.3 启动前端

直接打开 frontend/*.html 即可，或使用 VSCode Live Server。

🔗 5. API 概要（RESTful）
模块	方法	路径	描述
用户	POST	/api/v1/login	登录
用户	POST	/api/v1/register	注册
商品	GET	/api/v1/products	商品列表
商品	GET	/api/v1/products/<id>	商品详情
购物车	POST	/api/v1/cart	加入购物车
购物车	DELETE	/api/v1/cart/<id>	删除购物车商品
订单	POST	/api/v1/order	创建订单

🧩 6. 技术栈

后端：

    Flask

    SQLAlchemy

    Jinja2 模板

    Session / Cookie 认证

前端：

    HTML / CSS / JavaScript

    Axios



👥 7. 团队分工（示例，可自行改名）
成员	负责内容
黄剑	后端开发（用户/购物车/订单 API）
张芷蕊	前端开发（商品页面、交互逻辑）
徐振北	文档与测试（需求、设计、测试、说明书）



🧪 8. 测试情况（概述）

登录/注册：正常

商品列表/详情：正常

购物车增删查改：正常

订单创建/查看：正常

API 响应时间：均小于 1s


📄 9. 项目声明

本项目用于课程学习和教学实验，不用于商业用途。
