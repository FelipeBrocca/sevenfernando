import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';


const Add = () => {

    const [datos, setDatos] = useState({})
    const [errorCampos, setErrorCampos] = useState(null)
    const [succesInPost, setSuccessInPost] = useState(false)

    const navigation = useNavigate()

    const {users, createUser, getUsers} = useUsers();
   
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    

    const enviarDatos = async (e, data) => {

        e.preventDefault();

        data = datos
        data.pulEntregada = false
        
        const duplicateDNI = users.some((user) => user.dni === data?.dni)

        if(!data || !data.name || !data.dni){
            setErrorCampos('Llenar todos los campos')
            setSuccessInPost(false)
        }
        else if(duplicateDNI){
            setErrorCampos('DNI duplicado')
            setSuccessInPost(false)
        }
        else{
           await createUser(data)
           navigation('/')
        }
    } 
    useEffect(() => {
        getUsers()
    }, [enviarDatos])

return (
    <>
        {
            errorCampos ? <h2>{errorCampos}</h2> : ''
        }
        {
            succesInPost ? <h3 className='registrado-success'>Registrado</h3> : ''
        }
        <Link to='/'><button> Regresar </button></Link>
        <form className="form" onSubmit={enviarDatos}>
            <h2>AGREGAR</h2>
            <div>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control"
                    onChange={handleInputChange}
                    name="name"
                    autoComplete='off'>
                </input>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="DNI"
                    className="form-control"
                    onChange={handleInputChange}
                    name="dni"
                    autoComplete='off'>
                </input>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    </>
);
}

export default Add;