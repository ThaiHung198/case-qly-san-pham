

let products = [
    {
        id: 1,
        name: "Sơn gel nâu lệ màu RAMYLA",
        price: 29800,
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-23030-vuz6beypcnov3c",
        location: "Kim Ánh, Việt Nam",
        official: true,
        quantity: 100,
        category: "son-gel",
        brand: "RAMYLA",
        description: "Sơn gel chất lượng cao, bền màu",
        expiryDate: ""
    },
    {
        id: 2,
        name: "Sơn gel trứng cá RAMYLA",
        price: 39800,
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmtrmf3xi47z15",
        location: "Kim Ánh, Việt Nam",
        official: true,
        quantity: 80,
        category: "son-gel",
        brand: "RAMYLA",
        description: "Sơn gel hiệu ứng trứng cá độc đáo",
        expiryDate: ""
    },
    {
        id: 3,
        name: "Sơn gel mắt mèo ánh vàng RAMYLA",
        price: 49000,
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsh12mo70hqcf5",
        location: "Kim Ánh, Việt Nam",
        official: true,
        quantity: 60,
        category: "son-gel",
        brand: "RAMYLA",
        description: "Sơn gel hiệu ứng mắt mèo sang trọng",
        expiryDate: ""
    },
    {
        id: 4,
        name: "Set sơn gel mắt mèo ánh vàng RAMYLA 12 màu",
        price: 598000,
        image: "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qeqk5oq02rlv0d",
        location: "Kim Ánh, Việt Nam",
        official: true,
        quantity: 20,
        category: "son-gel",
        brand: "RAMYLA",
        description: "Bộ sưu tập 12 màu sơn gel mắt mèo",
        expiryDate: ""
    },
    {
        id: 5,
        name: "Quà tặng mẫu chấm nhạt RAMYLA",
        price: 49000,
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-leuyby0kyhe2ec",
        location: "Kim Ánh, Việt Nam",
        official: true,
        quantity: 50,
        category: "trang-tri-nail",
        brand: "RAMYLA",
        description: "Bộ dụng cụ chấm nail chuyên nghiệp",
        expiryDate: ""
    },
    {
        id: 6,
        name: "Mắt mèo thạch anh RAMYLA",
        price: 55000,
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lziyna3liyzl87",
        location: "Kim Ánh, Việt Nam",
        official: true,
        quantity: 40,
        category: "trang-tri-nail",
        brand: "RAMYLA",
        description: "Phụ kiện trang trí nail hình mắt mèo",
        expiryDate: ""
    },
    {
        id: 7,
        name: "Sơn gel mắt mèo kim cương",
        price: 49000,
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln73hj6u2lso02",
        location: "Kim Ánh, Việt Nam",
        official: true,
        quantity: 70,
        category: "son-gel",
        brand: "RAMYLA",
        description: "Sơn gel hiệu ứng kim cương lấp lánh",
        expiryDate: ""
    }
];

let cart = [];
let currentProduct = null;
let editingProductId = null;

//Sự kiện DOMContentLoaded: Đảm bảo mã chỉ chạy sau khi DOM được tải hoàn toàn.
document.addEventListener('DOMContentLoaded', function() {
    renderProductGrid(); //Hiển thị danh sách sản phẩm dưới dạng lưới (grid).
    renderProductTable(); // renderProductTable(): Hiển thị danh sách sản phẩm dưới dạng bảng (table).


    // Thêm sự kiện input để xem trước ảnh khi nhập URL
    document.getElementById('productImageUrl').addEventListener('input', function() {
        let url = this.value.trim();
        let preview = document.getElementById('imagePreview');
        if (url) {
            preview.src = url;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    });
});
// Hàm hiển thị danh sách sản phẩm dưới dạng lưới
// Tham số mặc định là mảng products nếu không truyền tham số
function renderProductGrid(productsToRender = products) {
    let productGrid = document.getElementById('productGrid');// Lấy phần tử lưới sản phẩm
    productGrid.innerHTML = '';

    // Kiểm tra nếu không có sản phẩm nào để hiển thị
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Không tìm thấy sản phẩm phù hợp</p>';
        return;// Thoát hàm
    }
// Duyệt qua từng sản phẩm để tạo thẻ
    productsToRender.forEach(product => {
        let productCard = document.createElement('div');// Tạo phần tử div cho mỗi sản phẩm
        productCard.className = 'product-card';// Gán class cho styling

        productCard.innerHTML = `
            ${product.official ? '<div class="official-badge">CHÍNH HÃNG</div>' : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/250x200?text=No+Image'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-meta">
                    <span>${product.location}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-buy" onclick="showProductModal(${product.id})">Mua ngay</button>
                    <button class="btn btn-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                </div>
            </div>
        `;

        productGrid.appendChild(productCard);// Thêm thẻ vào lưới
    });
}

