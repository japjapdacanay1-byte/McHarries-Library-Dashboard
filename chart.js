let categoryChart;
let stockChart;
let productsChart;


// ================= CATEGORY CHART =================

function createCategoryChart() {

    const summary = getCategorySummary();

    const labels = Object.keys(summary);

    const values = Object.values(summary);


    if (categoryChart) {

        categoryChart.destroy();

    }


    categoryChart = new Chart(
        document.getElementById("categoryValueChart"),
        {

            type: "bar",

            data: {

                labels: labels,

                datasets: [

                    {
                        label: "Inventory Value (₱)",

                        data: values

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        }
    );

}


// ================= STOCK CHART =================

function createStockChart() {

    let inStock = 0;
    let lowStock = 0;
    let outStock = 0;


    products.forEach(function(product) {

        const status = getStockStatus(product);


        if (status === "in-stock") {

            inStock++;

        }

        else if (status === "low-stock") {

            lowStock++;

        }

        else {

            outStock++;

        }

    });


    if (stockChart) {

        stockChart.destroy();

    }


    stockChart = new Chart(
        document.getElementById("stockStatusChart"),
        {

            type: "doughnut",

            data: {

                labels: [
                    "In Stock",
                    "Low Stock",
                    "Out of Stock"
                ],

                datasets: [

                    {
                        data: [
                            inStock,
                            lowStock,
                            outStock
                        ]
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        }
    );

}


// ================= TOP PRODUCTS =================

function createProductsChart() {

    const sorted = [...products].sort(function(a, b) {

        return (
            getInventoryValue(b) -
            getInventoryValue(a)
        );

    });


    const top = sorted.slice(0, 6);


    if (productsChart) {

        productsChart.destroy();

    }


    productsChart = new Chart(
        document.getElementById("topProductsChart"),
        {

            type: "bar",

            data: {

                labels: top.map(function(product) {

                    return product.name;

                }),

                datasets: [

                    {
                        label: "Inventory Value (₱)",

                        data: top.map(function(product) {

                            return getInventoryValue(product);

                        })

                    }

                ]

            },

            options: {

                indexAxis: "y",

                responsive: true,

                maintainAspectRatio: false

            }

        }
    );

}


// ================= CREATE ALL =================

function createAllCharts() {

    createCategoryChart();

    createStockChart();

    createProductsChart();

}