// 模拟数据库 - 共享数据
const mockProducts = [
    {
        id: 1,
        name: '智能运动手表 多功能心率监测 GPS定位 蓝牙通话',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        price: 399,
        originalPrice: 599,
        category: 'electronics',
        description: '这款智能运动手表采用最新科技，专为运动爱好者设计。具有精准的心率监测功能，能够实时监测您的心率变化，为您的运动提供科学指导。',
        details: `<h3>产品介绍</h3>
            <p>这款智能运动手表采用最新科技，专为运动爱好者设计。它具有精准的心率监测功能，能够实时监测您的心率变化，为您的运动提供科学指导。</p>
            <h3>主要功能</h3>
            <ul>
                <li><strong>心率监测：</strong>24小时连续心率监测，精准度高</li>
                <li><strong>GPS定位：</strong>内置高精度GPS，记录运动轨迹</li>
                <li><strong>蓝牙通话：</strong>支持蓝牙连接手机，接听电话</li>
                <li><strong>运动模式：</strong>支持跑步、游泳、骑行等多种运动模式</li>
                <li><strong>超长续航：</strong>正常使用可达7天，待机时间30天</li>
            </ul>`
    },
    // ... 其他产品数据
];

// 购物车数据 - 使用本地存储
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCartItems(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// 订单数据 - 使用本地存储
function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// 用户数据 - 使用本地存储
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// 更新购物车数量
function updateCartCount() {
    const cartItems = getCartItems();
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}