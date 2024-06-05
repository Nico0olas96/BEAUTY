import React from 'react';
import IndexUsuario from './IndexUsuario';
import Indexprincipal from './Indexprincipal'; // Cambiar 'IndexPrincipal' a 'Indexprincipal'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewCliente from './NewCliente';

import CambioPrecio from './CambioPrecio'


const Rutas = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Indexprincipal />} /> 
          <Route path="/IndexUsuario" element={<IndexUsuario />} />

          <Route path='/NewCliente' element={<NewCliente/>}/>
          <Route path='/CambioPrecio' element={<CambioPrecio/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default Rutas;
