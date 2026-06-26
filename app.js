// PrimaStore - Application Logic

// Data Store
let products = [
    { id: 1, name: 'لوحة مفاتيح RGB', category: 'pc', price: 89.99, oldPrice: 129.99, image: '⌨️', rating: 5, stock: 50, description: 'لوحة مفاتيح ميكانيكية بإضاءة RGB', badge: 'خصم 30%' },
    { id: 2, name: 'ماوس gaming احترافي', category: 'pc', price: 59.99, oldPrice: null, image: '🖱️', rating: 4.5, stock: 100, description: 'ماوس gaming بدقة عالية', badge: null },
    { id: 3, name: 'سماعات محيطية 7.1', category: 'audio', price: 149.99, oldPrice: 199.99, image: '🎧', rating: 5, stock: 30, description: 'سماعات محيطية بتقنية 7.1 قناة', badge: 'خصم 25%' },
    { id: 4, name: 'مبرد هاتف', category: 'mobile', price: 34.99, oldPrice: null, image: '❄️', rating: 4, stock: 80, description: 'مبرد هاتف gaming للسرعة', badge: 'جديد' },
    { id: 5, name: 'كايبل USB-C للشحن', category: 'cables', price: 15.99, oldPrice: null, image: '🔌', rating: 4.5, stock: 200, description: 'كايبل شحن سريع 65 واط', badge: null },
    { id: 6, name: 'Microphone streaming', category: 'audio', price: 79.99, oldPrice: 99.99, image: '🎤', rating: 5, stock: 25, description: 'مايكروفون احترافي للبث', badge: 'خصم 20%' },
    { id: 7, name: 'Joystick موبايل', category: 'mobile', price: 44.99, oldPrice: null, image: '🎮', rating: 4, stock: 60, description: 'Joystick wireless للموبايل', badge: 'جديد' },
    { id: 8, name: 'شاحن جداري 65 واط', category: 'cables', price: 39.99, oldPrice: 49.99, image: '⚡', rating: 4.5, stock: 120, description: 'شاحن جداري سريع متعدد المنافذ', badge: 'خصم 20%' },
    { id: 9, name: 'كرسي gaming', category: 'pc', price: 299.99, oldPrice: 399.99, image: '🪑', rating: 5, stock: 15, description: 'كرسي gaming مريح', badge: 'خصم 25%' },
    { id: 10, name: 'كاميرا ويب HD', category: 'pc', price: 69.99, oldPrice: null, image: '📷', rating: 4, stock: 40, description: 'كاميرا ويب بدقة 1080p', badge: null },
    { id: 11, name: 'Power Bank 20000', category: 'cables', price: 49.99, oldPrice: null, image: '🔋', rating: 4.5, stock: 90, description: 'باور بانك بسعة كبيرة', badge: null },
    { id: 12, name: 'سماعات Type-C', category: 'audio', price: 24.99, oldPrice: null, image: '🎧', rating: 4, stock: 150, description: 'سماعات بأفذ USB-C', badge: 'جديد' }
];

let cart = [];
let orders = [
    { id: 'ORD12345', customer: 'أحمد محمد', items: ['لوحة مفاتيح RGB', 'ماوس gaming'], total: 149.98, status: 'shipped' },
    { id: 'ORD12346', customer: 'سارة علي', items: ['سماعات محيطية 7.1'], total: 149.99, status: 'processing' }
];

let users = [];
let currentUser = null;
let isDarkMode = true;
let currentProductId = null;
let selectedRating = 0;
let reviews = [
    { id: 1, productId: 1, user: 'أحمد', rating: 5, text: 'منتج excellent! لوحة مفاتيح رائعة جداً', date: '2025-01-15' },
    { id: 2, productId: 1, user: 'سارة', rating: 4, text: 'جودة عالية وإضاءة RGB جميلة', date: '2025-01-10' },
    { id: 3, productId: 3, user: 'محمد', rating: 5, text: 'أفضل سماعات استخدمتها', date: '2025-01-12' }
];

