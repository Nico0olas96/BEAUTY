import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const URI = 'http://localhost/beauty/backend-php/clientas.php' 

const IndexUsuario = () => { 

    const [mesSeleccionado, setMesSeleccionado] = useState('')

    const [datos, setDatos] = useState([])

    const getDatos =  async () =>{
        try {
            const response = await axios.get(URI)
            setDatos(response.data.slice())

        }catch(error){
            console.error('no se pudieron extraer datos', error)
        }
    }


    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    const filtrarPorMes = () => {
        if (mesSeleccionado === '') {
            return datos;
        } else if (Array.isArray(datos) && datos.length > 0) {
            const mesSeleccionadoNumerico = meses.findIndex(mes => mes === mesSeleccionado) + 1; // Obtener el número de mes
            return datos.filter(item => {
                const fecha = new Date(item.fecha);
                return fecha.getMonth() + 1 === mesSeleccionadoNumerico;
            });
        } else {
            return []; // Retorna un array vacío si no hay datos disponibles
        }
    };
    


    const sumaIngresos = () =>{
        const clientesMes = filtrarPorMes()
        let total = 0

        clientesMes.forEach(item => {
            total += parseFloat(item.precio)
        })
        return total
    }
    
    
    const seleccionarMes = (event) => {
        getDatos()
        setMesSeleccionado(event.target.value)
    }

    return (
    <div className="container">
        <div className="header">

            <div className="select-month">
                <label htmlFor="month">Seleccionar MES:</label>
                <select id="month" value={mesSeleccionado} onChange={seleccionarMes}>
                    <option>-- Seleccion MES --</option>

                    {meses.map ((mes, index) => (
                        <option key={index} value={mes}> {mes} </option>
                    ))}
                </select>

            </div>

            <div className="title">
                <h2>Beauty Center</h2>
                <p>Agustina Antonella Gago Lopez</p>
                <Link to='/NewCliente' className='new-client-button'> NEW CLIENT </Link>
            </div>
        </div>
        <div className="stats">
            <p>TOTAL CLIENT@S: {filtrarPorMes().length} </p>
            <p>TOTAL INGRESOS: $ {sumaIngresos()} </p>
        </div>
        <div className="client-list">
            <label htmlFor="client-month">LISTA CLIENT@S MES:</label>

            <table>
                <thead>
                    <tr>
                        <th>FECHA</th>
                        <th>NOMBRE</th>
                        <th>SERVICIO</th>
                        <th>PRECIO</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarPorMes().map((item) =>(
                            <tr key={item.id}>
                                <td> {item.fecha} </td>
                                <td> {item.nombre} </td>
                                <td> {item.servicio} </td>
                                <td> $ {item.precio} </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    </div>
    )
}


export default IndexUsuario