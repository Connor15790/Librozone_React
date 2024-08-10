import React from 'react';
import styles from "./Book.module.css";

import { useLocation } from 'react-router-dom';

const Book = () => {
    const location = useLocation();
    const bookname = location.state?.bookname;
    const bookauthor = location.state?.bookauthor;
    const bookoverview = location.state?.bookoverview;
    let bookimage = location.state?.bookimage;

    if (bookimage) {
        bookimage = bookimage.replace('../../client/src', '');
    }

    console.log(bookimage)

    return (
        <div className={styles.container}>
            <h1 className={styles.book_name}>{bookname}</h1>
            <h5 className={styles.author_name}>{bookauthor}</h5>
            <div className={styles.overviewcontainer}>
            <div className={styles.overviewbody}>
                <h3 className={`${styles.overviewtext} my-4`}>Overview</h3>
                <p className={`${styles.overview} px-5 py-4`} style={{border: "2px solid white"}}>{bookoverview}</p>
            </div>
            <div className={`${styles.imgcontainer} my-5`}>
                <img style={{height: "300px", margin: "auto", border: "2px solid white", borderRadius: "20px", marginTop: "34px"}} src={bookimage} className="d-flex" alt="alt1" />
            </div>
        </div>
        </div>
    )
}

export default Book