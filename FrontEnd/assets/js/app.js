// 页面状态管理
        let currentPage = 'home';
        let currentUser = null;
        let currentProduct = null;
        
        // 模拟数据库
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
            {
                id: 2,
                name: '无线蓝牙耳机 降噪耳机 运动耳机 超长续航',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                price: 299,
                originalPrice: 499,
                category: 'electronics',
                description: '无线蓝牙耳机，降噪功能强大，适合运动和日常使用。',
                details: '<p>无线蓝牙耳机详细介绍...</p>'
            },
            {
                id: 3,
                name: '数码单反相机 高清4K视频拍摄 专业级摄影器材',
                image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                price: 4599,
                originalPrice: 5999,
                category: 'electronics',
                description: '专业级数码单反相机，适合摄影爱好者和专业人士。',
                details: '<p>数码单反相机详细介绍...</p>'
            },
            {
                id: 4,
                name: '男士运动跑步鞋 透气减震 轻便耐磨 多色可选',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                price: 289,
                originalPrice: 399,
                category: 'clothing',
                description: '舒适的运动跑步鞋，适合日常运动和健身。',
                details: '<p>运动跑步鞋详细介绍...</p>'
            },
            {
                id: 5,
                name: '轻薄笔记本电脑 高性能处理器 超长续航 便携办公',
                image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                price: 5999,
                originalPrice: 6999,
                category: 'electronics',
                description: '轻薄便携的笔记本电脑，适合商务人士和学生。',
                details: '<p>笔记本电脑详细介绍...</p>'
            },
            {
                id: 6,
                name: '机械键盘 游戏办公 背光RGB 可编程宏按键',
                image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                price: 399,
                originalPrice: 599,
                category: 'electronics',
                description: '机械键盘，适合游戏玩家和程序员。',
                details: '<p>机械键盘详细介绍...</p>'
            },
            {
                id: 7,
                name: '时尚智能手表 健康监测 运动模式 消息提醒',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                price: 899,
                originalPrice: 1299,
                category: 'electronics',
                description: '时尚智能手表，功能全面，设计优雅。',
                details: '<p>智能手表详细介绍...</p>'
            },
            {
                id: 8,
                name: '防水蓝牙音箱 便携迷你音箱 户外运动音响',
                image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                price: 199,
                originalPrice: 299,
                category: 'electronics',
                description: '便携式蓝牙音箱，防水设计，适合户外使用。',
                details: '<p>蓝牙音箱详细介绍...</p>'
            }
        ];
        
        // 购物车数据
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        // 订单数据
        let orders = JSON.parse(localStorage.getItem('orders')) || [
            {
                id: 'OD202301010001',
                date: '2023-01-01 10:30:25',
                status: 'completed',
                total: 698,
                items: [
                    { id: 1, name: '智能运动手表', price: 399, quantity: 1, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                    { id: 2, name: '无线蓝牙耳机', price: 299, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
                ],
                address: '北京市朝阳区建国路88号SOHO现代城A座1001室',
                payment: '支付宝'
            },
            {
                id: 'OD202301150012',
                date: '2023-01-15 14:20:10',
                status: 'delivered',
                total: 289,
                items: [
                    { id: 4, name: '男士运动跑步鞋', price: 289, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
                ],
                address: '北京市海淀区中关村大街1号海龙大厦15层1502室',
                payment: '微信支付'
            },
            {
                id: 'OD202302030025',
                date: '2023-02-03 09:15:45',
                status: 'shipped',
                total: 5999,
                items: [
                    { id: 5, name: '轻薄笔记本电脑', price: 5999, quantity: 1, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
                ],
                address: '北京市朝阳区建国路88号SOHO现代城A座1001室',
                payment: '支付宝'
            },
            {
                id: 'OD202302200038',
                date: '2023-02-20 16:45:30',
                status: 'pending',
                total: 399,
                items: [
                    { id: 6, name: '机械键盘', price: 399, quantity: 1, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
                ],
                address: '北京市朝阳区建国路88号SOHO现代城A座1001室',
                payment: '支付宝'
            }
        ];
        
        // 页面切换函数
        function showPage(pageId) {
            // 隐藏所有页面
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // 显示目标页面
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                currentPage = pageId.replace('Page', '');
                
                // 更新导航栏状态
                updateNavState();
                
                // 执行页面特定的初始化
                switch(pageId) {
                    case 'homePage':
                        initHomePage();
                        break;
                    case 'cartPage':
                        initCartPage();
                        break;
                    case 'productDetailPage':
                        initProductDetailPage();
                        break;
                    case 'orderPage':
                        initOrderPage();
                        break;
                    case 'ordersPage':
                        initOrdersPage();
                        break;
                }
            }
        }
        
        // 更新导航栏状态
        function updateNavState() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            if (currentPage === 'home') {
                document.getElementById('homeLink').classList.add('active');
            } else if (currentPage === 'cart') {
                document.getElementById('cartLink').classList.add('active');
            }
        }
        
        // 更新购物车数量
        function updateCartCount() {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalItems;
        }
        
        // 初始化首页
        function initHomePage() {
            renderProducts('hotProducts', mockProducts.slice(0, 8));
            renderProducts('recommendedProducts', mockProducts.slice(2, 10));
        }
        
        // 渲染商品列表
        function renderProducts(containerId, products) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            container.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.dataset.id = product.id;
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">¥${product.price.toFixed(2)} <span>¥${product.originalPrice.toFixed(2)}</span></div>
                        <button class="add-to-cart" data-id="${product.id}">加入购物车</button>
                    </div>
                `;
                
                // 点击商品跳转到详情页
                productCard.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('add-to-cart')) {
                        showProductDetail(product.id);
                    }
                });
                
                // 加入购物车按钮
                const addToCartBtn = productCard.querySelector('.add-to-cart');
                addToCartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToCart(product.id);
                });
                
                container.appendChild(productCard);
            });
        }
        
        // 显示商品详情
        function showProductDetail(productId) {
            const product = mockProducts.find(p => p.id === productId);
            if (!product) return;
            
            currentProduct = product;
            
            // 渲染商品详情页面
            const productDetailPage = document.getElementById('productDetailPage');
            productDetailPage.innerHTML = `
                <div class="product-breadcrumb">
                    <a id="backToHomeFromDetail">首页</a>
                    <span class="separator">></span>
                    <a>${getCategoryName(product.category)}</a>
                    <span class="separator">></span>
                    <span>商品详情</span>
                </div>
                
                <div class="product-main">
                    <div class="product-gallery">
                        <div class="product-main-image">
                            <img id="mainImage" src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-thumbnails">
                            <div class="thumbnail active">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="product-info-detail">
                        <h1 class="product-title">${product.name}</h1>
                        <div class="product-subtitle">品牌: E-Shop | 商品编号: ${product.id}</div>
                        
                        <div class="product-price-section">
                            <div class="current-price">
                                <span class="price-symbol">¥</span>
                                <span class="price-amount" id="productPrice">${product.price.toFixed(2)}</span>
                                <span class="original-price">¥${product.originalPrice.toFixed(2)}</span>
                                <span class="discount">${Math.round(product.price / product.originalPrice * 100)}折</span>
                            </div>
                            <div class="promotions">
                                <i class="fas fa-gift"></i> 优惠: 满299减20 | 满499减50
                            </div>
                        </div>
                        
                        <div class="product-specs">
                            <div class="spec-item">
                                <div class="spec-label">颜色</div>
                                <div class="spec-options" id="colorOptions">
                                    <div class="spec-option selected">黑色</div>
                                    <div class="spec-option">白色</div>
                                    <div class="spec-option">蓝色</div>
                                </div>
                            </div>
                            
                            <div class="spec-item">
                                <div class="spec-label">版本</div>
                                <div class="spec-options" id="versionOptions">
                                    <div class="spec-option selected">标准版</div>
                                    <div class="spec-option">专业版</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="quantity-section-detail">
                            <div class="quantity-label">数量</div>
                            <div class="quantity-control-detail">
                                <button class="quantity-btn-detail minus">-</button>
                                <input type="text" class="quantity-input-detail" id="quantityInputDetail" value="1">
                                <button class="quantity-btn-detail plus">+</button>
                            </div>
                            <div class="stock-info">
                                库存: <span class="in-stock">999</span> 件
                            </div>
                        </div>
                        
                        <div class="action-buttons-detail">
                            <button class="btn-add-cart-detail" id="addToCartDetailBtn">
                                <i class="fas fa-cart-plus"></i> 加入购物车
                            </button>
                            <button class="btn-buy-now" id="buyNowBtn">立即购买</button>
                        </div>
                    </div>
                </div>
                
                <div class="product-tabs">
                    <div class="tab-header">
                        <button class="tab-btn active" data-tab="description">商品详情</button>
                        <button class="tab-btn" data-tab="reviews">商品评价 (128)</button>
                    </div>
                    
                    <div class="tab-content active" id="descriptionContent">
                        <div class="product-description">
                            ${product.details}
                        </div>
                    </div>
                    
                    <div class="tab-content" id="reviewsContent">
                        <div class="product-description">
                            <h3>用户评价</h3>
                            <p>商品评价内容...</p>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加事件监听器
            setupProductDetailEvents();
            
            // 显示商品详情页
            showPage('productDetailPage');
        }
        
        // 设置商品详情页事件
        function setupProductDetailEvents() {
            // 规格选项
            document.querySelectorAll('.spec-option').forEach(option => {
                option.addEventListener('click', function() {
                    this.parentElement.querySelectorAll('.spec-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });
            
            // 数量控制
            const quantityInput = document.getElementById('quantityInputDetail');
            const minusBtn = document.querySelector('.quantity-btn-detail.minus');
            const plusBtn = document.querySelector('.quantity-btn-detail.plus');
            
            minusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                quantityInput.value = quantity + 1;
            });
            
            quantityInput.addEventListener('change', function() {
                let quantity = parseInt(this.value) || 1;
                if (quantity < 1) quantity = 1;
                if (quantity > 999) quantity = 999;
                this.value = quantity;
            });
            
            // 加入购物车按钮
            document.getElementById('addToCartDetailBtn').addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value);
                addToCart(currentProduct.id, quantity);
            });
            
            // 立即购买按钮
            document.getElementById('buyNowBtn').addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value);
                addToCart(currentProduct.id, quantity, true);
            });
            
            // 标签页切换
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.dataset.tab;
                    
                    // 更新按钮状态
                    document.querySelectorAll('.tab-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // 更新内容
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    document.getElementById(`${tabId}Content`).classList.add('active');
                });
            });
            
            // 返回首页
            document.getElementById('backToHomeFromDetail').addEventListener('click', () => {
                showPage('homePage');
            });
        }
        
        // 获取分类名称
        function getCategoryName(categoryId) {
            const categories = {
                'electronics': '电子产品',
                'clothing': '服装服饰',
                'appliances': '家用电器',
                'cosmetics': '美妆护肤',
                'books': '图书音像',
                'food': '食品生鲜',
                'sports': '运动户外'
            };
            return categories[categoryId] || '其他';
        }
        
        // 添加到购物车
        function addToCart(productId, quantity = 1, buyNow = false) {
            const product = mockProducts.find(p => p.id === productId);
            if (!product) return;
            
            // 检查是否已登录
            if (!currentUser) {
                alert('请先登录！');
                showPage('loginPage');
                return;
            }
            
            // 检查商品是否已在购物车中
            const existingItemIndex = cartItems.findIndex(item => item.id === productId);
            
            if (existingItemIndex !== -1) {
                // 更新数量
                cartItems[existingItemIndex].quantity += quantity;
            } else {
                // 添加新商品
                cartItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
            
            // 保存到本地存储
            localStorage.setItem('cart', JSON.stringify(cartItems));
            
            // 更新购物车数量
            updateCartCount();
            
            // 显示成功消息
            alert(`成功添加 ${quantity} 件商品到购物车！`);
            
            // 如果是立即购买，跳转到购物车页面
            if (buyNow) {
                showPage('cartPage');
            }
        }
        
        // 初始化购物车页面
        function initCartPage() {
            if (cartItems.length === 0) {
                document.getElementById('emptyCart').style.display = 'block';
                document.getElementById('cartContent').style.display = 'none';
            } else {
                document.getElementById('emptyCart').style.display = 'none';
                document.getElementById('cartContent').style.display = 'block';
                renderCartItems();
                updateCartSummary();
            }
            
            // 渲染推荐商品
            renderProducts('cartRecommendations', mockProducts.slice(0, 5));
        }
        
        // 渲染购物车商品
        function renderCartItems() {
            const cartItemsList = document.getElementById('cartItemsList');
            cartItemsList.innerHTML = '';
            
            cartItems.forEach((item, index) => {
                const subtotal = item.price * item.quantity;
                
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-table-row';
                itemEl.dataset.index = index;
                
                itemEl.innerHTML = `
                    <div class="col-select">
                        <input type="checkbox" class="item-checkbox" ${item.selected ? 'checked' : ''} data-index="${index}">
                    </div>
                    <div class="col-product">
                        <div class="product-image-cart">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="product-info-cart">
                            <div class="product-name-cart" data-index="${index}">${item.name}</div>
                            <div class="product-spec">颜色: 黑色 | 版本: 标准版</div>
                        </div>
                    </div>
                    <div class="col-price">
                        <div class="price">¥${item.price.toFixed(2)}</div>
                    </div>
                    <div class="col-quantity">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" data-index="${index}">
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="col-subtotal">
                        <div class="price">¥${subtotal.toFixed(2)}</div>
                    </div>
                    <div class="col-action">
                        <button class="btn-delete delete-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                cartItemsList.appendChild(itemEl);
            });
            
            // 添加事件监听器
            setupCartEvents();
        }
        
        // 设置购物车事件
        function setupCartEvents() {
            // 单个商品选择
            document.querySelectorAll('.item-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const index = parseInt(this.dataset.index);
                    cartItems[index].selected = this.checked;
                    updateCartSummary();
                    updateSelectAllCheckbox();
                });
            });
            
            // 减少数量
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    if (cartItems[index].quantity > 1) {
                        cartItems[index].quantity--;
                        updateCartItem(index);
                    }
                });
            });
            
            // 增加数量
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    cartItems[index].quantity++;
                    updateCartItem(index);
                });
            });
            
            // 数量输入框
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const index = parseInt(this.dataset.index);
                    const newQuantity = parseInt(this.value) || 1;
                    
                    if (newQuantity > 0) {
                        cartItems[index].quantity = newQuantity;
                        updateCartItem(index);
                    } else {
                        this.value = cartItems[index].quantity;
                    }
                });
            });
            
            // 删除单个商品
            document.querySelectorAll('.delete-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    deleteCartItem(index);
                });
            });
            
            // 商品名称点击（跳转到详情页）
            document.querySelectorAll('.product-name-cart').forEach(nameEl => {
                nameEl.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    const productId = cartItems[index].id;
                    showProductDetail(productId);
                });
            });
            
            // 全选/全不选
            document.getElementById('selectAll').addEventListener('change', function() {
                const isChecked = this.checked;
                cartItems.forEach(item => {
                    item.selected = isChecked;
                });
                
                document.querySelectorAll('.item-checkbox').forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
                
                updateCartSummary();
            });
            
            // 删除选中商品
            document.getElementById('deleteSelected').addEventListener('click', function() {
                const selectedItems = cartItems.filter(item => item.selected);
                if (selectedItems.length === 0) {
                    alert('请先选择要删除的商品');
                    return;
                }
                
                if (confirm(`确定要删除选中的 ${selectedItems.length} 件商品吗？`)) {
                    // 保留未选中的商品
                    cartItems = cartItems.filter(item => !item.selected);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    initCartPage();
                    updateCartCount();
                }
            });
            
            // 结算按钮
            document.getElementById('checkoutBtn').addEventListener('click', function() {
                const selectedItems = cartItems.filter(item => item.selected);
                if (selectedItems.length === 0) {
                    alert('请先选择要结算的商品');
                    return;
                }
                
                showPage('orderPage');
            });
            
            // 去购物按钮
            document.getElementById('goShoppingBtn').addEventListener('click', function() {
                showPage('homePage');
            });
        }
        
        // 更新购物车商品
        function updateCartItem(index) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
            updateCartSummary();
            updateCartCount();
        }
        
        // 删除购物车商品
        function deleteCartItem(index) {
            if (confirm('确定要从购物车中删除这个商品吗？')) {
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                initCartPage();
                updateCartCount();
            }
        }
        
        // 更新购物车汇总
        function updateCartSummary() {
            let selectedCount = 0;
            let totalPrice = 0;
            
            cartItems.forEach(item => {
                if (item.selected) {
                    selectedCount++;
                    totalPrice += item.price * item.quantity;
                }
            });
            
            document.getElementById('selectedCount').textContent = selectedCount;
            document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
            
            // 更新结算按钮状态
            document.getElementById('checkoutBtn').disabled = selectedCount === 0;
        }
        
        // 更新全选复选框
        function updateSelectAllCheckbox() {
            const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
            const someSelected = cartItems.some(item => item.selected) && !allSelected;
            
            const selectAllCheckbox = document.getElementById('selectAll');
            selectAllCheckbox.checked = allSelected;
            selectAllCheckbox.indeterminate = someSelected;
        }
        
        // 初始化订单页面
        function initOrderPage() {
            const selectedItems = cartItems.filter(item => item.selected);
            
            if (selectedItems.length === 0) {
                alert('购物车中没有选中的商品');
                showPage('cartPage');
                return;
            }
            
            // 计算总价
            const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const orderPage = document.getElementById('orderPage');
            orderPage.innerHTML = `
                <div class="order-header">
                    <h1><i class="fas fa-file-invoice-dollar"></i> 确认订单</h1>
                </div>
                
                <div class="order-steps">
                    <div class="step active">
                        <div class="step-icon">1</div>
                        <div class="step-text">确认订单</div>
                    </div>
                    <div class="step">
                        <div class="step-icon">2</div>
                        <div class="step-text">付款</div>
                    </div>
                    <div class="step">
                        <div class="step-icon">3</div>
                        <div class="step-text">完成</div>
                    </div>
                </div>
                
                <div class="order-section">
                    <h2><i class="fas fa-map-marker-alt"></i> 选择收货地址</h2>
                    <div class="address-list">
                        <div class="address-item selected">
                            <div class="address-name">张三</div>
                            <div class="address-phone">138****5678</div>
                            <div class="address-detail">北京市朝阳区建国路88号SOHO现代城A座1001室</div>
                        </div>
                        <div class="address-item">
                            <div class="address-name">张三 (公司)</div>
                            <div class="address-phone">138****5678</div>
                            <div class="address-detail">北京市海淀区中关村大街1号海龙大厦15层1502室</div>
                        </div>
                        <button class="btn-add-address">
                            <i class="fas fa-plus"></i> 添加新地址
                        </button>
                    </div>
                </div>
                
                <div class="order-section">
                    <h2><i class="fas fa-shopping-cart"></i> 订单商品</h2>
                    <div class="order-items" id="orderItems">
                        ${selectedItems.map(item => `
                            <div class="order-item">
                                <div class="order-item-image">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <div class="order-item-info">
                                    <div class="order-item-name">${item.name}</div>
                                    <div class="order-item-spec">颜色: 黑色 | 版本: 标准版</div>
                                    <div class="order-item-price">¥${item.price.toFixed(2)}</div>
                                </div>
                                <div class="order-item-quantity">×${item.quantity}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="order-section">
                    <h2><i class="fas fa-credit-card"></i> 选择支付方式</h2>
                    <div class="payment-methods">
                        <div class="payment-method selected">
                            <div class="payment-icon"><i class="fab fa-alipay"></i></div>
                            <div class="payment-name">支付宝</div>
                            <div class="payment-desc">推荐支付宝用户使用</div>
                        </div>
                        <div class="payment-method">
                            <div class="payment-icon"><i class="fab fa-weixin"></i></div>
                            <div class="payment-name">微信支付</div>
                            <div class="payment-desc">推荐微信用户使用</div>
                        </div>
                        <div class="payment-method">
                            <div class="payment-icon"><i class="fas fa-credit-card"></i></div>
                            <div class="payment-name">银行卡支付</div>
                            <div class="payment-desc">支持储蓄卡/信用卡</div>
                        </div>
                    </div>
                </div>
                
                <div class="order-section">
                    <h2><i class="fas fa-receipt"></i> 订单汇总</h2>
                    <div class="order-summary">
                        <div class="summary-row">
                            <span class="summary-label">商品总额</span>
                            <span class="summary-value">¥${totalPrice.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">运费</span>
                            <span class="summary-value">¥0.00</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">优惠</span>
                            <span class="summary-value">-¥20.00</span>
                        </div>
                        <div class="summary-row total">
                            <span class="summary-label">应付总额</span>
                            <span class="summary-value">¥${(totalPrice - 20).toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <button class="btn-place-order" id="placeOrderBtn">提交订单</button>
                </div>
            `;
            
            // 设置订单页面事件
            setupOrderEvents();
        }
        
        // 设置订单页面事件
        function setupOrderEvents() {
            // 选择收货地址
            document.querySelectorAll('.address-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.address-item').forEach(i => {
                        i.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });
            
            // 选择支付方式
            document.querySelectorAll('.payment-method').forEach(method => {
                method.addEventListener('click', function() {
                    document.querySelectorAll('.payment-method').forEach(m => {
                        m.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });
            
            // 提交订单
            document.getElementById('placeOrderBtn').addEventListener('click', function() {
                // 模拟订单提交
                const orderNumber = 'OD' + Date.now();
                const selectedItems = cartItems.filter(item => item.selected);
                const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) - 20;
                
                // 创建新订单
                const newOrder = {
                    id: orderNumber,
                    date: new Date().toLocaleString(),
                    status: 'pending',
                    total: totalPrice,
                    items: selectedItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    })),
                    address: '北京市朝阳区建国路88号SOHO现代城A座1001室',
                    payment: '支付宝'
                };
                
                // 添加到订单列表
                orders.unshift(newOrder);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                document.getElementById('orderPage').innerHTML = `
                    <div class="order-success">
                        <i class="fas fa-check-circle"></i>
                        <h2>订单提交成功！</h2>
                        <p>您的订单已成功提交，订单编号: <strong>${orderNumber}</strong><br>
                        我们将在24小时内为您发货，请保持手机畅通</p>
                        
                        <div class="order-details">
                            <h3>订单信息</h3>
                            <div class="order-detail-row">
                                <div class="order-detail-label">订单编号</div>
                                <div class="order-detail-value">${orderNumber}</div>
                            </div>
                            <div class="order-detail-row">
                                <div class="order-detail-label">支付金额</div>
                                <div class="order-detail-value">¥${totalPrice.toFixed(2)}</div>
                            </div>
                            <div class="order-detail-row">
                                <div class="order-detail-label">支付方式</div>
                                <div class="order-detail-value">支付宝</div>
                            </div>
                            <div class="order-detail-row">
                                <div class="order-detail-label">收货地址</div>
                                <div class="order-detail-value">北京市朝阳区建国路88号SOHO现代城A座1001室</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px;">
                            <button class="btn-shopping" id="continueShoppingBtn" style="margin-right: 15px;">继续购物</button>
                            <button class="btn-checkout" id="viewOrderBtn">查看订单</button>
                        </div>
                    </div>
                `;
                
                // 清空购物车中已购买的商品
                cartItems = cartItems.filter(item => !item.selected);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartCount();
                
                // 添加事件监听器
                document.getElementById('continueShoppingBtn').addEventListener('click', () => {
                    showPage('homePage');
                });
                
                document.getElementById('viewOrderBtn').addEventListener('click', () => {
                    showPage('ordersPage');
                });
            });
        }
        
        // 初始化订单管理页面
        function initOrdersPage() {
            // 检查是否已登录
            if (!currentUser) {
                alert('请先登录！');
                showPage('loginPage');
                return;
            }
            
            // 更新筛选按钮状态
            updateFilterButtons();
            
            // 渲染订单列表
            renderOrders('all');
        }
        
        // 渲染订单列表
        function renderOrders(filter = 'all') {
            const ordersContainer = document.getElementById('ordersContainer');
            const noOrders = document.getElementById('noOrders');
            
            // 筛选订单
            let filteredOrders = orders;
            if (filter !== 'all') {
                filteredOrders = orders.filter(order => order.status === filter);
            }
            
            if (filteredOrders.length === 0) {
                ordersContainer.innerHTML = '';
                noOrders.style.display = 'block';
                return;
            }
            
            noOrders.style.display = 'none';
            ordersContainer.innerHTML = '';
            
            filteredOrders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card';
                
                // 状态文本
                let statusText = '';
                let statusClass = '';
                switch(order.status) {
                    case 'pending':
                        statusText = '待付款';
                        statusClass = 'status-paid';
                        break;
                    case 'shipped':
                        statusText = '待发货';
                        statusClass = 'status-shipped';
                        break;
                    case 'delivered':
                        statusText = '待收货';
                        statusClass = 'status-delivered';
                        break;
                    case 'completed':
                        statusText = '已完成';
                        statusClass = 'status-delivered';
                        break;
                }
                
                orderCard.innerHTML = `
                    <div class="order-card-header">
                        <div class="order-info">
                            <div class="order-number">订单号: ${order.id}</div>
                            <div class="order-time">下单时间: ${order.date}</div>
                        </div>
                        <div class="order-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="order-card-body">
                        <div class="order-items-list">
                            ${order.items.map(item => `
                                <div class="order-item-summary">
                                    <div class="order-item-image-small">
                                        <img src="${item.image}" alt="${item.name}">
                                    </div>
                                    <div class="order-item-info-small">
                                        <div class="order-item-name-small">${item.name}</div>
                                        <div class="order-item-spec-small">颜色: 黑色 | 版本: 标准版</div>
                                    </div>
                                    <div class="order-item-price-small">¥${item.price.toFixed(2)}</div>
                                    <div class="order-item-quantity">×${item.quantity}</div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="order-summary-footer">
                            <div class="order-total">
                                合计: <span>¥${order.total.toFixed(2)}</span>
                            </div>
                            <div class="order-actions">
                                ${order.status === 'pending' ? `
                                    <button class="btn-order-action btn-order-primary pay-btn" data-id="${order.id}">立即付款</button>
                                    <button class="btn-order-action cancel-btn" data-id="${order.id}">取消订单</button>
                                ` : ''}
                                ${order.status === 'delivered' ? `
                                    <button class="btn-order-action btn-order-primary confirm-btn" data-id="${order.id}">确认收货</button>
                                ` : ''}
                                <button class="btn-order-action view-detail-btn" data-id="${order.id}">查看详情</button>
                                ${order.status === 'completed' ? `
                                    <button class="btn-order-action delete-btn" data-id="${order.id}">删除订单</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
                
                ordersContainer.appendChild(orderCard);
            });
            
            // 添加订单操作事件
            setupOrderActions();
        }
        
        // 设置订单操作事件
        function setupOrderActions() {
            // 立即付款
            document.querySelectorAll('.pay-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const orderId = this.dataset.id;
                    if (confirm('确认要支付该订单吗？')) {
                        // 更新订单状态
                        const orderIndex = orders.findIndex(order => order.id === orderId);
                        if (orderIndex !== -1) {
                            orders[orderIndex].status = 'shipped';
                            localStorage.setItem('orders', JSON.stringify(orders));
                            renderOrders(document.querySelector('.filter-btn.active').dataset.filter);
                            alert('支付成功！订单状态已更新为待发货。');
                        }
                    }
                });
            });
            
            // 取消订单
            document.querySelectorAll('.cancel-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const orderId = this.dataset.id;
                    if (confirm('确定要取消该订单吗？')) {
                        // 从订单列表中移除
                        orders = orders.filter(order => order.id !== orderId);
                        localStorage.setItem('orders', JSON.stringify(orders));
                        renderOrders(document.querySelector('.filter-btn.active').dataset.filter);
                        alert('订单已取消！');
                    }
                });
            });
            
            // 确认收货
            document.querySelectorAll('.confirm-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const orderId = this.dataset.id;
                    if (confirm('确认已收到商品吗？')) {
                        // 更新订单状态
                        const orderIndex = orders.findIndex(order => order.id === orderId);
                        if (orderIndex !== -1) {
                            orders[orderIndex].status = 'completed';
                            localStorage.setItem('orders', JSON.stringify(orders));
                            renderOrders(document.querySelector('.filter-btn.active').dataset.filter);
                            alert('确认收货成功！订单已完成。');
                        }
                    }
                });
            });
            
            // 查看详情
            document.querySelectorAll('.view-detail-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const orderId = this.dataset.id;
                    const order = orders.find(order => order.id === orderId);
                    
                    if (order) {
                        showOrderDetail(order);
                    }
                });
            });
            
            // 删除订单
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const orderId = this.dataset.id;
                    if (confirm('确定要删除该订单记录吗？')) {
                        // 从订单列表中移除
                        orders = orders.filter(order => order.id !== orderId);
                        localStorage.setItem('orders', JSON.stringify(orders));
                        renderOrders(document.querySelector('.filter-btn.active').dataset.filter);
                        alert('订单已删除！');
                    }
                });
            });
        }
        
        // 显示订单详情
        function showOrderDetail(order) {
            // 状态文本
            let statusText = '';
            switch(order.status) {
                case 'pending':
                    statusText = '待付款';
                    break;
                case 'shipped':
                    statusText = '待发货';
                    break;
                case 'delivered':
                    statusText = '待收货';
                    break;
                case 'completed':
                    statusText = '已完成';
                    break;
            }
            
            const orderPage = document.getElementById('orderPage');
            orderPage.innerHTML = `
                <div class="order-header">
                    <h1><i class="fas fa-file-invoice-dollar"></i> 订单详情</h1>
                </div>
                
                <div class="order-steps">
                    <div class="step ${['pending', 'shipped', 'delivered', 'completed'].includes(order.status) ? 'completed' : ''}">
                        <div class="step-icon">1</div>
                        <div class="step-text">确认订单</div>
                    </div>
                    <div class="step ${['shipped', 'delivered', 'completed'].includes(order.status) ? 'completed' : ''}">
                        <div class="step-icon">2</div>
                        <div class="step-text">付款</div>
                    </div>
                    <div class="step ${['delivered', 'completed'].includes(order.status) ? 'completed' : ''}">
                        <div class="step-icon">3</div>
                        <div class="step-text">发货</div>
                    </div>
                    <div class="step ${order.status === 'completed' ? 'completed' : ''}">
                        <div class="step-icon">4</div>
                        <div class="step-text">完成</div>
                    </div>
                </div>
                
                <div class="order-section">
                    <h2><i class="fas fa-info-circle"></i> 订单信息</h2>
                    <div class="order-details">
                        <div class="order-detail-row">
                            <div class="order-detail-label">订单编号</div>
                            <div class="order-detail-value">${order.id}</div>
                        </div>
                        <div class="order-detail-row">
                            <div class="order-detail-label">下单时间</div>
                            <div class="order-detail-value">${order.date}</div>
                        </div>
                        <div class="order-detail-row">
                            <div class="order-detail-label">订单状态</div>
                            <div class="order-detail-value">${statusText}</div>
                        </div>
                        <div class="order-detail-row">
                            <div class="order-detail-label">支付方式</div>
                            <div class="order-detail-value">${order.payment}</div>
                        </div>
                        <div class="order-detail-row">
                            <div class="order-detail-label">收货地址</div>
                            <div class="order-detail-value">${order.address}</div>
                        </div>
                    </div>
                </div>
                
                <div class="order-section">
                    <h2><i class="fas fa-shopping-cart"></i> 订单商品</h2>
                    <div class="order-items" id="orderItems">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <div class="order-item-image">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <div class="order-item-info">
                                    <div class="order-item-name">${item.name}</div>
                                    <div class="order-item-spec">颜色: 黑色 | 版本: 标准版</div>
                                    <div class="order-item-price">¥${item.price.toFixed(2)}</div>
                                </div>
                                <div class="order-item-quantity">×${item.quantity}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="order-section">
                    <h2><i class="fas fa-receipt"></i> 订单汇总</h2>
                    <div class="order-summary">
                        <div class="summary-row">
                            <span class="summary-label">商品总额</span>
                            <span class="summary-value">¥${(order.total + 20).toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">运费</span>
                            <span class="summary-value">¥0.00</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">优惠</span>
                            <span class="summary-value">-¥20.00</span>
                        </div>
                        <div class="summary-row total">
                            <span class="summary-label">应付总额</span>
                            <span class="summary-value">¥${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn-shopping" id="backToOrdersBtn" style="margin-right: 15px;">返回订单列表</button>
                    ${order.status === 'pending' ? `
                        <button class="btn-checkout" id="payOrderBtn">立即付款</button>
                    ` : ''}
                </div>
            `;
            
            // 添加事件监听器
            document.getElementById('backToOrdersBtn').addEventListener('click', () => {
                showPage('ordersPage');
            });
            
            if (order.status === 'pending') {
                document.getElementById('payOrderBtn').addEventListener('click', () => {
                    if (confirm('确认要支付该订单吗？')) {
                        // 更新订单状态
                        const orderIndex = orders.findIndex(o => o.id === order.id);
                        if (orderIndex !== -1) {
                            orders[orderIndex].status = 'shipped';
                            localStorage.setItem('orders', JSON.stringify(orders));
                            alert('支付成功！订单状态已更新为待发货。');
                            showPage('ordersPage');
                        }
                    }
                });
            }
            
            showPage('orderPage');
        }
        
        // 更新筛选按钮状态
        function updateFilterButtons() {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    const filter = this.dataset.filter;
                    renderOrders(filter);
                });
            });
        }
        
        // 初始化登录页面事件
        function setupLoginPage() {
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // 简单验证
                if (username === 'admin' && password === 'admin') {
                    currentUser = { username: 'admin', name: '管理员' };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    alert('登录成功！');
                    showPage('homePage');
                } else if (username && password) {
                    currentUser = { username, name: username };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    alert('登录成功！');
                    showPage('homePage');
                } else {
                    document.getElementById('loginErrorMessage').classList.add('show');
                }
            });
        }
        
        // 初始化注册页面事件
        function setupRegisterPage() {
            document.getElementById('registerForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('regUsername').value;
                const phone = document.getElementById('regPhone').value;
                const email = document.getElementById('regEmail').value;
                const password = document.getElementById('regPassword').value;
                const confirmPassword = document.getElementById('regConfirmPassword').value;
                
                // 简单验证
                if (!username || !phone || !email || !password || !confirmPassword) {
                    document.getElementById('registerErrorMessage').textContent = '请填写所有必填项';
                    document.getElementById('registerErrorMessage').classList.add('show');
                    return;
                }
                
                if (password !== confirmPassword) {
                    document.getElementById('registerErrorMessage').textContent = '两次输入的密码不一致';
                    document.getElementById('registerErrorMessage').classList.add('show');
                    return;
                }
                
                // 注册成功
                document.getElementById('registerErrorMessage').classList.remove('show');
                document.getElementById('registerSuccessMessage').style.display = 'block';
                
                // 模拟注册成功
                setTimeout(() => {
                    currentUser = { username, name: username };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    showPage('loginPage');
                }, 1500);
            });
        }
        
        // 初始化事件监听器
        function initEventListeners() {
            // 导航链接
            document.getElementById('logoLink').addEventListener('click', () => showPage('homePage'));
            document.getElementById('homeLink').addEventListener('click', () => showPage('homePage'));
            document.getElementById('cartLink').addEventListener('click', () => showPage('cartPage'));
            
            // 顶部链接
            document.getElementById('loginTopLink').addEventListener('click', () => showPage('loginPage'));
            document.getElementById('registerTopLink').addEventListener('click', () => showPage('registerPage'));
            document.getElementById('myOrdersLink').addEventListener('click', () => {
                if (!currentUser) {
                    alert('请先登录！');
                    showPage('loginPage');
                } else {
                    showPage('ordersPage');
                }
            });
            document.getElementById('customerServiceLink').addEventListener('click', () => {
                alert('客服功能正在开发中...');
            });
            
            // 用户头像
            document.getElementById('userAvatar').addEventListener('click', () => {
                if (currentUser) {
                    alert(`欢迎 ${currentUser.name}`);
                } else {
                    showPage('loginPage');
                }
            });
            
            // 分类链接
            document.querySelectorAll('.category-link').forEach(link => {
                link.addEventListener('click', function() {
                    const category = this.dataset.category;
                    if (category === 'all') {
                        initHomePage();
                    } else {
                        // 这里可以添加按分类筛选商品的功能
                        alert(`显示${this.textContent}分类的商品`);
                    }
                });
            });
            
            // 搜索功能
            document.getElementById('searchButton').addEventListener('click', performSearch);
            document.getElementById('searchInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') performSearch();
            });
            
            // 登录/注册页面切换
            document.getElementById('switchToRegister').addEventListener('click', () => showPage('registerPage'));
            document.getElementById('switchToLogin').addEventListener('click', () => showPage('loginPage'));
            
            // 返回首页
            document.getElementById('backToHomeFromLogin').addEventListener('click', () => showPage('homePage'));
            document.getElementById('backToHomeFromRegister').addEventListener('click', () => showPage('homePage'));
            
            // 从订单页面去购物
            document.getElementById('goShoppingFromOrdersBtn')?.addEventListener('click', () => {
                showPage('homePage');
            });
            
            // 初始化登录/注册页面事件
            setupLoginPage();
            setupRegisterPage();
        }
        
        // 执行搜索
        function performSearch() {
            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                alert(`搜索: ${query}`);
                // 实际应用中可以在这里实现搜索功能
            } else {
                alert('请输入搜索关键词');
            }
        }
        
        // 初始化应用
        function initApp() {
            // 检查登录状态
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
            }
            
            // 更新购物车数量
            updateCartCount();
            
            // 初始化事件监听器
            initEventListeners();
            
            // 初始化首页
            initHomePage();
        }
        
        // 页面加载完成后初始化应用
        document.addEventListener('DOMContentLoaded', initApp);
