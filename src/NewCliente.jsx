import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const URI = 'http://localhost/beauty/backend-php/newclientas.php'; 
const URI_servicios = 'http://localhost/beauty/backend-php/servicios.php'; 

const NewCliente = () => {
    const [nombre, setNombre] = useState('');
    const [servicios, setServicios] = useState([]);
    const [servicio, setServicio] = useState('');
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        obtenerServicios();
    }, []);

    const obtenerServicios = async () => {
        try {
            const response = await axios.get(URI_servicios);
            setServicios(response.data);
        } catch (error) {
            console.error('Error al obtener servicios:', error);
        }
    };

    const servicioCambio = (e) => {
        const selectedServiceId = e.target.value;
        const selectedService = servicios.find(item => item.id === selectedServiceId);
        if (selectedService) {
            setServicio(selectedService.servicio);
            setPrecio(selectedService.precio);
        } else {
            setServicio('');
            setPrecio('');
        }
    };

    const resetearCampos = () => {
        setNombre('');
        setServicio('');
        setPrecio('');
    };

    const guardadoC = async (event) => {
        event.preventDefault();
        try {
            await axios.post(URI, {
                nombre,
                servicio,
                precio
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            Swal.fire({
                title: 'Cliente agregado',
                text: 'El cliente se ha agregado exitosamente',
                icon: 'success',
            });

            resetearCampos();

        } catch (error) {
            console.error('Error al agregar cliente:', error);
            Swal.fire("Error", "Hubo un problema al agregar el cliente", "error");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="title">
                    <h2>Beauty Center</h2>
                    <p>Agustina Antonella Gago Lopez</p>
                </div>
                <div className='botonera'>
                    <Link to='/CambioPrecio' className='new-client-button'> Cambiar Precio </Link>
                    <Link to='/IndexUsuario' className='new-client-button'> Volver </Link>
                </div>
            </div>
            <div className="new-client">
                <h3>Nuevo Client@</h3>
                <form onSubmit={guardadoC}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Nombre</td>
                                <td>
                                    <input 
                                        type="text"
                                        value={nombre}
                                        className='inputText'
                                        name='nombre client@'
                                        onChange={(e) => setNombre(e.target.value)}  />
                                </td>
                            </tr>
                            <tr>
                                <td>Servicio</td>
                                <td>
                                    <select value={servicio} onChange={servicioCambio} >
                                        <option value="">Selecciona un servicio</option>
                                        {servicios.map(item => (   
                                            <option key={item.id} value={item.id}  >{item.servicio}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Precio</td>
                                <td>
                                    $<input className='inputpeso' type="text" value={precio} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type="submit">Agregar Cliente</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default NewCliente;
