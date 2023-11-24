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
        <Button variant="danger" onClick={handleDelete}>
            Eliminar
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            </Modal.Body>
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
