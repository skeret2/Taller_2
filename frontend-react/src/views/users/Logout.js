import React from 'react';
import { removeToken } from '../../storage/Storage';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    // Se obtiene la función para navegar entre rutas
    const navigate = useNavigate();
    // Se elimina el token del almacenamiento local
    const handleLogout = () => {
        removeToken();
        navigate('/Login');
        window.location.reload();
    };
    // Se retorna el botón de cerrar sesión
    return (
        <button className='boton-logout' onClick={handleLogout}>Cerrar sesión</button>
    );
};

export default Logout;
