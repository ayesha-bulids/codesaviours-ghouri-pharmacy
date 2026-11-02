
// Get the product grid and results count elements
const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");

// Get the category list element
const categoryList = document.getElementById("categoryList");

// Store all products
let allProducts = products;

// Display product cards
function renderProducts(list) {

    productGrid.innerHTML = "";

    resultsCount.textContent = `Showing ${list.length} products`;

    // Show message if no products exist
    if (list.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <h5>No medicines available.</h5>
            </div>
        `;
        return;
    }

    // Create a card for every product
    list.forEach(product => {

        const stockStatus = product.inStock
            ? ""
            : `<span class="badge bg-danger mb-2">Out of Stock</span>`;

        const prescriptionLabel = product.prescriptionRequired
            ? `<span class="badge bg-warning text-dark mb-2">Rx Required</span>`
            : "";

        const card = document.createElement("div");

        card.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

        card.innerHTML = `
            <div class="card h-100 shadow-sm">

                <img
                    src="${product.image || 'images/ghouri-logo.jpeg'}"
                    class="card-img-top"
                    alt="${product.name}"
                    style="height: 180px; object-fit: contain; padding: 15px;"
                    onerror="this.onerror=null; this.src='images/ghouri-logo.jpeg';"
                >

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title">${product.name}</h5>

                    <p class="text-muted mb-1">
                        ${product.packSize || "Pack size not available"}
                    </p>

                    <h5 class="text-primary mb-2">
                        Rs. ${Number(product.price).toLocaleString("en-PK")}
                    </h5>

                    <div>
                        ${prescriptionLabel}
                        ${stockStatus}
                    </div>

                    <div class="mt-auto d-flex gap-2">

                        <button class="btn btn-outline-primary btn-sm flex-fill"
                            type="button">
                            View
                        </button>

                        <button class="btn btn-primary btn-sm flex-fill"
                            type="button"
                            ${!product.inStock ? "disabled" : ""}>
                            Add to Cart
                        </button>

                    </div>

                </div>
            </div>
        `;

        if (!product.inStock) {
            card.querySelector(".card").style.opacity = "0.6";
        }

        productGrid.appendChild(card);

    });
}

// Display product categories
function renderCategories() {

    const categories = [
        ...new Set(allProducts.map(product => product.category))
    ];

    categories.forEach(category => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "btn btn-outline-primary w-100 mb-2";
        button.textContent = category;

        button.dataset.category = category;

        categoryList.appendChild(button);

    });
}

// Start displaying products
renderCategories();
renderProducts(allProducts);