// Category translations
const categoryNames = {
    'pc': 'PC Gaming',
    'mobile': 'Mobile Gaming',
    'cables': 'كابلات وشواحن',
    'audio': 'صوتيات'
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadFromStorage();
    renderProducts();
    renderFeaturedProducts();
    renderNewProducts();
    renderAdminProducts();
    renderAdminOrders();
    updateStats();
    setupEventListeners();
}

function loadFromStorage() {
    const savedProducts = localStorage.getItem('gamezone_products');
    const savedCart = localStorage.getItem('gamezone_cart');
    const savedOrders = localStorage.getItem('gamezone_orders');
    const savedUsers = localStorage.getItem('gamezone_users');

    if (savedProducts) products = JSON.parse(savedProducts);
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedOrders) orders = JSON.parse(savedOrders);
    if (savedUsers) users = JSON.parse(savedUsers);
}

function saveToStorage() {
    localStorage.setItem('gamezone_products', JSON.stringify(products));
    localStorage.setItem('gamezone_cart', JSON.stringify(cart));
    localStorage.setItem('gamezone_orders', JSON.stringify(orders));
    localStorage.setItem('gamezone_users', JSON.stringify(users));
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = e.target.dataset.page;
            showPage(page);
        });
    });

    // Hamburger menu
    document.getElementById('hamburger').addEventListener('click', function() {
        document.getElementById('navMenu').classList.toggle('active');
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', function(e) {
        searchProducts(e.target.value);
    });

    // Cart
    document.getElementById('cartBtn').addEventListener('click', function() {
        openCart();
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', function() {
        toggleTheme();
    });

    // User
    document.getElementById('userBtn').addEventListener('click', function() {
        openAuth();
    });

    // Products filter
    document.getElementById('categoryFilter').addEventListener('change', function() {
        filterProducts();
    });
    document.getElementById('priceSort').addEventListener('change', function() {
        sortProducts();
    });

    // Admin tabs
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            switchAdminTab(e.target.dataset.tab);
        });
    });

    // Auth forms
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        handleLogin(e);
    });
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        handleRegister(e);
    });

    // Reviews modal click outside
    document.getElementById('reviewsModal').addEventListener('click', function(e) {
        if (e.target.id === 'reviewsModal') closeReviews();
    });

    // Cart modal click outside
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target.id === 'cartModal') closeCart();
    });

    // Auth modal click outside
    document.getElementById('authModal').addEventListener('click', function(e) {
        if (e.target.id === 'authModal') closeAuth();
    });
}

// Navigation
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(function(page) {
        page.classList.add('hidden');
    });
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.remove('active');
    });

    const pageMap = {
        'home': 'homePage',
        'products': 'productsPage',
        'orders': 'ordersPage',
        'admin': 'adminPage'
    };

    const page = document.getElementById(pageMap[pageName]);
    if (page) {
        page.classList.remove('hidden');
    }

    const activeLink = document.querySelector('[data-page="' + pageName + '"]');
    if (activeLink) {
        activeLink.classList.add('active');
    }

    window.scrollTo(0, 0);
}

// Render Products
function renderProducts() {
    const container = document.getElementById('allProducts');
    if (!container) return;

    container.innerHTML = products.map(function(product) {
        return createProductCard(product);
    }).join('');
}

function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = products.slice(0, 4);
    container.innerHTML = featured.map(function(product) {
        return createProductCard(product);
    }).join('');
}

function renderNewProducts() {
    const container = document.getElementById('newProducts');
    if (!container) return;

    const newItems = products.slice(4, 8);
    container.innerHTML = newItems.map(function(product) {
        return createProductCard(product);
    }).join('');
}

