import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Categories.module.css';
import { Button } from 'react-bootstrap';
import bookContext from '../context/books/bookContext';

import { useNavigate } from 'react-router-dom';

const BookbyCategory = () => {
    const navigate = useNavigate();
    const context = useContext(bookContext);
    const { category } = useParams();

    const [alert, setAlert] = useState("");

    useEffect(() => {
        fetchBooks(category);
        setBooks([]);
    }, [category])

    const { books, setBooks, fetchBooks } = context;

    const handleSaveBook = async (book) => {
        try {
            const atoken = localStorage.getItem("token");

            const response = await fetch('https://librozone-react.onrender.com/book/savebooktoshelf', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": atoken
                },
                body: JSON.stringify({
                    bookid: book._id,
                    bookname: book.bookname,
                    bookauthor: book.bookauthor,
                    bookoverview: book.bookoverview,
                    category: book.category,
                    bookimage: book.bookimage
                })
            })

            if (response.status === 409) {
                // Book is already in the shelf
                setAlert({ type: 'danger', message: 'Book is already saved in your shelf!' });

                setTimeout(() => {
                    setAlert("")
                }, 1000)
            } else if (response.ok) {
                // Book saved successfully
                setAlert({ type: 'success', message: 'Book saved successfully!' });

                setTimeout(() => {
                    setAlert("")
                }, 1000)
            } else {
                throw new Error('Error saving book');
            }

            console.log('Book saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    return (
        <div className='container'>
            {alert && (
                <div className={`alert alert-${alert.type} my-2`} role="alert">
                    {alert.message}
                </div>
            )}
            <h1 className={styles.categorytext}>{category}</h1>
            {books && books.length > 0 ? (
                books.map((book, index) => (
                    <div className="cardcontainer d-flex py-4 my-4" style={{ border: "2px solid white", margin: "auto", alignItems: "center", backgroundColor: "#332D2D", borderRadius: "10px", justifyContent: "space-between" }} key={index}>
                        <div className="d-flex mx-3">
                            <h4 className="px-3" style={{ color: "white" }}>{index + 1}.</h4>
                            <h4 style={{ color: "white" }}>{book.bookname}</h4>
                        </div>
                        <div className="d-flex mx-4">
                            <Button onClick={() => {
                                navigate("/book", { state: { bookname: book.bookname, bookauthor: book.bookauthor, bookoverview: book.bookoverview, bookimage: book.bookimage, } });
                            }} type="button" className={`btn btn-danger btn-lg mx-2 ${styles.blackbackground1} ${styles.white1}`}>
                                Read
                                <img src="/assets/read.png" alt="Logo" width="28" height="28" className="d-inline-block align-text-top ms-2" />
                            </Button>
                            {/* <Button type="button" className="btn btn-primary btn-lg mx-2 black-background2 white2">
                                Rate
                                <img src="/assets/star.png" alt="Logo" width="25" height="25" className="d-inline-block align-text-top ms-2" />
                            </Button> */}
                            <Button onClick={() => handleSaveBook(book)} type="button" className="btn btn-success btn-lg mx-2">
                                Save+
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default BookbyCategory