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
        password: '',
        rol: 'usuario',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Realizar la solicitud POST al backend de Laravel
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData);
            console.log('Respuesta del servidor:', response.data);
            alert('Usuario registrado exitosamente');
            window.location.href = '/users/Index';

        } catch (error) {
            console.error('Error al registrar usuario:', error.response.data);
        }
    };

    return (
        <div className='body-register'>
            <div className='contenedor-register'>
                <h2>Registrar usuario</h2>
                <Form onSubmit={handleSubmit}>
                    <div className='nombres'>

                        <label>
                            Primer nombre:
                            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                        </label>

                        <label>
                            Segundo nombre:
                            <input type="text" name="second_name" value={formData.second_name} onChange={handleChange} />
                        </label>

                    </div>
                    
                    <div className='apellidos'>

                        <label>
                            Primer apellido:
                            <input type="text" name="first_last_name" value={formData.first_last_name} onChange={handleChange} />
                        </label>

                        <label>
                            Segundo apellido:
                            <input type="text" name="second_last_name" value={formData.second_last_name} onChange={handleChange} />
                        </label>

                    </div>

                    <div className='datos'>

                        <label>
                            Identificador:
                            <input type="text" name="identificador" value={formData.identificador} onChange={handleChange} />
                        </label>

                        <label>
                            Correo electrónico:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </label>

                    </div>
                    
                    <div className='contraseña'>
                        <label>
                            Contraseña:
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </label>
                    </div>

                    <div className='btn-register'>
                        <button type="submit">Registrar Usuario</button>
                    </div>
                    
                </Form>
            </div>
        </div>
        
    );
}

export default Register;
