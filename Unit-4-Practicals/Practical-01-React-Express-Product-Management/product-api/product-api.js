const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

let products = [
    {
        id: 101,
        name: "Laptop",
        category: "Electronics",
        price: 55000
    },
    {
        id: 102,
        name: "Mobile",
        category: "Electronics",
        price: 25000
    },
    {
        id: 103,
        name: "Shoes",
        category: "Fashion",
        price: 3000
    }
];

const logger = (req, res, next) => {
    console.log("-------------");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    next();
};

app.use(logger);

app.get("/", (req, res) => {
    res.send("Welcome to Online Shopping API");
});

app.get("/products", (req, res) => {
    res.status(200).json(products);
});

app.get("/products/search", (req, res) => {
    const category = req.query.category;

    const result = products.filter(
        product =>
            product.category.toLowerCase() ===
            category.toLowerCase()
    );

    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({
            message: "No products found"
        });
    }
});

app.get("/products/:id", (req, res) => {
    const productId = req.params.id;

    const product = products.find(
        p => p.id == productId
    );

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

app.post("/products", (req, res) => {
    const newProduct = {
        ...req.body,
        id: products.length > 0
            ? Math.max(...products.map(p => Number(p.id) || 0)) + 1
            : 101
    };
    products.push(newProduct);
    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});


app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const index = products.findIndex(
        p => p.id == productId
    );
    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...req.body,
            id: products[index].id
        };
        res.status(200).json({
            message: "Product updated successfully",
            product: products[index]
        });
    } 
    else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;

    const index = products.findIndex(
        p => p.id == productId
    );

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct[0]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

app.use((req, res) => {
    res.status(404).json({
        message: "API endpoint not found"
    });
});

app.listen(port, () => {
    console.log(
        `Server running at http://localhost:${port}`
    );
});