import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/productdb")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  brand: String
});

// Product Model
const Product = mongoose.model("Product", productSchema);

// CREATE PRODUCT
// POST /products
app.post("/products", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// GET ALL PRODUCTS
// GET /products
app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
});

// GET PRODUCT BY ID
// GET /products/:id
app.get("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE PRODUCT
// PUT /products/:id
app.put("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// DELETE PRODUCT
// DELETE /products/:id
app.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// 404 ROUTE
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.log("Error:", err.message);

  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});