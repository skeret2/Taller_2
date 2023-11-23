import React from 'react';
import { removeToken } from '../../storage/Storage';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/Login');
        window.location.reload();
    };

    return (
        <button className='boton-logout' onClick={handleLogout}>Cerrar sesión</button>
    );
};

export default Logout;
