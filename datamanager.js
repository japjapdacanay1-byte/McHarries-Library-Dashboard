// ================= SAMPLE LIBRARY DATA =================

const products = [

    {
        sku: "BOOK-001",
        name: "Java Programming",
        category: "Programming",
        price: 550,
        quantity: 12,
        reorderLevel: 5,
        sales: 8
    },

    {
        sku: "BOOK-002",
        name: "Web Development Basics",
        category: "Web Development",
        price: 450,
        quantity: 7,
        reorderLevel: 5,
        sales: 10
    },

    {
        sku: "BOOK-003",
        name: "Database Management",
        category: "Database",
        price: 600,
        quantity: 4,
        reorderLevel: 5,
        sales: 6
    },

    {
        sku: "BOOK-004",
        name: "Computer Networking",
        category: "Networking",
        price: 500,
        quantity: 0,
        reorderLevel: 3,
        sales: 12
    },

    {
        sku: "BOOK-005",
        name: "Information Management",
        category: "Information Systems",
        price: 650,
        quantity: 15,
        reorderLevel: 5,
        sales: 9
    },

    {
        sku: "BOOK-006",
        name: "JavaScript Essentials",
        category: "Web Development",
        price: 520,
        quantity: 3,
        reorderLevel: 5,
        sales: 14
    },

    {
        sku: "BOOK-007",
        name: "Python Programming",
        category: "Programming",
        price: 580,
        quantity: 10,
        reorderLevel: 4,
        sales: 11
    },

    {
        sku: "BOOK-008",
        name: "Network Security",
        category: "Networking",
        price: 700,
        quantity: 2,
        reorderLevel: 4,
        sales: 15
    }

];


// ================= GET PRODUCTS =================

function getProducts() {

    return products;

}


// ================= STOCK STATUS =================

function getStockStatus(product) {

    if (product.quantity === 0) {

        return "out-of-stock";

    }

    if (product.quantity <= product.reorderLevel) {

        return "low-stock";

    }

    return "in-stock";

}


// ================= LOW STOCK =================

function getLowStockProducts() {

    return products.filter(function(product) {

        return product.quantity <= product.reorderLevel;

    });

}


// ================= INVENTORY VALUE =================

function getInventoryValue(product) {

    return product.price * product.quantity;

}


// ================= CATEGORY SUMMARY =================

function getCategorySummary() {

    const summary = {};

    products.forEach(function(product) {

        if (!summary[product.category]) {

            summary[product.category] = 0;

        }

        summary[product.category] +=
            getInventoryValue(product);

    });

    return summary;

}


// ================= FILTERS =================

function filterByCategory(data, category) {

    if (category === "all") {

        return data;

    }

    return data.filter(function(product) {

        return product.category === category;

    });

}


function filterByStockStatus(data, status) {

    if (status === "all") {

        return data;

    }

    return data.filter(function(product) {

        return getStockStatus(product) === status;

    });

}


function searchProducts(data, keyword) {

    if (!keyword) {

        return data;

    }

    keyword = keyword.toLowerCase();

    return data.filter(function(product) {

        return (
            product.name.toLowerCase().includes(keyword) ||
            product.sku.toLowerCase().includes(keyword)
        );

    });

}


// ================= CSV =================

function exportToCSV(data) {

    let csv =
        "SKU,Book Name,Category,Price,Quantity,Reorder Level,Sales,Status\n";

    data.forEach(function(product) {

        csv +=
            product.sku + "," +
            '"' + product.name + '",' +
            product.category + "," +
            product.price + "," +
            product.quantity + "," +
            product.reorderLevel + "," +
            product.sales + "," +
            getStockStatus(product) +
            "\n";

    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "McHarries_Library_Inventory.csv";

    link.click();

    URL.revokeObjectURL(url);

}