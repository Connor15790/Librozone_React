import React, { useState, useEffect } from 'react';
import styles from "./Signup.module.css";
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ setUsername, setToken }) => {
    const location = useLocation();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || '');

    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('https://librozone-react.onrender.com/auth/login', formData);
            const userName = formData.username;

            // console.log(response.data.user.username);
            localStorage.setItem('token', response.data.token);
            setToken(localStorage.getItem("token"));
            localStorage.setItem('userName', response.data.user.username);
            setUsername(userName);

            // Navigate to the home page after successful login
            navigate('/home', { state: { successMessage: 'Login successful!', username: formData.username } });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
                setTimeout(() => {
                    setError(null);
                }, 1000);
            } else {
                setError('An unexpected error occurred.');
                setTimeout(() => {
                    setError(null);
                }, 1000);
            }
        }
    }

    return (
        <div className={styles.container}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}  
            <h1 className="text-center my-3">Login to LibroZone</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-4 px-5" controlId="formBasicEmail">
                    <p className={styles.headers}>Username</p>
                    <Form.Control
                        type="username"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="my-4 px-5" controlId="formBasicPassword">
                    <p className={styles.headers}>Password</p>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button className='my-3' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login