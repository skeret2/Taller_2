import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import CerrarSesion from '../views/users/Logout';

import { isAuthenticated } from '../storage/Storage';
import { Button } from 'bootstrap';
import Logout from '../views/users/Logout';

const Navegacion = () => {
    const authUser = isAuthenticated('authUser');

    return (
        <Navbar expand="lg" className="navbar">
        <Container>
            <Navbar.Brand to='/Home' >Dumbo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link className='nav-link' to='/Home' >Home</Link>
                {authUser ? null : <Link className='nav-link' to='/Login'>Login</Link>}
                {authUser ? null : <Link className='nav-link' to='/Register'>Register</Link>}
                {authUser ? <Link className='nav-link' to='/users/Index'>Gestión de usuarios</Link> : null}

                <NavDropdown title="Más opciones" id="basic-nav-dropdown">
                
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item>
                    {authUser ? <CerrarSesion/> : null}
                </NavDropdown.Item>

                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Navegacion