function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating));
    const oldPriceHtml = product.oldPrice ? '<span class="old-price">$' + product.oldPrice + '</span>' : '';
    const badgeHtml = product.badge ? '<span class="product-badge ' + (product.badge.includes('جديد') ? 'new' : '') + '">' + product.badge + '</span>' : '';
    const reviewCount = reviews.filter(function(r) { return r.productId === product.id; }).length;

    return '<div class="product-card">' +
        badgeHtml +
        '<div class="product-image">' + product.image + '</div>' +
        '<div class="product-info">' +
        '<div class="product-category">' + categoryNames[product.category] + '</div>' +
        '<div class="product-name">' + product.name + '</div>' +
        '<div class="product-price">$' + product.price + ' ' + oldPriceHtml + '</div>' +
        '<div class="product-rating">' + '⭐'.repeat(Math.floor(product.rating)) + ' <span class="rating-count" onclick="openReviews(' + product.id + ')">(' + reviewCount + ') تقييم</span></div>' +
        '<div class="product-actions">' +
        '<button class="add-to-cart" onclick="addToCart(' + product.id + ')">أضافة للسلة</button>' +
        '<button class="reviews-btn" onclick="openReviews(' + product.id + ')"><i class="fas fa-star"></i> تقييم</button>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(function(p) { return p.id === productId; });
    if (!product) return;

    const existingItem = cart.find(function(item) { return item.id === productId; });
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    }

    saveToStorage();
    updateCartBadge();
    showNotification('تمت إضافة ' + product.name + ' للسلة');
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
        badge.textContent = totalItems;
    }
}

function openCart() {
    const modal = document.getElementById('cartModal');
    renderCartItems();
    modal.classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cartModal').classList.add('hidden');
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">السلة فارغة</p>';
        return;
    }

    container.innerHTML = cart.map(function(item) {
        return '<div class="cart-item">' +
            '<div class="cart-item-image">' + item.image + '</div>' +
            '<div class="cart-item-info">' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-price">$' + item.price + '</div>' +
            '</div>' +
            '<div class="cart-item-qty">' +
            '<button class="qty-btn" onclick="updateQuantity(' + item.id + ', -1)">-</button>' +
            '<span>' + item.quantity + '</span>' +
            '<button class="qty-btn" onclick="updateQuantity(' + item.id + ', 1)">+</button>' +
            '</div>' +
            '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">&times;</button>' +
            '</div>';
    }).join('');

    updateCartTotal();
}

function updateQuantity(itemId, change) {
    const item = cart.find(function(i) { return i.id === itemId; });
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveToStorage();
        renderCartItems();
        updateCartBadge();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(function(item) { return item.id !== itemId; });
    saveToStorage();
    renderCartItems();
    updateCartBadge();
}

function updateCartTotal() {
    const total = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) {
        totalEl.textContent = '$' + total.toFixed(2);
    }
}

function applyCoupon() {
    const code = document.getElementById('couponCode').value;
    if (code === 'GAME20') {
        showNotification('تم تطبيق خصم 20%');
    } else {
        showNotification('كود الخصم غير صحيح', true);
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة', true);
        return;
    }

    const orderId = 'ORD' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const total = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);

    orders.push({
        id: orderId,
        customer: currentUser ? currentUser.name : 'ضيف',
        items: cart.map(function(item) { return item.name; }),
        total: total,
        status: 'processing'
    });

    cart = [];
    saveToStorage();
    updateCartBadge();
    closeCart();
    showNotification('تم تقديم الطلب رقم: ' + orderId);
}

// Order Tracking
function trackOrder() {
    const orderId = document.getElementById('orderInput').value;
    const order = orders.find(function(o) { return o.id === orderId; });

    const statusDiv = document.getElementById('orderStatus');
    if (!order) {
        showNotification('الطلب غير موجود', true);
        return;
    }

    document.getElementById('displayOrderId').textContent = order.id;
    const statusBadge = document.getElementById('orderStatusBadge');
    statusBadge.textContent = getStatusText(order.status);
    statusBadge.className = 'status-badge ' + order.status;

    statusDiv.classList.remove('hidden');
}

