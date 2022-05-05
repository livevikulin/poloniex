import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
    return (
        <Navbar className="mb-4" bg="primary" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Link className="nav-link" aria-current="page" to="/">
                        О приложении
                    </Link>
                    <Link className="nav-link" aria-current="page" to="/quotes">
                        Котировки
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;