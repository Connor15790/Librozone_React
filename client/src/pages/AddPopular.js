import React, { useState, useContext, useEffect } from 'react';
import styles from "./Admin.module.css";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import bookContext from '../context/books/bookContext';

const AddPopular = () => {
    const context = useContext(bookContext);

    const { books, setBooks, fetchAllBooksPop } = context;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAllBooksPop();
    }, [])

    const filteredBooks = books.filter(book =>
        book && book.bookname && book.bookname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSaveBook = async (book) => {
        try {
            // Replace with the actual URL of the second database endpoint
            const response = await axios.post('https://librozone-react.onrender.com/book/savebooktopopular', {
                _id: book._id,
                bookname: book.bookname,
                bookauthor: book.bookauthor,
                bookoverview: book.bookoverview,
                category: book.category,
                bookimage: book.bookimage
            });

            setBooks(prevBooks => prevBooks.map(b =>
                b._id === book._id ? { ...b, isSaved: true } : b
            ));

            console.log('Book saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.populartext}>Add to Popular</h1>

            <Form className="d-flex" style={{ width: "40%", height: "40px" }}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form>

            {filteredBooks.map((book, index) => (
                // <p>{book.bookname}</p>
                <div className="cardcontainer d-flex py-4 my-4" style={{ border: "2px solid white", margin: "auto", alignItems: "center", backgroundColor: "#332D2D", borderRadius: "10px", justifyContent: "space-between" }} key={index}>
                    <div className="d-flex mx-3">
                        <h4 className="px-3" style={{ color: "white" }}>{index + 1}.</h4>
                        <h4 style={{ color: "white" }}>{book.bookname}</h4>
                    </div>
                    <div className="d-flex mx-4">
                        <Button onClick={() => handleSaveBook(book)} type="button" className="btn btn-primary btn-lg mx-2" disabled={book.isSaved}>
                            {book.isSaved ? "Saved" : "Save +"}
                        </Button>
                    </div>
                </div>
            ))}
            {/* <button onClick={() => {console.log(bookname)}}></button> */}
        </div>
    )
}

export default AddPopular