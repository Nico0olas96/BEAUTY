import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const URI = 'http://localhost/beauty/backend-php/servicios.php' 
const URI_Modificacion = 'http://localhost/beauty/backend-php/serviciosModificar.php'
const URI_Borrar = 'http://localhost/beauty/backend-php/serviciosBorrar.php'
const URI_NewServicio = 'http://localhost/beauty/backend-php/serviciosNew.php'


const CambioPrecio = () => {

    const [servicios, setServicios] = useState ([])
    const [seccion, setSeccion] = useState ('')
    const [modificacion, setModificacion] = useState ()

    const [nombreS, setNombreS] = useState()
    const [precio, setPrecio] = useState()


    useEffect (() =>{
        getServicios () 
    }, [])


    const getServicios = async() =>{
        try{
            const response = await axios.get(URI)
            setServicios(response.data)
        }catch (error){
            console.error('error al extraer datos', error)
        }
    } 

    const modificaciones = (registros) =>{
        setSeccion('modificacion')
        setModificacion(registros)
    }

    const newServicio = () =>{
        setSeccion('newSeccion')
    }
    const volverSeccion = () =>{
        setSeccion('')
    }

    const Borrar = async (id) =>{ 

            const confirmacion = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Eliminar el registro de forma permanente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
            })
    
            if(confirmacion.isConfirmed){
     
                try {
                await axios.delete(`${URI_Borrar}?id=${id}`)
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'El registro se ha eliminado correctamente.',
                    icon: 'success',
                })
    
                getServicios()
                } catch (error) {
                    console.error('Error al eliminar el registro:', error)
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al intentar eliminar el registro.',
                        icon: 'error',
                    })
                }
            }
    
    }

    const guardarModificacion = async(e) =>{
        e.preventDefault(e)
              
        try {
            console.log(modificacion.id)

            await axios.put(`${URI_Modificacion}?id=${modificacion.id}`, {
                id: modificacion.id,
                servicio: modificacion.servicio,
                precio: modificacion.precio,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            

            getServicios()
            setSeccion('')
            setModificacion(null)
            
            Swal.fire({
                title: '¡Éxito!',
                text: 'Los datos se han modificado correctamente.',
                icon: 'success',
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al intentar modificar los datos.',
                icon: 'error',
            })
        }     
    }

    const guardadoC = async (e) => {
        e.preventDefault()

        try{
            const formData = new FormData()
            formData.append('servicio', nombreS)
            formData.append('precio', precio)

            const response = await axios.post(URI_NewServicio, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })

            setNombreS('')
            setPrecio('')
            setSeccion('')
            getServicios () 

            Swal.fire({
                title: '¡Éxito!',
                text: 'El registro se ha añadido correctamente.',
                icon: 'success',
            })
            
        }catch(error){
            console.error(error)
            
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al intentar Insertar el registro.',
                icon: 'error',
            })
        }


    }





    return (
        <div className="container">
            <div className="header">
                <div className="title">
                    <h2>Beauty Center</h2>
                    <p>Agustina Antonella Gago Lopez</p>
                </div>
                <div classNameName='botonera'>
                    {seccion === '' && (
                        <Link to='/NewCliente' className='new-client-button'> Volver </Link>
                    )}

                    <br/>
                    <br/>
                    {seccion === '' && (
                        <button  className='new-client-button' onClick={newServicio}> New Servicio </button>
                    )}
                </div>
            
            </div>
                <div className="new-client">
                    <h3>Cabios de Precios</h3>
                    {seccion === '' && (
                        <table>
                                        <thead>
                                            <tr>
                                                <th>SERVICIO</th>
                                                <th>PRECIO</th>
                                                <th>MODIFICACION</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                            {servicios.map ((item) => (
                                                <tr key={item.id}>
                                                    <td> {item.servicio} </td>
                                                    <td> ${item.precio} </td>
                                                    <td>
                                                        <button onClick={ () => modificaciones (item)}>Modificar</button>
                                                        <button onClick={ () => Borrar (item.id)}>Borrar</button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                        </table>
                    )}

                    {seccion === 'modificacion' && (
                    <div>
                        <form>
                            <label>Servicio</label>
                            <div className='boxinput'>
                                <input 
                                type='text'
                                className='constrols'
                                value={modificacion.servicio}
                                onChange={(e) => {
                                    setModificacion({...modificacion, servicio:e.target.value})
                                }}
                                />
                            </div>

                            <label>Precio</label>
                            <div className='boxinput'>
                                <input 
                                type='text'
                                className='constrols'
                                value={modificacion.precio}
                                onChange={(e) => {
                                    setModificacion({...modificacion, precio:e.target.value})
                                }}
                                />
                            </div>
                        </form>

                        <div className='boxinput'>
                            <button className='btn' type='submit' onClick={guardarModificacion}>
                                Guardar Modificación
                            </button>
                        </div>

                        <div className='boxinput'>
                            <button className='btn' type='submit' onClick={() => {setSeccion ('')}}>
                                Cancelar
                            </button>
                        </div>

                    </div>)}

                    {seccion === 'newSeccion' && (
                    <div>
                        <form onSubmit={guardadoC}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Servicio</td>
                                        <td>
                                            <input 
                                                type="text"
                                                value={nombreS}
                                                className='inputText'
                                                name='nombre client@'
                                                onChange={(e) => setNombreS(e.target.value)}  />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Precio</td>
                                        <td>
                                            <span>   $   </span> 
                                            <input 
                                                type="number"
                                                value={precio}
                                                className='inputText'
                                                name='nombre client@'
                                                onChange={(e) => setPrecio(e.target.value)}  /> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button type="submit">Agregar Cliente</button>
                                            <button onClick={volverSeccion}>Cancelar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    
                    </div>
                    )}

                </div>
    </div>  
)
}
 
export default CambioPrecio