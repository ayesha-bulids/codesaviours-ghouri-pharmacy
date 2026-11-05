
// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart in localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
}

// Get product information using its ID
function getProduct(id) {
    return products.find(product => product.id === Number(id));
}

// Update cart badge in navbar
function updateCartBadge() {
    const badges = document.querySelectorAll(".cart-badge");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    badges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

// Add product to cart
function addToCart(productId, quantity = 1) {
    const product = getProduct(productId);

    if (!product || product.inStock === false) {
        return;
    }

    const existingItem = cart.find(
        item => item.id === Number(productId)
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: Number(productId),
            quantity: quantity
        });
    }

    saveCart();
    alert("Added to cart!");
}

// Display cart products
function renderCart() {
    const cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-5">
                <h4>Your cart is empty</h4>
                <p class="text-muted">Add some medicines to your cart.</p>
                <a href="medicines.html" class="btn btn-primary-custom">
                    Browse Medicines
                </a>
            </div>
        `;
        updateCartSummary();
        return;
    }

    cart.forEach(item => {
        const product = getProduct(item.id);

        if (!product) return;

        const itemTotal = Number(product.price) * item.quantity;

        cartItems.innerHTML += `
            <div class="card shadow-sm mb-3 p-3">
                <div class="d-flex align-items-center gap-3">

                    <img src="${product.image}"
                        alt="${product.name}"
                        style="width:80px;height:80px;object-fit:contain;"
                        onerror="this.src='images/ghouri-logo.jpeg'">

                    <div class="flex-grow-1">
                        <h6>${product.name}</h6>

                        <p class="text-muted mb-1">
                            ${product.packSize || ""}
                        </p>

                        <strong>Rs. ${product.price}</strong>

                        <div class="d-flex align-items-center gap-2 my-2">

                            <button
                                class="btn btn-sm btn-outline-secondary"
                                type="button"
                                onclick="changeQuantity(${item.id}, -1)">
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                class="btn btn-sm btn-outline-secondary"
                                type="button"
                                onclick="changeQuantity(${item.id}, 1)">
                                +
                            </button>

                            <button
                                class="btn btn-sm btn-outline-danger"
                                type="button"
                                onclick="removeFromCart(${item.id})">
                                Remove
                            </button>

                        </div>

                        <strong>Line Total: Rs. ${itemTotal}</strong>
                    </div>
                </div>
            </div>
        `;
    });

    updateCartSummary();
}

// Update subtotal and total
function updateCartSummary() {
    let subtotal = 0;

    cart.forEach(item => {
        const product = getProduct(item.id);

        if (product) {
            subtotal += Number(product.price) * item.quantity;
        }
    });

    const subtotalElement = document.getElementById("cartSubtotal");
    const deliveryElement = document.getElementById("deliveryCharge");
    const totalElement = document.getElementById("cartTotal");

    if (subtotalElement) {
        subtotalElement.textContent = `Rs. ${subtotal}`;
    }

    if (deliveryElement) {
        deliveryElement.textContent = "Rs. 0";
    }

    if (totalElement) {
        totalElement.textContent = `Rs. ${subtotal}`;
    }
}

// Change product quantity
function changeQuantity(productId, change) {
    const item = cart.find(
        item => item.id === Number(productId)
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(
            item => item.id !== Number(productId)
        );
    }

    saveCart();
    renderCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(
        item => item.id !== Number(productId)
    );

    saveCart();
    renderCart();
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Run when page loads
document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    renderCart();

    const clearButton = document.getElementById("clearCartBtn");

    if (clearButton) {
        clearButton.addEventListener("click", clearCart);
    }
});
// WhatsApp Order
function orderOnWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Add official WhatsApp number when available
    const whatsappNumber = "923XXXXXXXXX";

    if (whatsappNumber === "923XXXXXXXXX") {
        alert("WhatsApp number will be added after confirmation from pharmacy.");
        return;
    }

    let message = "Assalam-o-Alaikum Ghouri Pharmacy!\n\n";
    message += "I want to order these medicines:\n\n";

    cart.forEach(item => {
        const product = getProduct(item.id);

        if (product) {
            message += `${product.name}\n`;
            message += `Quantity: ${item.quantity}\n`;
            message += `Price: Rs. ${product.price * item.quantity}\n\n`;
        }
    });

    message += `Total: Rs. ${cart.reduce((total, item) => {
        const product = getProduct(item.id);
        return total + (product ? Number(product.price) * item.quantity : 0);
    }, 0)}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// WhatsApp button click event
document.addEventListener("DOMContentLoaded", function () {
    const whatsappButton = document.getElementById("whatsappOrderBtn");

    if (whatsappButton) {
        whatsappButton.addEventListener("click", orderOnWhatsApp);
    }
});