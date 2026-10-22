import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: ""
  });

  const [editId, setEditId] = useState(null);

  // GET - Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products`
      );

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // Fetch products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);
    // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // POST / PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      // UPDATE
      if (editId) {
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          }
        );
      }

      // CREATE
      else {
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Operation failed");
        return;
      }

      if (editId) {
        alert("Product updated successfully");
      } else {
        alert("Product added successfully");
      }

      // Clear form
      setFormData({
        name: "",
        price: "",
        quantity: "",
        category: ""
      });

      setEditId(null);

      // Refresh product list
      fetchProducts();

    } catch (error) {
      console.log("Error:", error);
    }
  };
    // Edit Product
  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category
    });
  };
    // DELETE Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product deleted successfully");

      // Refresh list
      fetchProducts();

    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };
    // Cancel Update
  const handleCancel = () => {
    setEditId(null);
    setFormData({
      name: "",
      price: "",
      quantity: "",
      category: ""
    });
  };
    return (
    <div className="container">
      <h1>Product Management System</h1>

      {/* Product Form */}
      <div className="form-container">
        <h2>
          {editId ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Enter Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Enter Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Product List */}
      <div className="table-container">
        <h2>Product List</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(product)}
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default App;