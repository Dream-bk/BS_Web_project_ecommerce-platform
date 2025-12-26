const API_BASE = '/api';

async function apiRequest(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const resp = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        ...options,
        headers
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok || data.success === false) {
        const message = data.message || data.error || '请求失败';
        const err = new Error(message);
        err.status = resp.status;
        err.data = data;
        throw err;
    }
    return data.data ?? data;
}

function normalizeProduct(product) {
    if (!product) return null;
    return {
        id: product.id,
        name: product.name,
        image: product.image,
        price: Number(product.price),
        originalPrice: product.original_price != null ? Number(product.original_price) : Number(product.originalPrice || product.price),
        category: product.category || '',
        description: product.description || '',
        details: product.details || '',
        stock: product.stock ?? 999
    };
}

async function apiGetProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            query.append(key, value);
        }
    });
    const suffix = query.toString() ? `?${query}` : '';
    const data = await apiRequest(`/products${suffix}`);
    const products = Array.isArray(data.products) ? data.products : data;
    return products.map(normalizeProduct);
}

async function apiGetProduct(productId) {
    const data = await apiRequest(`/products/${productId}`);
    return normalizeProduct(data);
}

async function apiLogin(identifier, password, remember = false) {
    const payload = { password, remember };
    if (identifier.includes('@')) {
        payload.email = identifier;
    } else {
        payload.username = identifier;
    }
    const data = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    if (data) {
        localStorage.setItem('currentUser', JSON.stringify(data));
    }
    return data;
}

async function apiRegister(payload) {
    const data = await apiRequest('/register', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return data;
}

async function apiLogout() {
    await apiRequest('/logout', { method: 'POST' });
    localStorage.removeItem('currentUser');
}

async function apiGetCurrentUser() {
    const data = await apiRequest('/user');
    if (data) {
        localStorage.setItem('currentUser', JSON.stringify(data));
    }
    return data;
}

async function apiGetCart() {
    const data = await apiRequest('/cart');
    return (data.items || []).map(item => ({
        cartId: item.id,
        id: item.product_id,
        name: item.product_name,
        image: item.product_image,
        price: Number(item.price),
        quantity: Number(item.quantity),
        subtotal: Number(item.subtotal),
        stock: item.stock
    }));
}

async function apiAddToCart(productId, quantity = 1) {
    await apiRequest('/cart', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, quantity })
    });
}

async function apiUpdateCartItem(cartId, quantity) {
    await apiRequest(`/cart/${cartId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
    });
}

async function apiDeleteCartItem(cartId) {
    await apiRequest(`/cart/${cartId}`, { method: 'DELETE' });
}

async function apiClearCart() {
    await apiRequest('/cart/clear', { method: 'POST' });
}

async function apiGetAddresses() {
    const data = await apiRequest('/user/addresses');
    return data.addresses || [];
}

async function apiAddAddress(payload) {
    const data = await apiRequest('/user/address', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return data;
}

async function apiCreateOrder(payload) {
    const data = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return data;
}

async function apiGetOrders() {
    const data = await apiRequest('/orders');
    return data.orders || [];
}

async function apiUpdateOrderStatus(orderId, status) {
    const data = await apiRequest(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    });
    return data;
}

async function refreshCartCount() {
    const elements = document.querySelectorAll('.cart-count');
    if (!elements.length) return;
    try {
        const items = await apiGetCart();
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        elements.forEach(el => {
            el.textContent = total;
        });
    } catch (err) {
        if (err.status === 401) {
            elements.forEach(el => {
                el.textContent = '0';
            });
        }
    }
}

async function updateAuthUI() {
    const container = document.querySelector('.top-links');
    if (!container) return;

    try {
        const user = await apiGetCurrentUser();
        const name = user.name || user.username || user.email || '用户';
        const adminLink = user.is_admin ? '<a href="admin.html">管理后台</a>' : '';
        container.innerHTML = `
            <span class="welcome-user">欢迎，${name}</span>
            <a href="orders.html">我的订单</a>
            ${adminLink}
            <a id="logoutLink">退出</a>
            <a id="customerServiceLink">客户服务</a>
        `;
        const logoutLink = document.getElementById('logoutLink');
        logoutLink?.addEventListener('click', async () => {
            await apiLogout();
            window.location.href = 'index.html';
        });
    } catch (err) {
        if (err.status !== 401) {
            // Ignore other errors and show default links
        }
        container.innerHTML = `
            <a href="login.html">登录</a>
            <a href="register.html">注册</a>
            <a href="orders.html">我的订单</a>
            <a id="customerServiceLink">客户服务</a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});
