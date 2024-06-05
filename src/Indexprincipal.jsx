import React from 'react';
import { Link } from 'react-router-dom';

const IndexPrincipal = () => {
  return ( 
    <div>
      <div className="container">
        <div className="content">
            <div className='image'>
              {/* imagen con css */}
            </div>
          <h2>Beauty Center</h2>
          <p>Agustina Antonella Gago Lopez</p>
          
          {/* Ajusta 'classname' a 'className' */}
          
          <Link to='/IndexUsuario' className='btn'> ACCESS </Link>
          
        </div>
      </div>

    </div>
  );
};

export default IndexPrincipal;
