import React from 'react'
import { isAuthenticated } from '../storage/Storage';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    // constante para verificar se o usuário está autenticado
    const authUser = isAuthenticated('authUser');
    if(!authUser){
        return <Navigate to='/Login' />
    }
    return <Outlet/>
}

export default ProtectedRoute