function getStatusText(status) {
    const texts = {
        'processing': 'قيد التجهيز',
        'shipped': 'في الطريق',
        'delivered': 'تم التوصيل'
    };
    return texts[status] || status;
}

// Search & Filter
function searchProducts(query) {
    if (!query) {
        renderProducts();
        return;
    }

    const filtered = products.filter(function(p) {
        return p.name.includes(query) || p.description.includes(query);
    });

    const container = document.getElementById('allProducts');
    if (!container) return;
    container.innerHTML = filtered.map(function(product) {
        return createProductCard(product);
    }).join('');
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    let filtered = category === 'all' ? products : products.filter(function(p) { return p.category === category; });

    const container = document.getElementById('allProducts');
    if (!container) return;
    container.innerHTML = filtered.map(function(product) {
        return createProductCard(product);
    }).join('');
}

function sortProducts() {
    const sort = document.getElementById('priceSort').value;
    let sorted = products.slice();

    switch (sort) {
        case 'price-low':
            sorted.sort(function(a, b) { return a.price - b.price; });
            break;
        case 'price-high':
            sorted.sort(function(a, b) { return b.price - a.price; });
            break;
        case 'new':
            sorted.sort(function(a, b) { return b.id - a.id; });
            break;
    }

    const container = document.getElementById('allProducts');
    if (!container) return;
    container.innerHTML = sorted.map(function(product) {
        return createProductCard(product);
    }).join('');
}

function filterCategory(category) {
    const catFilter = document.getElementById('categoryFilter');
    if (catFilter) {
        catFilter.value = category;
    }
    showPage('products');
    filterProducts();
}

// Admin Functions
function updateStats() {
    const totalOrdersEl = document.getElementById('totalOrders');
    const totalRevenueEl = document.getElementById('totalRevenue');
    const totalProductsEl = document.getElementById('totalProducts');
    const totalUsersEl = document.getElementById('totalUsers');

    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
    if (totalRevenueEl) totalRevenueEl.textContent = '$' + orders.reduce(function(sum, o) { return sum + o.total; }, 0).toFixed(2);
    if (totalProductsEl) totalProductsEl.textContent = products.length;
    if (totalUsersEl) totalUsersEl.textContent = users.length;
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    document.querySelector('[data-tab="' + tabName + '"]').classList.add('active');

    document.getElementById('productsManagement').classList.add('hidden');
    document.getElementById('ordersManagement').classList.add('hidden');

    if (tabName === 'products-management') {
        document.getElementById('productsManagement').classList.remove('hidden');
    } else if (tabName === 'orders-management') {
        document.getElementById('ordersManagement').classList.remove('hidden');
    }
}

function renderAdminProducts() {
    const container = document.getElementById('adminProductsList');
    if (!container) return;

    container.innerHTML = products.map(function(product) {
        return '<div class="admin-product-item">' +
            '<div class="admin-product-image">' + product.image + '</div>' +
            '<div class="admin-product-info">' +
            '<div class="admin-product-name">' + product.name + '</div>' +
            '<div class="admin-product-price">$' + product.price + '</div>' +
            '<div style="color: var(--text-secondary); font-size: 0.8rem;">المخزون: ' + product.stock + '</div>' +
            '</div>' +
            '<div class="admin-product-actions">' +
            '<button class="edit-btn" onclick="editProduct(' + product.id + ')">تعديل</button>' +
            '<button class="delete-btn" onclick="deleteProduct(' + product.id + ')">حذف</button>' +
            '</div>' +
            '</div>';
    }).join('');
}

