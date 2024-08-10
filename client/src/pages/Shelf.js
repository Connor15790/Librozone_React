import React, { useEffect, useContext } from 'react';
import styles from "./Shelf.module.css";
import { Button } from 'react-bootstrap';
import bookContext from '../context/books/bookContext';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Shelf = () => {
    const navigate = useNavigate();
    const context = useContext(bookContext);

    const { books, setBooks, fetchAllShelfBooks } = context;

    useEffect(() => {
        fetchAllShelfBooks();
        setBooks([]);
    }, [])

    const atoken = localStorage.getItem("token");

    const handleRemove = async (bookId) => {
        try {
            await axios.delete(`http://localhost:5000/book/delete/${bookId}`, {
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

    return (
        <div className={styles.container}>
            <h1 className={styles.shelftext}>My Shelf</h1>
            {books.map((book, index) => (
                // <p>{book.bookname}</p>
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

export default Shelf