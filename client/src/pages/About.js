import React from 'react';
import styles from "./About.module.css";

const About = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.abouttext}>About LibroZone</h1>

                <p className={`${styles.aboutbody} my-4`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil quam possimus reprehenderit soluta error pariatur praesentium! Consequatur aliquid cumque earum animi! Deserunt mollitia exercitationem libero autem nesciunt error ab corporis iure earum labore, impedit, asperiores modi id tempore consectetur, alias consequatur? Ducimus ad in necessitatibus, impedit mollitia iste repellendus nobis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate reiciendis reprehenderit veniam eligendi totam dicta assumenda optio ipsum consequuntur expedita nihil quos asperiores veritatis, consectetur quas vero nobis soluta illo commodi. Cumque quibusdam officiis voluptatibus, illo labore hic laudantium delectus doloremque commodi fuga impedit, nemo repudiandae voluptatem, voluptates quo molestias!</p>
            </div>

            <div className="d-flex py-2" style={{ backgroundColor: "black", justifyContent: "center", margin: "auto", position: "fixed", width: "100%", bottom: "0px", zIndex: 1000, backgroundColor: "black" }}>
                <p style={{ color: "white", margin: "auto" }}>Copyright LibroZone Library 2024 | All rights reserved</p>
            </div>
        </>
    )
}

export default About