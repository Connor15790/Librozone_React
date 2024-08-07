import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, useNavigate } from 'react-router-dom';

const Navbaar = ({ username, token, handleLogout }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a new page
        navigate('/admin');

        // Show an alert after navigation
        setTimeout(() => {
            window.alert('IMPORTANT!!! This admin panel is only available for the demo. It should not be available to regular users.');
        }, 0);
    };

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
                        <Link to="/about" style={{ textDecoration: 'none' }}><Nav.Link href="#action2">About</Nav.Link></Link>
                        {username && <Link to="/shelf" style={{ textDecoration: 'none' }}><Nav.Link href="#action3">{username}</Nav.Link></Link>}
                        <Nav.Link onClick={handleClick} href="#action4">Admin</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
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