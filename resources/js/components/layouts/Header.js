import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    Form,
    Button,
    FormControl,
    Container,
} from "react-bootstrap";
const Header = () => {
    return (
        <div className="mb-3">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand >React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav className='mr-2'>
                                <Link to="/about">About</Link>
                            </Nav>
                            <Nav className='mr-2'>
                                <Link to="/">Home</Link>
                            </Nav>
                            <Nav className='mr-2'>
                                <Link to="/ProjectList">Projects</Link>
                            </Nav>
                        </Nav>
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
