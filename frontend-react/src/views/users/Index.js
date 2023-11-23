import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserDelete from './UserDelete';
import UserEdit from './UserEdit';
import Register from '../Register';
import { Button } from 'react-bootstrap';

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Se obtiene el token almacenado
        const token = localStorage.getItem('token');

        // Configura el encabezado de la solicitud con el token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Realiza la solicitud con el encabezado configurado
        const response = await axios.get('http://127.0.0.1:8000/api/auth/index', { headers });

        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <Button variant="primary" href='/Register'>Crear usuario</Button>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Identificador</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.first_last_name}</td>
              <td>{user.email}</td>
              <td>{user.identificador}</td>
              <td><UserEdit userId={user.id} /></td>
              <td><UserDelete userId={user.id} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Index;
