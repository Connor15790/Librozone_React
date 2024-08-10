import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from "./Admin.module.css";
import axios from 'axios';
import bookContext from '../context/books/bookContext';

import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const context = useContext(bookContext);

    // const [books1, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { books = [], setBooks, fetchAllBooks } = context;

    useEffect(() => {
        fetchAllBooks();
    }, [])

    const filteredBooks = books.filter(book =>
        book && book.bookname && book.bookname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const atoken = localStorage.getItem("token");

    const handleRemove = async (bookId) => {
        try {
            await axios.delete(`https://librozone-react.onrender.com/book/deletebook/${bookId}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': atoken
                }
            });
            setBooks(books.filter(book => book._id !== bookId)); 
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // const handleSaveBook = async (book) => {
    //     try {
    //         // Replace with the actual URL of the second database endpoint
    //         const response = await axios.post('https://librozone-react.onrender.com/book/savebooktoshelf', {
    //             _id: book._id,
    //             bookname: book.bookname,
    //             bookauthor: book.bookauthor,
    //             bookoverview: book.bookoverview,
    //             category: book.category,
    //             bookimage: book.bookimage
    //         });

    //         setBooks(prevBooks => prevBooks.map(b =>
    //             b._id === book._id ? { ...b, isSaved: true } : b
    //         ));

    //         console.log('Book saved successfully:', response.data);
    //     } catch (error) {
    //         console.error('Error saving book:', error);
    //     }
    // };

    return (
        <div className={styles.container}>
            <Form className="d-flex" style={{ width: "40%", height: "40px" }}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={() => { navigate("/addbooks") }} variant="success mx-2" style={{ width: "34%" }}>Add Book +</Button>
            </Form>

            <div className={styles.otherbtncontainer}>
                <Button
                    onClick={() => {
                        navigate("/addpopular")
                    }}
                    variant="primary mt-4 me-3">
                    Add Popular Books +
                </Button>
            </div>

            <h2 className={styles.booktext}>All Books</h2>

            {filteredBooks.map((book, index) => (
                <div className="cardcontainer d-flex py-4 my-4" style={{ border: "2px solid white", margin: "auto", alignItems: "center", backgroundColor: "#332D2D", borderRadius: "10px", justifyContent: "space-between" }} key={index}>
                    <div className="d-flex mx-3">
                        <h4 className="px-3" style={{ color: "white" }}>{index + 1}.</h4>
                        <h4 style={{ color: "white" }}>{book.bookname}</h4>
                    </div>
                    <div className="d-flex mx-4">
                        <Button onClick={() => {
                            navigate("/book", { state: { bookname: book.bookname, bookauthor: book.bookauthor, bookoverview: book.bookoverview, bookimage: book.bookimage } })
                        }} type="button" className={`btn btn-danger btn-lg mx-2 ${styles.blackbackground1} ${styles.white1}`}>
                            Read
                            <img src="/assets/read.png" alt="Logo" width="28" height="28" className="d-inline-block align-text-top ms-2" />
                        </Button>
                        {/* <Button type="button" className="btn btn-primary btn-lg mx-2 black-background2 white2">
                            Rate
                            <img src="/assets/star.png" alt="Logo" width="25" height="25" className="d-inline-block align-text-top ms-2" />
                        </Button> */}
                        <Button type="button" className="btn btn-dark btn-lg mx-2" onClick={() => handleRemove(book._id)}>
                            Remove
                            <img src="/assets/delete.png" alt="Logo" width="25" height="25" className="d-inline-block align-text-top ms-2" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Admin