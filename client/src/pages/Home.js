import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import styles from './Home.module.css';
import bookContext from '../context/books/bookContext';
import Footer from '../components/Footer';

const Home = () => {
    const location = useLocation();
    const context = useContext(bookContext);

    useEffect(() => {
        fetchAllPopularBooks();
        setBooks([])
    }, [])

    const { books, setBooks, fetchAllPopularBooks } = context;

    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || '');
    const [username, setUsername] = useState('');
    const [alert, setAlert] = useState("");


    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(''); 
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        return () => {
            setSuccessMessage('');
        };
    }, []);

    useEffect(() => {
        // Get the email from local storage
        const storedName = localStorage.getItem('userName');
        const token = localStorage.getItem('token');
        if (token) {
            setUsername(storedName);
        }
    }, []);

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem('token');
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    const categories = [
        'Horror',
        'Mystery',
        'Thriller',
        'Action',
        'Fantasy',
        'Manga',
        'Mathematics',
        'History',
        'Sci-Fi',
        'Biography',
        'Fiction'
    ];

    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/books/${category}`);
    };

    const handleSaveBook = async (book) => {
        try {
            const atoken = localStorage.getItem("token");

            const response = await fetch('http://localhost:5000/book/savebooktoshelf', {
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
        <>
            <div className='container my-4'>
                {alert && (
                    <div className={`alert alert-${alert.type} my-2`} role="alert">
                        {alert.message}
                    </div>
                )}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <h1 className={styles.welcometext}>Welcome to Librozone - {username}</h1>

                <div className={styles.catcontainer}>
                    {categories.map((category, index) => (
                        <div className="my-2 mx-2" key={index}>
                            <Button className="btn btn-dark btn-lg px-4" onClick={() => handleCategoryClick(category)}>{category}</Button>
                        </div>
                    ))}
                </div>

                <div id="carouselExampleIndicators" className="carousel slide my-4">
                    <p className={styles.specialoffertext}>Popular Right Now</p>
                    <div className="carousel-inner my-1" style={{ backgroundColor: "black", width: "70%", margin: "auto", borderRadius: "20px", border: "2px solid white", textShadow: "2px 2px 5px black" }}>
                        {books.map((book, index) => (<div className={`carousel-item my-3 ${index === 0 ? "active" : ""}`} style={{ width: "100%" }}>
                            <img style={{ height: "300px", margin: "auto" }} src={book.bookimage} className="d-block" alt="alt1" />
                            <div className="d-flex mx-5 pt-3" style={{ justifyContent: "space-between" }}>
                                <Button onClick={() => {
                                    navigate("/book", { state: { bookname: book.bookname, bookauthor: book.bookauthor, bookoverview: book.bookoverview, bookimage: book.bookimage, } });
                                }} className="btn btn-danger btn-lg black-background1 white1">
                                    Read
                                    <img src="./assets/read.png" alt="Logo" width="28" height="28" className="d-inline-block align-text-top ms-2" />
                                </Button>
                                {/* <Button className="btn btn-primary btn-lg black-background2 white2">
                                    Rate
                                    <img src="./assets/star.png" alt="Logo" width="25" height="25" className="d-inline-block align-text-top ms-2" />
                                </Button> */}
                                <Button onClick={() => handleSaveBook(book)} type="button" className="btn btn-success btn-lg mx-2">
                                    Save+
                                </Button>
                            </div>
                        </div>))}
                    </div>

                    <button className="carousel-control-prev" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next mt-5" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Home