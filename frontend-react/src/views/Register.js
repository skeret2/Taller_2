import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        second_name: '',
        first_last_name: '',
        second_last_name: '',
        identificador: '',
        email: '',
        score: 0,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {

            // Se obtiene el token almacenado
            const token = localStorage.getItem('token');

            // Configura el encabezado de la solicitud con el token
            const headers = {
            Authorization: `Bearer ${token}`,
            };

            // Realizar la solicitud POST al backend de Laravel
            const response = await axios.post('http://127.0.0.1:8000/api/auth/registerclient', formData, { headers });
            console.log('Respuesta del servidor:', response.data);
            window.location.href = '/users/Index';

        } catch (error) {
            console.error('Error al registrar al cliente:', error.response.data);
        }
    };

    return (
        <div className='body-register'>
            <div className='contenedor-register'>
                {/* formulario de registro */}
                <h2>Registrar cliente</h2>
                <Form onSubmit={handleSubmit}>
                    <div className='nombres'>
                        <Form.Group>
                            <Form.Label>Primer nombre:</Form.Label>
                            {}
                            <Form.Control
                            required
                            type="text" name="first_name" value={formData.first_name} onChange={handleChange} >
                            </Form.Control>

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Segundo nombre:</Form.Label>
                            {/*Vvalidaciones*/}
                            <Form.Control
                            required
                            type="text" name="second_name" value={formData.second_name} onChange={handleChange} >
                            </Form.Control>
                        </Form.Group>

                    </div>
                    
                    <div className='apellidos'>

                        <Form.Group>
                            <Form.Label>Primer apellido:</Form.Label>
                            {/*validaciones*/}
                            <Form.Control
                            required
                            type="stext" name="first_last_name" value={formData.first_last_name} onChange={handleChange} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Segundo apellido:</Form.Label>
                            {/*validaciones*/}
                            <Form.Control
                            required
                            type="text" name="second_last_name" value={formData.second_last_name} onChange={handleChange} >
                            </Form.Control>
                        </Form.Group>

                    </div>

                    <div className='datos'>

                        <Form.Group>
                            <Form.Label>Identificador (Rut o DNI):</Form.Label>
                            {/*validaciones*/}
                            <Form.Control
                            required
                            type="text" name="identificador" placeholder='example:11222333k' value={formData.identificador} onChange={handleChange} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Correo electrónico:</Form.Label>
                            {/*validaciones*/}
                            <Form.Control
                            required
                            type="email" name="email" placeholder='example@gmail.com' value={formData.email} onChange={handleChange} >
                            </Form.Control>
                        </Form.Group>

                    </div>
                    
                    <div className='contraseña'>
                        <label>
                            Puntaje:
                            <input type="number" name="score" value={formData.score} onChange={handleChange} />
                        </label>
                    </div>

                    <div className='btn-register'>
                        <button type="submit">Registrar cliente</button>
                    </div>
                    
                </Form>
            </div>
        </div>
        
    );
}

export default Register;
