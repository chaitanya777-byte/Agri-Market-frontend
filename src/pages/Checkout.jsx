import React from 'react';
import { Container, Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const UnauthorizedPage = () => {
    const { isAuthenticated, role } = useAuth();

    return (
        <Container className="text-center mt-5">
            <Jumbotron className="bg-warning p-5 rounded-lg shadow-sm">
                <h1 className="display-4">Access Denied!</h1>
                <p className="lead">You do not have the necessary permissions to view this page.</p>
                <hr className="my-4" />
                <p>
                    {isAuthenticated ? (
                        `You are logged in as a ${role}.`
                    ) : (
                        `It seems you are not logged in.`
                    )}
                </p>
                <p className="lead">
                    {isAuthenticated ? (
                        <>
                            <Link to="/">
                                <Button variant="primary" size="lg">Go to Home</Button>
                            </Link>
                            {role === 'FARMER' && (
                                <Link to="/farmer/dashboard" className="ms-2">
                                    <Button variant="info" size="lg">Go to Farmer Dashboard</Button>
                                </Link>
                            )}
                            {role === 'BUYER' && (
                                <Link to="/buyer/dashboard" className="ms-2">
                                    <Button variant="info" size="lg">Go to Buyer Dashboard</Button>
                                </Link>
                            )}
                        </>
                    ) : (
                        <Link to="/login">
                            <Button variant="primary" size="lg">Go to Login</Button>
                        </Link>
                    )}
                </p>
            </Jumbotron>
        </Container>
    );
};

export default UnauthorizedPage;