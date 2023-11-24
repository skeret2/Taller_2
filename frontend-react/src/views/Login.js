import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../storage/Storage';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginSuccess = (token) => {
        // Guardar el token en el localStorage
        setToken(token);
        // Redirigir o realizar cualquier otra acción después del inicio de sesión exitoso
        window.location = '/users/Index';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', formData);
            console.log(response.data)
            
        // Verificar si la respuesta contiene un token
        if (response.data.data.token) {
            handleLoginSuccess(response.data.data.token);
        } else {
            console.error('Token no encontrado en la respuesta del servidor');
            <Alert variant='danger' >HOLA MUNDO</Alert>
        }
        } catch (error) {
        console.error('Error al iniciar sesión:', error.response.data);
        }

    };

    return (
        <div className='body-login'>
            <div className='contenedor-login'>
                <h2>Iniciar Sesión</h2>
                <Form onSubmit={handleSubmit}>
                    <div className='datos-login'>
                        <Form.Group>
                            <Form.Label>Usuario:</Form.Label>
                            <Form.Control 
                            required
                            type="username" name="username" onChange={handleChange} />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control 
                            required
                            type="password" name="password" onChange={handleChange} />
                        </Form.Group>
                    </div>
                    
                    <div className='btn-login'>
                        <Button type="submit">Iniciar Sesión</Button>
                    </div>
                </Form>
            </div>
        </div>

        
    );
};

export default Login;