function renderAdminOrders() {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;

    container.innerHTML = orders.map(function(order) {
        return '<div class="admin-order-item">' +
            '<div class="order-header">' +
            '<div>' +
            '<div style="font-weight: 600;">' + order.id + '</div>' +
            '<div style="color: var(--text-secondary); font-size: 0.9rem;">' + order.customer + '</div>' +
            '</div>' +
            '<div style="text-align: left;">' +
            '<div style="color: var(--accent); font-weight: 600;">$' + order.total.toFixed(2) + '</div>' +
            '<select class="update-status" onchange="updateOrderStatus(\'' + order.id + '\', this.value)">' +
            '<option value="processing" ' + (order.status === 'processing' ? 'selected' : '') + '>قيد التجهيز</option>' +
            '<option value="shipped" ' + (order.status === 'shipped' ? 'selected' : '') + '>في الطريق</option>' +
            '<option value="delivered" ' + (order.status === 'delivered' ? 'selected' : '') + '>تم التوصيل</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="order-items-list">' + order.items.join(', ') + '</div>' +
            '</div>';
    }).join('');
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value || '🎮';
    const stock = parseInt(document.getElementById('productStock').value) || 0;
    const description = document.getElementById('productDesc').value || '';

    if (!name || !price) {
        showNotification('يرجى إدخال اسم المنتج والسعر', true);
        return;
    }

    const newId = Math.max.apply(null, products.map(function(p) { return p.id; })) + 1;
    products.push({
        id: newId,
        name: name,
        price: price,
        category: category,
        image: image,
        stock: stock,
        description: description,
        rating: 4,
        oldPrice: null,
        badge: null
    });

    saveToStorage();
    renderProducts();
    renderAdminProducts();
    updateStats();

    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productDesc').value = '';

    showNotification('تمت إضافة المنتج بنجاح');
}

function editProduct(productId) {
    showNotification('ميزة التعديل قيد التطوير', true);
}

function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products = products.filter(function(p) { return p.id !== productId; });
        saveToStorage();
        renderProducts();
        renderAdminProducts();
        updateStats();
        showNotification('تم حذف المنتج');
    }
}

function updateOrderStatus(orderId, status) {
    const order = orders.find(function(o) { return o.id === orderId; });
    if (order) {
        order.status = status;
        saveToStorage();
        showNotification('تم تحديث حالة الطلب إلى ' + getStatusText(status));
    }
}

// Auth Functions
function openAuth() {
    document.getElementById('authModal').classList.remove('hidden');
}

function closeAuth() {
    document.getElementById('authModal').classList.add('hidden');
}

function switchAuthMode() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTitle = document.getElementById('authTitle');

    if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        authTitle.textContent = 'تسجيل الدخول';
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        authTitle.textContent = 'إنشاء حساب';
    }
}

function showForgotPassword() {
    showNotification('يرجى التواصل مع المسؤول لإعادة تعيين كلمة المرور', true);
}

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    currentUser = { email: email, name: email.split('@')[0] };
    users.push(currentUser);
    saveToStorage();

    closeAuth();
    showNotification('مرحباً ' + currentUser.name + '!');
}

function handleRegister(e) {
    e.preventDefault();
    const formData = e.target.querySelectorAll('input');
    const name = formData[0].value;
    const email = formData[1].value;

    currentUser = { name: name, email: email };
    users.push(currentUser);
    saveToStorage();

    closeAuth();
    showNotification('مرحباً ' + name + '! تم إنشاء حسابك بنجاح');
}

// Reviews Functions
function openReviews(productId) {
    currentProductId = productId;
    const product = products.find(function(p) { return p.id === productId; });
    if (!product) return;

    const infoContainer = document.getElementById('reviewsProductInfo');
    if (!infoContainer) return;

    infoContainer.innerHTML = '<div class="reviews-product-header">' +
        '<div class="reviews-product-image">' + product.image + '</div>' +
        '<div class="reviews-product-details">' +
        '<div class="product-name">' + product.name + '</div>' +
        '<div class="product-rating">' + '⭐'.repeat(Math.floor(product.rating)) + ' ' + product.rating + '/5</div>' +
        '</div>' +
        '</div>';

    selectedRating = 0;
    renderStarsInput();
    renderProductReviews();
    document.getElementById('reviewsModal').classList.remove('hidden');
}

