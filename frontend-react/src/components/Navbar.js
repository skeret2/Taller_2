import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import CerrarSesion from '../views/users/Logout';
import { isAuthenticated } from '../storage/Storage';


const Navegacion = () => {
    const authUser = isAuthenticated('authUser');

    return (
        <Navbar expand="lg" className="navbar">
        <Container>
            {/*contiene el logo del navar*/}
            <Navbar.Brand>
                <img className='logo' src='/imagenes/logoDumbo.png' width='50' height='50' />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {/* componente de navegacion de bootstrap  se tienen las rutas protegidas*/}
                {/* se muestra el navbar dependiendo si el usuario esta autenticado o no */}
                {/* authUser ? null: -> para lo que no estan autentificados */}
                {/* authUser ? -> para lo que estan autentificados */}
                <Link className='nav-link' to='/' >Home</Link>
                {authUser ? null : <Link className='nav-link' to='/Login'>Login</Link>}
                {authUser ? <Link className='nav-link' to='/users/Index'>Gestión de usuarios</Link> : null}

                <NavDropdown title="Más opciones" id="basic-nav-dropdown">
                
                {/* componente desplegable del navbar */}
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
