import React, { useState } from 'react';
import bookContext from './bookContext';
import axios from 'axios';

const BookState = (props) => {
    const host = "https://librozone-react.onrender.com";

    const booksInitial = []

    const [books, setBooks] = useState(booksInitial);

    const atoken = localStorage.getItem("token");

    const fetchBooks = async (category) => {
        try {
            const response = await axios.get(`${host}/book/getbookbycategory?category=${category}`);
            const books = response.data;

            const booksInSecondDB = await Promise.all(books.map(async (book) => {
                const res = await axios.get(`${host}/book/checkbook/${book._id}`);
                return res.data.exists ? { ...book, isSaved: true } : { ...book, isSaved: false };
            }));

            setBooks(booksInSecondDB);
            // console.log(books)
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchAllBooks = async () => {
        try {
            const response = await axios.get(`${host}/book/getbooks`);
            const books = response.data;

            const booksInSecondDB = await Promise.all(books.map(async (book) => {
                const res = await axios.get(`${host}/book/checkbook/${book._id}`);
                return res.data.exists ? { ...book, isSaved: true } : { ...book, isSaved: false };
            }));

            setBooks(booksInSecondDB);
            // console.log(books)
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchAllBooksPop = async () => {
        try {
            const response = await axios.get(`${host}/book/getbooks`);
            const books = response.data;

            const booksInSecondDB = await Promise.all(books.map(async (book) => {
                const res = await axios.get(`${host}/book/checkbookpop/${book._id}`);
                return res.data.exists ? { ...book, isSaved: true } : { ...book, isSaved: false };
            }));

            setBooks(booksInSecondDB);
            // console.log(books)
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchAllShelfBooks = async () => {
        try {
            // const response = await axios.get(`${host}/book/getshelfbooks`);

            const response = await fetch(`${host}/book/getshelfbooks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": atoken
                }
            })

            const json = await response.json();
            setBooks(json);
            // console.log(books)
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    const fetchAllPopularBooks = async () => {
        try {
            const response = await axios.get(`${host}/book/getpopularbooks`);
            setBooks(response.data);
            // console.log(books)
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    return (
        <bookContext.Provider value={{ books, setBooks, fetchBooks, fetchAllBooks, fetchAllShelfBooks, fetchAllPopularBooks, fetchAllBooksPop }}>
            {props.children}
        </bookContext.Provider>
    )
}

export default BookState