function closeReviews() {
    document.getElementById('reviewsModal').classList.add('hidden');
    currentProductId = null;
}

function renderStarsInput() {
    const starsContainer = document.getElementById('starsInput');
    if (!starsContainer) return;
    starsContainer.innerHTML = '';
    for (var i = 1; i <= 5; i++) {
        var star = document.createElement('i');
        star.className = i <= selectedRating ? 'fas fa-star' : 'far fa-star';
        star.dataset.star = i;
        star.style.cursor = 'pointer';
        star.style.color = 'var(--gold)';
        star.addEventListener('click', (function(rating) {
            return function() {
                selectedRating = rating;
                renderStarsInput();
            };
        })(i));
        star.addEventListener('mouseenter', (function(rating) {
            return function() {
                highlightStars(rating);
            };
        })(i));
        star.addEventListener('mouseleave', function() {
            renderStarsInput();
        });
        starsContainer.appendChild(star);
    }
}

function highlightStars(rating) {
    var starEls = document.querySelectorAll('#starsInput i');
    starEls.forEach(function(star, index) {
        star.className = index < rating ? 'fas fa-star' : 'far fa-star';
    });
}

function submitReview() {
    var reviewText = document.getElementById('reviewText').value;

    if (selectedRating === 0) {
        showNotification('يرجى اختيار تقييم', true);
        return;
    }

    if (!reviewText.trim()) {
        showNotification('يرجى كتابة تعليق', true);
        return;
    }

    var newReview = {
        id: reviews.length + 1,
        productId: currentProductId,
        user: currentUser ? currentUser.name : 'ضيف',
        rating: selectedRating,
        text: reviewText,
        date: new Date().toISOString().split('T')[0]
    };

    reviews.push(newReview);
    updateProductRating(currentProductId);

    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    renderStarsInput();
    renderProductReviews();
    showNotification('شكراً لتقييمك!');
}

function updateProductRating(productId) {
    var productReviews = reviews.filter(function(r) { return r.productId === productId; });
    if (productReviews.length === 0) return;

    var avgRating = productReviews.reduce(function(sum, r) { return sum + r.rating; }, 0) / productReviews.length;
    var product = products.find(function(p) { return p.id === productId; });
    if (product) {
        product.rating = Math.round(avgRating * 10) / 10;
        saveToStorage();
        renderProducts();
    }
}

function renderProductReviews() {
    var container = document.getElementById('reviewsList');
    var productReviews = reviews.filter(function(r) { return r.productId === currentProductId; });

    if (!container) return;

    if (productReviews.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">لا توجد تعليقات بعد. كن الأول!</p>';
        return;
    }

    container.innerHTML = productReviews.map(function(review) {
        return '<div class="review-item">' +
            '<div class="review-header">' +
            '<div class="review-user">' + review.user + '</div>' +
            '<div class="review-rating">' + '⭐'.repeat(review.rating) + '</div>' +
            '</div>' +
            '<div class="review-text">' + review.text + '</div>' +
            '<div class="review-date">' + review.date + '</div>' +
            '</div>';
    }).join('');
}

// Theme Toggle
function toggleTheme() {
    isDarkMode = !isDarkMode;
    var icon = document.querySelector('#themeToggle i');

    if (isDarkMode) {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }

    showNotification(isDarkMode ? 'الوضع الداكن مفعل' : 'الوضع الفاتح مفعل');
}

// Notifications
function showNotification(message, isError) {
    isError = isError || false;
    var notification = document.getElementById('notification');
    var text = document.getElementById('notificationText');

    text.textContent = message;
    notification.className = 'notification ' + (isError ? 'error' : '');

    setTimeout(hideNotification, 3000);
}

function hideNotification() {
    document.getElementById('notification').classList.add('hidden');
}

// Initialize badge
updateCartBadge();