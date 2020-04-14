import React, { useState } from'react';
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios'

const SiteNavbar = () =>{
    const [user, setUser] = useState(
        localStorage.getItem("user") !== "undefined" &&
            localStorage.getItem("user") !== null
            ? JSON.parse(localStorage.getItem("user"))
            : "undefined"
    );

    function logout() {
        console.log(user);
        axios
            .post("/logout", { id: user.id })
            .then(res => {
                localStorage.clear();
                window.location.replace("/");
            })
            .catch(error => {
                console.log(error.response);
            });
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand>Test Authentification</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                {localStorage.getItem("user") === "undefined" ||
                localStorage.getItem("user") === null ? (
                    <Nav>
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Nav.Link>Register</Nav.Link>
                        </LinkContainer>
                    </Nav>
                ) : (
                    <Nav>
                        <LinkContainer to="/dashboard">
                            <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
export default SiteNavbar;