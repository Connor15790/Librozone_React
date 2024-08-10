import React, { useState } from 'react';
import styles from "./Signup.module.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errorpass, setErrorpass] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Simple password match validation
        if (formData.password !== formData.confirmPassword) {
            setErrorpass('Passwords do not match!');

            setTimeout(() => {
                setErrorpass(null);
            }, 2000)
            return;
        }

        try {
            const response = await axios.post('https://librozone-react.onrender.com/auth/register', {
                username: formData.username,
                password: formData.password
            });
            setSuccess(response.data.success);

            setTimeout(() => {
                setSuccess(null);
            }, 2000)

            navigate("/", {state: {successMessage: 'User registered successfully!'}});
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);

                setTimeout(() => {
                    setError(null);
                }, 2000)
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <>
            <div className={styles.container}>
                {error ? <Alert variant="danger">
                    {error}
                </Alert> : null}
                {success ? <Alert variant="success">
                    {success}
                </Alert> : null}
                {errorpass ? <Alert variant="danger">
                    {errorpass}
                </Alert> : null}
                <h1 className="text-center my-3">SignUp to LibroZone</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-4 px-5" controlId="formBasicEmail">
                        <p className={styles.headers}>Username</p>
                        <Form.Control
                            type="text"
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

                    <Form.Group className="my-4 px-5" controlId="formBasicPassword">
                        <p className={styles.headers}>Confirm Password</p>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button className='my-3' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Signup