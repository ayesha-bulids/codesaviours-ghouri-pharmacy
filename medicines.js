
// Get HTML elements
const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const categoryList = document.getElementById("categoryList");
const medicineSearch = document.getElementById("medicineSearch");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

// Store all products
const allProducts = Array.isArray(products) ? products : [];

// Current selected category
let selectedCategory = "All";

// Display products
function renderProducts(list) {

    productGrid.innerHTML = "";

    resultsCount.textContent = `Showing ${list.length} products`;

    if (list.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <h5>No medicines available.</h5>
                <p class="text-muted">Try another search or category.</p>
            </div>
        `;
        return;
    }

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
                        Rs. ${Number(product.price || 0).toLocaleString("en-PK")}
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


// Create category buttons and dropdown options
function renderCategories() {

    categoryList.innerHTML = "";

    categoryFilter.innerHTML = `
        <option value="All">All Categories</option>
    `;

    const allButton = document.createElement("button");

    allButton.type = "button";
    allButton.className = "btn btn-outline-primary w-100 mb-2 active";
    allButton.textContent = "All Medicines";
    allButton.dataset.category = "All";

    allButton.addEventListener("click", function () {
        selectedCategory = "All";
        categoryFilter.value = "All";
        updateActiveCategory();
        filterProducts();
    });

    categoryList.appendChild(allButton);

    const categories = [
        ...new Set(allProducts.map(product => product.category).filter(Boolean))
    ];

    categories.forEach(category => {

        // Sidebar category button
        const button = document.createElement("button");

        button.type = "button";
        button.className = "btn btn-outline-primary w-100 mb-2";
        button.textContent = category;
        button.dataset.category = category;

        button.addEventListener("click", function () {

            selectedCategory = category;
            categoryFilter.value = category;

            updateActiveCategory();
            filterProducts();
        });

        categoryList.appendChild(button);

        // Dropdown category option
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


// Highlight selected category button
function updateActiveCategory() {

    const buttons = categoryList.querySelectorAll("button");

    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === selectedCategory
        );
    });
}


// Search, filter and sort products
function filterProducts() {

    let filteredProducts = [...allProducts];

    // Category filter
    if (selectedCategory !== "All") {

        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    // Search filter
    const searchText = medicineSearch.value.toLowerCase().trim();

    if (searchText !== "") {

        filteredProducts = filteredProducts.filter(product =>

            product.name.toLowerCase().includes(searchText) ||
            (product.category || "").toLowerCase().includes(searchText) ||
            (product.description || "").toLowerCase().includes(searchText)
        );
    }

    // Sorting
    const sortValue = sortFilter.value;

    if (sortValue === "name-asc") {

        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else if (sortValue === "price-low") {

        filteredProducts.sort((a, b) =>
            Number(a.price) - Number(b.price)
        );

    } else if (sortValue === "price-high") {

        filteredProducts.sort((a, b) =>
            Number(b.price) - Number(a.price)
        );
    }

    renderProducts(filteredProducts);
}


// Search event
medicineSearch.addEventListener("input", filterProducts);


// Category dropdown event
categoryFilter.addEventListener("change", function () {

    selectedCategory = this.value;

    updateActiveCategory();
    filterProducts();
});


// Sort dropdown event
sortFilter.addEventListener("change", filterProducts);


// Start the medicines page
renderCategories();
renderProducts(allProducts);
