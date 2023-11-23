import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap';

const UserEdit = ({userId, onUserEdited}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        second_name: '',
        first_last_name: '',
        second_last_name: '',
        email: '',
        password: '',
        rol: 'usuario',
    });

    const [showModal, setShowModal] = useState(false);

    const handleModal = async () => {
        // Mostrar el modal de edicion
        setShowModal(true);
    };

    const handleCloseModal = () => {
        // Cerrar el modal sin realizar la edicion
        setShowModal(false);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/auth/update/users/${userId}`, formData);
            //actualizar la lista de usuarios después de la edicion.
            window.location.reload();
            if (onUserEdited) {
                onUserEdited(userId);
            }
        }
        catch (error) {
            console.error('Error al editar usuario:', error.response.data);
        }
        finally {
            // Cerrar el modal después de la acción (éxito o error)
            setShowModal(false);
        }
    }

    return (

        <div className='body-edit'>
            <Button variant="success" onClick={handleModal}>Editar</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Editar usuario</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='contenedor-edit'>
                        <Form onSubmit={handleSubmit}>
                            <div className=''>
                                <label>
                                    Primer nombre:
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                                </label>

                                <label>
                                    Segundo nombre:
                                    <input type="text" name="second_name" value={formData.second_name} onChange={handleChange} />
                                </label>
                            </div>
                            
                            <div className=''>
                                <label>
                                    Primer apellido:
                                    <input type="text" name="first_last_name" value={formData.first_last_name} onChange={handleChange} />
                                </label>

                                <label>
                                    Segundo apellido:
                                    <input type="text" name="second_last_name" value={formData.second_last_name} onChange={handleChange} />
                                </label>
                            </div>

                            <div className=''>
                                <label>
                                    Correo electrónico:
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                </label>

                                <label>
                                    Contraseña:
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                                </label>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    No
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guadar cambios
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
}

export default UserEdit;
