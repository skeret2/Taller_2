import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../storage/Storage';


import Button from 'react-bootstrap/Button';

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
        }
        } catch (error) {
        console.error('Error al iniciar sesión:', error.response.data);
        }

    };

    return (
        <div className='contenedor-login'>
            <div className='card-login'>
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <label>
                    Usuario:
                    <input type="username" name="username" onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                    Contraseña:
                    <input type="password" name="password" onChange={handleChange} />
                    </label>
                    <br />
                    <Button type="submit">Iniciar Sesión</Button>
                </form>
            </div>
        </div>

        
    );
};

export default Login;

