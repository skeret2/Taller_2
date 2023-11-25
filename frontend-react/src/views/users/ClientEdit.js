import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap';

const ClientEdit = ({clientId, onUserEdited}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        second_name: '',
        first_last_name: '',
        second_last_name: '',
        email: '',
        score: 0,
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
            // Se obtiene el token almacenado
            const token = localStorage.getItem('token');

            // Configura el encabezado de la solicitud con el token
            const headers = {
            Authorization: `Bearer ${token}`,
            };

            // Realizar la solicitud de edicion a la api
            const response = await axios.put(`http://127.0.0.1:8000/api/auth/update/client/${clientId}`, formData,{ headers });
            //actualizar la lista de usuarios después de la edicion.
            window.location.reload();
            if (onUserEdited) {
                onUserEdited(clientId);
            }
        }
        //capturar el error en caso de que no se pueda editar el usuario
        catch (error) {
            console.error('Error al editar usuario:', error.response.data);
        }
        //cerrar el modal despues de la accion (exito o error)
        finally {
            // Cerrar el modal después de la acción (éxito o error)
            setShowModal(false);
        }
    }

    return (

        <div className='body-edit'>
            {/*boton para editar el usuario */}
            <Button variant="success" onClick={handleModal}>Editar</Button>

            {/*modal para editar el usuario */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <div className='model-header'>
                        <Modal.Title>Editar usuario</Modal.Title>
                    </div>

                </Modal.Header>

                {/*cuerpo del modal */}
                <Modal.Body>
                    <div className='contenedor-edit'>
                        {/*formulario para editar el usuario */}
                        <Form onSubmit={handleSubmit}>
                            <div className=''>

                                {/*campos del formulario */}
                                <Form.Group>
                                    <Form.Label>Primer nombre:</Form.Label>
                                    {/*validaciones  */}
                                    <Form.Control
                                        required
                                        type="text" name="first_name" value={formData.first_name} onChange={handleChange}>
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Segundo nombre:</Form.Label>
                                    {/*validaciones  */}
                                    <Form.Control
                                        required
                                        type="text" name="second_name" value={formData.second_name} onChange={handleChange}>
                                    </Form.Control>
                                </Form.Group>

                            </div>
                            
                            <div className=''>

                                <Form.Group>
                                    <Form.Label>Primer apellido:</Form.Label>
                                    {/*validaciones  */}
                                    <Form.Control
                                        required
                                        type="text" name="first_last_name" value={formData.first_last_name} onChange={handleChange}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Segundo apellido:</Form.Label>
                                    {/*validaciones  */}
                                    <Form.Control
                                        required
                                        type="text" name="second_last_name" value={formData.second_last_name} onChange={handleChange}>
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            <div className=''>

                                <Form.Group>
                                    <Form.Label>Correo electrónico:</Form.Label>
                                    {/*validaciones  */}
                                    <Form.Control
                                        required
                                        type="email" name="email" placeholder='example@gmail.com' value={formData.email} onChange={handleChange}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Puntaje:</Form.Label>
                                    {/*validaciones  */}
                                    <Form.Control
                                        required
                                        type="number" name="score" value={formData.password} onChange={handleChange}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    {/*footer del modal */}
                    <Button variant="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <div className='btn-edit'>
                        <Button variant="primary" onClick={handleSubmit}>
                            Guadar cambios
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
}

export default ClientEdit;
