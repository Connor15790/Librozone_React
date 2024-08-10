import React, { useState } from 'react';
import styles from "./Signup.module.css";
import axios from 'axios';
import { Alert, Form, Button } from 'react-bootstrap';

const AddBooks = () => {
    const [formData, setFormData] = useState({ bookname: "", bookauthor: "", bookoverview: "", category: "", bookimage: "" });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

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
            // const response = await axios.post('https://librozone-react.onrender.com/book/createbook', formData);
            const response = await axios.post('http://localhost:5000/book/createbook', formData);

            setSuccessMessage("Book Added!");

            setTimeout(() => {
                setSuccessMessage(null);
            }, 2000)

            setFormData({
                bookname: '',
                bookauthor: '',
                bookoverview: '',
                category: '',
                bookimage: ''
            });

            console.log(response);
            // Navigate to the home page after successful login
            // navigate('/home', { state: { successMessage: 'Login successful!', username: formData.username } });
        } catch (error) {
            setError('An unexpected error occurred.');
            setTimeout(() => {
                setError(null);
            }, 1000);
        }
    }

    return (
        <div className={styles.container}>
            {error && <Alert variant="danger">{error}</Alert>}
            <h1 className="text-center my-3">Add a Book</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-4 px-5" controlId="formBookname">
                    <p className={styles.headers}>Book Name</p>
                    <Form.Control
                        type="text"
                        placeholder="Enter book name"
                        name="bookname"
                        value={formData.bookname}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="my-4 px-5" controlId="formBookauthor">
                    <p className={styles.headers}>Book Author</p>
                    <Form.Control
                        type="text"
                        placeholder="Enter book author"
                        name="bookauthor"
                        value={formData.bookauthor}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="my-4 px-5" controlId="exampleForm.ControlTextarea1">
                    <p className={styles.headers}>Book Overview</p>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        placeholder="Enter book overview"
                        name="bookoverview"
                        value={formData.bookoverview}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className='my-4 px-5'>
                    <p className={styles.headers}>Category</p>
                    <Form.Select
                        name='category'
                        aria-label="Default select example"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="1">Horror</option>
                        <option value="2">Mystery</option>
                        <option value="3">Thriller</option>
                        <option value="4">Action</option>
                        <option value="5">Fantasy</option>
                        <option value="6">Manga</option>
                        <option value="7">Mathematics</option>
                        <option value="8">History</option>
                        <option value="9">Sci-Fi</option>
                        <option value="10">Biography</option>
                        <option value="11">Fiction</option>
                    </Form.Select>
                </div>

                <Form.Group className="my-4 px-5" controlId="formBookImage">
                    <p className={styles.headers}>Book Image</p>
                    <Form.Control
                        type="text"
                        placeholder="Enter book author"
                        name="bookimage"
                        value={formData.bookimage}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button className='my-3' variant="primary" type="submit">
                    Submit
                </Button>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
            </Form>
        </div>
    )
}

export default AddBooks