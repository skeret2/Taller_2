import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navegacion from '../src/components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './views/users/Index';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Logout from './views/users/Logout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Navegacion />

        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />

          <Route element={<ProtectedRoute/>} >
            <Route path='/users/Index' element={<Index />} />
            <Route path='/users/Logout' element={<Logout/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
