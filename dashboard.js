// ================= START DASHBOARD =================

document.addEventListener("DOMContentLoaded", function() {

    loadUser();

    updateStatistics();

    populateCategories();

    updateTable(products);

    updateAlerts();

    updateReports();

    createAllCharts();

});


// ================= USER =================

function loadUser() {

    const username =
        localStorage.getItem("username");

    if (username) {

        document.getElementById("currentUser").textContent =
            username;

    }

}


// ================= NAVIGATION =================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".content-section");


    sections.forEach(function(section) {

        section.classList.add("hidden-section");

    });


    document
        .getElementById(sectionId)
        .classList.remove("hidden-section");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionId === "booksSection") {

        updateTable(products);

    }

}


// ================= STATISTICS =================

function updateStatistics() {

    const totalBooks = products.length;


    let totalQuantity = 0;

    let inventoryValue = 0;


    products.forEach(function(product) {

        totalQuantity += product.quantity;

        inventoryValue +=
            getInventoryValue(product);

    });


    const lowStock =
        getLowStockProducts().length;


    document.getElementById("totalBooks").textContent =
        totalBooks;


    document.getElementById("totalQuantity").textContent =
        totalQuantity;


    document.getElementById("lowStock").textContent =
        lowStock;


    document.getElementById("inventoryValue").textContent =
        "₱" + inventoryValue.toLocaleString();

}


// ================= CATEGORY FILTER =================

function populateCategories() {

    const select =
        document.getElementById("categoryFilter");


    const categories = [
        ...new Set(
            products.map(function(product) {
                return product.category;
            })
        )
    ];


    categories.forEach(function(category) {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        select.appendChild(option);

    });

}


// ================= TABLE =================

function updateTable(data) {

    const table =
        document.getElementById("inventoryTable");


    table.innerHTML = "";


    data.forEach(function(product) {

        const row =
            document.createElement("tr");


        const status =
            getStockStatus(product);


        let statusText = "";

        let statusClass = "";


        if (status === "in-stock") {

            statusText = "In Stock";

            statusClass = "status-good";

        }

        else if (status === "low-stock") {

            statusText = "Low Stock";

            statusClass = "status-low";

        }

        else {

            statusText = "Out of Stock";

            statusClass = "status-out";

        }


        row.innerHTML = `

            <td>
                <b>${product.sku}</b>
            </td>

            <td>
                ${product.name}
            </td>

            <td>
                ${product.category}
            </td>

            <td>
                ₱${product.price.toLocaleString()}
            </td>

            <td>
                <b>${product.quantity}</b>
            </td>

            <td>
                ${product.reorderLevel}
            </td>

            <td>
                ${product.sales}
            </td>

            <td>
                <span class="status-badge ${statusClass}">
                    ${statusText}
                </span>
            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById("resultCount").textContent =
        data.length + " products";

}


// ================= FILTER =================

function applyFilters() {

    const keyword =
        document.getElementById("searchInput").value;


    const category =
        document.getElementById("categoryFilter").value;


    const stock =
        document.getElementById("stockFilter").value;


    let filtered =
        searchProducts(products, keyword);


    filtered =
        filterByCategory(filtered, category);


    filtered =
        filterByStockStatus(filtered, stock);


    updateTable(filtered);

}


// ================= RESET =================

function resetFilters() {

    document.getElementById("searchInput").value = "";

    document.getElementById("categoryFilter").value = "all";

    document.getElementById("stockFilter").value = "all";


    updateTable(products);

}


// ================= ALERTS =================

function updateAlerts() {

    const lowStock =
        getLowStockProducts();


    const alertContainer =
        document.getElementById("alertContainer");


    const fullAlerts =
        document.getElementById("fullAlerts");


    if (lowStock.length === 0) {

        alertContainer.innerHTML = "";

        fullAlerts.innerHTML =
            `<div class="alert alert-success">
                ✅ No low stock books.
            </div>`;

        return;

    }


    alertContainer.innerHTML = `

        <div class="alert-box">

            <h5>
                ⚠️ Low Stock Alert
            </h5>

            <p>
                ${lowStock.length}
                book(s) need restocking.
            </p>

            <button
                class="btn btn-warning btn-sm"
                onclick="showSection('alertsSection')">

                View Alerts

            </button>

        </div>

    `;


    fullAlerts.innerHTML = "";


    lowStock.forEach(function(product) {

        const div =
            document.createElement("div");


        div.className =
            "alert alert-warning";


        div.innerHTML = `

            <b>${product.name}</b>

            <br>

            SKU: ${product.sku}

            <br>

            Current Stock:
            <b>${product.quantity}</b>

            <br>

            Reorder Level:
            <b>${product.reorderLevel}</b>

        `;


        fullAlerts.appendChild(div);

    });

}


// ================= REPORTS =================

function updateReports() {

    let quantity = 0;

    let value = 0;


    products.forEach(function(product) {

        quantity += product.quantity;

        value += getInventoryValue(product);

    });


    document.getElementById("reportBooks").textContent =
        products.length;


    document.getElementById("reportQuantity").textContent =
        quantity;


    document.getElementById("reportLowStock").textContent =
        getLowStockProducts().length;


    document.getElementById("reportValue").textContent =
        "₱" + value.toLocaleString();

}


// ================= EXPORT =================

function exportCurrentData() {

    exportToCSV(products);

}


// ================= SETTINGS =================

function showSystemMessage() {

    document.getElementById("systemMessage").innerHTML = `

        <div class="alert alert-success">

            ✅ System is working properly!

        </div>

    `;

}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("username");


    window.location.href = "index.html";

}