import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAuthenticator } from "@aws-amplify/ui-react";


function QuiverNav() {

    // console.log('logged', loggedIn);
    const { authStatus, signOut } = useAuthenticator(context => [context.authStatus]);


    if (authStatus == 'authenticated') {
        return (
            <div>
                {/* {CollapsibleExample()} */}
                <Navbar collapseOnSelect fixed="top" expand="sm" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">MyQuiver</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/for-sale">For Sale</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={signOut}>Logout</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }

    else {
        return (
            <div>
                {/* {CollapsibleExample()} */}
                <Navbar collapseOnSelect fixed="top" expand="sm" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">MyQuiver</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/for-sale">For Sale</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>

                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );

    }
} 


export default QuiverNav;