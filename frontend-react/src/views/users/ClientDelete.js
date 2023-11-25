import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const ClientDelete = ({ clientId, onClientDeleted }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        // Mostrar el modal de confirmación
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // Se obtiene el token almacenado
            const token = localStorage.getItem('token');

            // Configura el encabezado de la solicitud con el token
            const headers = {
            Authorization: `Bearer ${token}`,
            };

            // Realizar la solicitud de eliminación a la api
            const response = await axios.delete(`http://127.0.0.1:8000/api/auth/delete/client/${clientId}`,{ headers });
            //actualizar la lista de usuarios después de la eliminación.
            window.location.reload();
            if (onClientDeleted) {
                onClientDeleted(clientId);
            }
        } catch (error) {
        console.error('Error al eliminar usuario:', error.response.data);
        } finally {
        // Cerrar el modal después de la acción (éxito o error)
        setShowModal(false);
        }
    };

    const handleCloseModal = () => {
        // Cerrar el modal sin realizar la eliminación
        setShowModal(false);
    };

    return (
        <div>
        {/*boton para eliminar cliente */}
        <Button variant="danger" onClick={handleDelete}>
            Eliminar
        </Button>

        {/*modal para confirmar la eliminación del cliente */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            {/*titulo del modal */}
            <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            {/*cuerpo del modal */}
            <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            </Modal.Body>
            {/*footer del modal */}
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                No
            </Button>
            <Button variant="primary" onClick={handleConfirmDelete}>
                Sí
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

export default ClientDelete;