// Hàm hiển thị danh sách sản phẩm dưới dạng bảng quản lý
function renderProductTable(productsToRender = products) {
    let productTable = document.getElementById('productTable');// Lấy phần tử bảng
    productTable.innerHTML = '';

// Kiểm tra nếu không có sản phẩm
    if (productsToRender.length === 0) {
        productTable.innerHTML = '<tr><td colspan="7" class="no-products">Không có sản phẩm nào</td></tr>';
        return;
    }
// Duyệt qua từng sản phẩm để tạo hàng bảng
    productsToRender.forEach(product => {
        let row = document.createElement('tr');// Tạo hàng mới
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td><img src="${product.image}" class="product-table-image" onerror="this.src='https://via.placeholder.com/80x60?text=No+Image'"></td>
            <td>${formatPrice(product.price)}đ</td>
            <td>${product.quantity}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">Sửa</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
            </td>
        `;
        productTable.appendChild(row);// thêm hàng vào bảng
    });
}

// Hàm lọc sản phẩm trong lưới dựa trên từ khóa, giá và danh mục
function filterProducts() {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let priceFilter = document.getElementById('priceFilter').value;
    let categoryFilter = document.getElementById('categoryFilter').value;

    // Lọc theo từ khóa trong tên, thương hiệu hoặc mô tả
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    filteredProducts = filteredProducts.filter(product => {
        if (priceFilter === 'all') return true;
        if (priceFilter === 'under50k') return product.price < 50000;
        if (priceFilter === '50kto200k') return product.price >= 50000 && product.price <= 200000;
        if (priceFilter === 'over200k') return product.price > 200000;
        return true;
    });

    // Lọc theo danh mục
    filteredProducts = filteredProducts.filter(product => {
        if (categoryFilter === 'all') return true;
        return product.category === categoryFilter;
    });

    renderProductGrid(filteredProducts); // Hiển thị danh sách đã lọc
}

// Hàm lọc sản phẩm trong bảng dựa trên từ khóa và danh mục
function filterTable() {
    let searchTerm = document.getElementById('tableSearch').value.toLowerCase();
    let categoryFilter = document.getElementById('tableFilter').value;

    // Lọc theo từ khóa trong tên, thương hiệu hoặc ID
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        String(product.id).includes(searchTerm)
    );

    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    renderProductTable(filteredProducts);
}

// Hàm định dạng giá, thêm dấu chấm phân cách hàng nghìn
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Hàm chuyển đổi mã danh mục thành tên đầy đủ
function getCategoryName(category) {
    switch(category) {
        case 'son-gel': return 'Sơn Gel';
        case 'mong': return 'Móng';
        case 'trang-tri-nail': return 'Trang trí nail';
        case 'dung-cu-nail': return 'Dụng cụ nail';
        default: return category;
    }
}

// Hàm bật/tắt trường nhập ngày hết hạn
function toggleExpiryDate() {
    let expiryDateInput = document.getElementById('expiryDate');
    expiryDateInput.disabled = !document.getElementById('hasExpiryDate').checked;
    if (expiryDateInput.disabled) {
        expiryDateInput.value = '';
    }
}

// Hàm lưu sản phẩm mới hoặc cập nhật sản phẩm
function saveProduct() {
    let name = document.getElementById('productName').value.trim();
    let price = parseInt(document.getElementById('productPrice').value);
    let quantity = parseInt(document.getElementById('productQuantity').value);
    let location = document.getElementById('productLocation').value.trim();
    let brand = document.getElementById('productBrand').value.trim();
    let category = document.getElementById('productCategory').value;
    let description = document.getElementById('productDescription').value.trim();
    let hasExpiryDate = document.getElementById('hasExpiryDate').checked;
    let expiryDate = hasExpiryDate ? document.getElementById('expiryDate').value : '';
    let imageUrl = document.getElementById('productImageUrl').value.trim();

    // Xác thực dữ liệu đầu vào
    if (!name || isNaN(price) || price <= 0 || isNaN(quantity) || quantity < 0 || !location || !brand || !imageUrl) {
        alert('Vui lòng điền đầy đủ thông tin sản phẩm');
        return;
    }

    if (editingProductId !== null) {// Nếu đang chỉnh sửa sản phẩm
        let index = products.findIndex(p => p.id === editingProductId);// Tìm chỉ số sản phẩm
        if (index !== -1) {
            products[index] = {// Cập nhật thông tin sản phẩm
                ...products[index],
                name,
                price,
                quantity,
                location,
                brand,
                category,
                description,
                expiryDate,
                image: imageUrl
            };
        }
        editingProductId = null;// Reset trạng thái chỉnh sửa
    } else {
        //Nếu thêm sản phẩm mới sẽ tạo thêm Id mới.
        let newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name,
            price,
            image: imageUrl,
            location,
            official: true,
            quantity,
            category,
            brand,
            description,
            expiryDate
        };
        products.unshift(newProduct); // Thêm sản phẩm vào đầu mảng
    }

    // Reset form về trạng thái ban đầu
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('productLocation').value = 'Kim Ánh, Việt Nam';
    document.getElementById('productBrand').value = '';
    document.getElementById('productCategory').value = 'son-gel';
    document.getElementById('productDescription').value = '';
    document.getElementById('hasExpiryDate').checked = false;
    document.getElementById('expiryDate').value = '';
    document.getElementById('expiryDate').disabled = true;
    document.getElementById('productImageUrl').value = '';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreview').style.display = 'none';

    // cập nhật giao diện
    renderProductGrid();
    renderProductTable();
    filterProducts();
    filterTable();

    // cuộn lên đầu trang để xem sản phẩm mới
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// hàm chỉnh sửa sản phẩm
function editProduct(id) {
    let product = products.find(p => p.id === id);// Tìm sản phẩm theo ID
    if (!product) return;// Thoát nếu không tìm thấy

    editingProductId = id;// Đặt ID sản phẩm đang chỉnh sửa

    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productLocation').value = product.location;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImageUrl').value = product.image;

    if (product.expiryDate) {
        document.getElementById('hasExpiryDate').checked = true;
        document.getElementById('expiryDate').disabled = false;
        document.getElementById('expiryDate').value = product.expiryDate;
    } else {
        document.getElementById('hasExpiryDate').checked = false;
        document.getElementById('expiryDate').disabled = true;
        document.getElementById('expiryDate').value = '';
    }
// Hiển thị ảnh xem trước
    let preview = document.getElementById('imagePreview');
    preview.src = product.image;
    preview.style.display = 'block';

    // cuộn đêến  phần form
    document.querySelector('.management').scrollIntoView({ behavior: 'smooth' });
}

// xóa sp
function deleteProduct(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        products = products.filter(p => p.id !== id);
        renderProductGrid(); //cập nhật lưới
        renderProductTable(); // bảng
        filterProducts();//bộ lọc lưới
        filterTable();// bảng
    }
}

// Hàm hiển thị chi tiết sản phẩm
function showProductModal(id) {
    let product = products.find(p => p.id === id);//tìm sản phẩm
    if (!product) return;

    currentProduct = product;// Lưu sản phẩm hiện tại

    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `${formatPrice(product.price)}đ`;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('successMessage').style.display = 'none';

    document.getElementById('productModal').style.display = 'flex';
}

// đóng modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// thanh toán(thêm vào giỏ haàng)
function checkout() {
    if (!currentProduct) return;

    addToCart(currentProduct.id);

    document.getElementById('successMessage').style.display = 'block';

    setTimeout(() => {
        closeModal();
    }, 2000);
}

// thêm sp
function addToCart(id) {
    let product = products.find(p => p.id === id);
    if (!product) return;

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
    });

    updateCart();// cập nhật giao diện giỏ hàng
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}


function updateCart() {
    let cartItems = document.getElementById('cart-items');
    let cartCount = document.getElementById('cart-count');
    let cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';

    let total = 0;// tính tổng tiền
    cart.forEach((item, index) => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" class="cart-item-image" alt="${item.name}" onerror="this.src='https://via.placeholder.com/50x50?text=No+Image'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}đ</div>
            </div>
            <span class="remove-item" onclick="removeFromCart(${index})">✕</span>
        `;
        cartItems.appendChild(cartItem); //thêm mục vào danh sách
        total += item.price;
    });

    cartCount.textContent = cart.length; //cập nhật số lượng sản phẩm
    cartTotal.textContent = formatPrice(total); // cập nhật tổng tiền
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Hàm bật/tắt hiển thị giỏ hàng
function toggleCart() {
    let cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';// Chuyển đổi hiển thị
}

// xem thông tin cart
function viewCart() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
    } else {
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Bạn có ${cart.length} sản phẩm trong giỏ hàng. Tổng tiền: ${formatPrice(total)}đ`);
    }
}

//// Sự kiện đóng dropdown giỏ hàng khi nhấp ra ngoài
document.addEventListener('click', function(event) {
    let cartContainer = document.querySelector('.cart-container');
    if (!cartContainer.contains(event.target)) {
        document.getElementById('cart-dropdown').style.display = 'none';
    }
});

// Khởi tạo sự kiện lọc bảng
document.getElementById('tableSearch').addEventListener('input', filterTable);
document.getElementById('tableFilter').addEventListener('change', filterTable);