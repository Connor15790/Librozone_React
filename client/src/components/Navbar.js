import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../context/users/userContext';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbaar = ({ username, token, handleLogout }) => {
    // const { username } = useContext(UserContext);
    // const [username, setUsername] = useState('');

    // useEffect(() => {
    //     // Get the email from local storage
    //     const storedName = localStorage.getItem('userName');
    //     if (storedName) {
    //         setUsername(storedName);
    //     }
    // }, []);

    return (
        <Navbar expand="lg" className="" style={{ backgroundColor: "#e3f2fd" }}>
            <Container fluid>
                <Navbar.Brand href="#">
                    <img src='/assets/book.png' alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
                    Librozone
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/home" style={{ textDecoration: 'none' }}><Nav.Link href="#action1">Home</Nav.Link></Link>
                        <Nav.Link href="#action2">About</Nav.Link>
                        {username && <Link to="/shelf" style={{ textDecoration: 'none' }}><Nav.Link href="#action3">{username}</Nav.Link></Link>}
                        <Link to="/admin" style={{ textDecoration: 'none' }}><Nav.Link href="#action4">Admin</Nav.Link></Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary">Search</Button>
                        {!token ? (
                            <>
                                <Link to="/"><Button className='mx-2' variant="outline-primary">Login</Button></Link>
                                <Link to="/signup"><Button variant="outline-primary">Signup</Button></Link>
                            </>
                        ) : (
                            <Button className='ms-2' variant="outline-danger" onClick={handleLogout} >Logout</Button>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbaar