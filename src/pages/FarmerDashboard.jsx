import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  ListGroup,
  Container,
} from "react-bootstrap";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "FRUIT",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get("/farmer/myProducts");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching farmer products", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/farmer/add", newProduct);
      setNewProduct({ name: "", price: "", quantity: "", category: "FRUIT" });
      fetchMyProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/farmer/update/${editingProduct.id}`, editingProduct);
      setEditingProduct(null);
      fetchMyProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/farmer/delete/${id}`);
        fetchMyProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4">👨‍🌾 Farmer Dashboard</h2>

      {/* Add/Edit Form */}
      <Card className="mb-4 p-3 shadow-sm">
        <Card.Title>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </Card.Title>
        <Form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, name: e.target.value })
                      : setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editingProduct ? editingProduct.price : newProduct.price}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          price: parseFloat(e.target.value),
                        })
                      : setNewProduct({
                          ...newProduct,
                          price: parseFloat(e.target.value),
                        })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={editingProduct ? editingProduct.quantity : newProduct.quantity}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          quantity: parseInt(e.target.value),
                        })
                      : setNewProduct({
                          ...newProduct,
                          quantity: parseInt(e.target.value),
                        })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={
                    editingProduct ? editingProduct.category : newProduct.category
                  }
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                        })
                      : setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option value="FRUIT">FRUIT</option>
                  <option value="VEGETABLE">VEGETABLE</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button type="submit" variant="success" className="me-2">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
            {editingProduct && (
              <Button
                variant="secondary"
                onClick={() => setEditingProduct(null)}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </Form>
      </Card>

      {/* Product List */}
      <h4>📦 My Products</h4>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item
            key={product.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{product.name}</strong> - ₹{product.price} | Qty:{" "}
              {product.quantity} | {product.category}
            </div>
            <div>
              <Button
                variant="info"
                size="sm"
                className="me-2"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default FarmerDashboard;
