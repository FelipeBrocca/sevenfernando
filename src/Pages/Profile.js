import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';


const Profile = () => {

  const navigation = useNavigate()

  const params = useParams()
  const {updateUser, getEditUser, users, eliminateUser, getUsers} = useUsers();
  const [errorCampos, setErrorCampos] = useState('')
  const [succesInPost, setSuccessInPost] = useState(false)
  const [values, setValues] = useState({
      name:'',
      dni: '',
      pulEntregada: false
    })
    const [entrega, setEntrega] = useState()
    
    
  useEffect(()=> {
      (async () => {
          if(params.id){
              const userEdit = await getEditUser(params.id);
              setValues(userEdit); 
            }
        })();
    }, [params.id])

    useEffect(() => {
        setEntrega(values.pulEntregada)
    }, [params.id])
    

    const handleInputChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async(id, data) => {
        await updateUser(id, data) 
        navigation('/')
    }

    const enviarDatos = async (e, data) => {
        e.preventDefault();
        
        data = values

        
         const duplicateDNI = users.some((user) => user.dni === data?.dni && user._id !== params.id)
         const conflictDni = duplicateDNI 
        
        if(!data || !data.name || !data.dni){
            setErrorCampos('Llenar todos los campos')
            setSuccessInPost(false)
        } 
        else if(conflictDni){
            setErrorCampos('DNI duplicado')
            setSuccessInPost(false)
        } 
        else {
            handleSubmit(params.id, data)
        }
    }
    
    useEffect(() => {
        getUsers()
    }, [enviarDatos])

    const handleEntrega = () => {
        values.pulEntregada = !entrega
        setEntrega(values.pulEntregada)
    }
  
    const handleDelete = async () => {
      await eliminateUser(params.id)
      navigation('/')
    }


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
            <h2>EDITAR</h2>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    autoComplete='off'
                    >
                </input>
            </div>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    name="dni"
                    value={values.dni}
                    onChange={handleInputChange}
                    autoComplete='off'>
                </input>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        {
          values.pulEntregada
          ? <button 
             type='checkbox'
             className='entregada profile'
             name='pulEntregada'
             onClick={handleEntrega}
             >OK</button>
          : <button 
             type='checkbox'
             className='no-entregada profile'
             name='pulEntregada'
             onClick={handleEntrega}
             >X</button>
        }

        <button 
        className='delete-user'
        onClick={handleDelete}
        >ELMINAR REGISTRO</button>
    </>
);
}

export default Profile;