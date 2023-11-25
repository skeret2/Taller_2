import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ClientDelete from './ClientDelete';
import ClientEdit from './ClientEdit';
import { Button } from 'react-bootstrap';

const Index = () => {
  // Se define el estado de la lista de clientes
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Se obtiene el token almacenado
        const token = localStorage.getItem('token');

        // Configura el encabezado de la solicitud con el token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Realiza la solicitud con el encabezado configurado
        const response = await axios.get('http://127.0.0.1:8000/api/auth/index/', { headers });

        setClients(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      {/* Este es el index que contiene la listas de clientes*/}
      <div className='register-index'>
        <h2>Panel de gestión de usuarios</h2>
      </div>

      {/*boton para crear cliente */}
      <div className='bton-index'>
        <Button variant='success' href='/Register'>Crear cliente</Button>
      </div>

      {/*tabla que contiene la lista de clientes */}
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            {/*cabecera de la tabla */}
            <th>Nombre</th>
            <th>Segundo nombre</th>
            <th>Apellido</th>
            <th>Segundo apellido</th>
            <th>Email</th>
            <th>Identificador</th>
            <th>Puntaje</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {/*cuerpo de la tabla */}
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.first_name}</td>
              <td>{client.second_name}</td>
              <td>{client.first_last_name}</td>
              <td>{client.second_last_name}</td>
              <td>{client.email}</td>
              <td>{client.identificador}</td>
              <td>{client.score}</td>
              <td><ClientEdit clientId={client.id} /></td> {/*boton para editar cliente */}
              <td><ClientDelete clientId={client.id} /></td> {/*boton para eliminar cliente */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Index;
