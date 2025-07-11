import React, { useEffect, useState } from 'react';
import { getAllProducts, buyProducts } from '../api/buyer';
import { Card, Button, Row, Col, Alert, Container, ListGroup } from 'react-bootstrap';

const BuyerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({}); // { productId: quantity }
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts("/products/all");
            setProducts(data);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setMessage('Failed to load products.');
            setMessageType('danger');
        }
    };

    const handleAddToCart = (productId, availableQuantity) => {
        const currentQuantity = cart[productId] || 0;
        if (currentQuantity < availableQuantity) {
            setCart(prevCart => ({
                ...prevCart,
                [productId]: (prevCart[productId] || 0) + 1,
            }));
            setMessage(''); // Clear previous messages
        } else {
            setMessage('Cannot add more than available quantity.');
            setMessageType('danger');
        }
    };

    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => {
            const newQuantity = (prevCart[productId] || 0) - 1;
            if (newQuantity <= 0) {
                const { [productId]: _, ...rest } = prevCart;
                return rest;
            }
            return { ...prevCart, [productId]: newQuantity };
        });
        setMessage(''); // Clear previous messages
    };

    const handleBuy = async () => {
        if (Object.keys(cart).length === 0) {
            setMessage('Your cart is empty!');
            setMessageType('danger');
            return;
        }

        try {
            const bill = await buyProducts(cart);
            setMessage(`Purchase successful! Your total bill is: $${bill.totalBill}`);
            setMessageType('success');
            setCart({}); // Clear cart after purchase
            fetchProducts(); // Refresh product list to reflect new quantities
        } catch (error) {
            console.error('Error buying products:', error);
            setMessage(error.message || 'Purchase failed.');
            setMessageType('danger');
        }
    };

    const getProductInCartQuantity = (productId) => cart[productId] || 0;

    return (
        <Container>
            <h2 className="mb-4">Buyer Dashboard</h2>

            {message && (
                <Alert variant={messageType} dismissible onnClose={() => setMessage('')}>
                    {message}
                </Alert>
            )}

            <h3 className="mb-3">Available Products</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.length === 0 ? (
                    <Col><p>No products available at the moment.</p></Col>
                ) : (
                    products.map((product) => (
                        <Col key={product.id}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Price: ${product.price}<br />
                                        Available: {product.quantity} units<br />
                                        Category: {product.category}
                                    </Card.Text>
                                    <div className="d-flex align-items-center">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleRemoveFromCart(product.id)}
                                            disabled={getProductInCartQuantity(product.id) === 0}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{getProductInCartQuantity(product.id)}</span>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleAddToCart(product.id, product.quantity)}
                                            disabled={getProductInCartQuantity(product.id) >= product.quantity}
                                        >
                                            +
                                        </Button>
                                        <span className="ms-3">In Cart: {cart[product.id] || 0}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            <div className="mt-5 text-center">
                <h3>Your Cart</h3>
                {Object.keys(cart).length === 0 ? (
                    <p>Cart is empty.</p>
                ) : (
                    <>
                        <ListGroup className="mx-auto mb-3" style={{ maxWidth: '500px' }}>
                            {Object.entries(cart).map(([productId, quantity]) => {
                                const product = products.find(p => p.id === parseInt(productId));
                                return product ? (
                                    <ListGroup.Item key={productId} className="d-flex justify-content-between">
                                        <span>{product.name} x {quantity}</span>
                                        <span>${(product.price * quantity).toFixed(2)}</span>
                                    </ListGroup.Item>
                                ) : null;
                            })}
                        </ListGroup>
                        <Button variant="success" onClick={handleBuy}>
                            Buy Now
                        </Button>
                    </>
                )}
            </div>
        </Container>
    );
};

export default BuyerDashboard;