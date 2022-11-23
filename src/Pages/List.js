import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UsersProvider, useUsers } from '../context/UsersContext';


const List = () => {
  
  const {users, setUsers} = useUsers()
  const [busqueda, setBusqueda] = useState('')



  const handleBusqueda = (e) => {
    setBusqueda(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (terBusqueda) => {
    let resultadoBusqueda = users.filter((user) => {
      if(user.dni.includes(terBusqueda)){
        return user
      }
    })
    setUsers(resultadoBusqueda)
  }

  const handleCloseSession = () => {
    sessionStorage.removeItem('token')
  }

  
  return (
    <div className='listado'>
      <Link to='/login' className='close-session' onClick={handleCloseSession}>Cerrar sesión</Link>

      <h1>SEVEN FERNANDO JOSÉ DEBUCHY</h1>

      <Link className='boton-agregar' to='/registrar'><button>
        AGREGAR USUARIO
      </button></Link>
      <h3>Total de registros: {users.length}</h3>

      <form className='searchbar'>
         <label htmlFor='searchbar'>Buscar por DNI</label>
         <input 
         type='search' 
         name='searchbar' 
         placeholder='Ingresar DNI'
         onChange={handleBusqueda}
         />
         <button>Buscar</button>
      </form>
      <h2>NO ENTREGADAS</h2>
      <table>
        <thead>
           <tr>
             <th>Nombre</th>
             <th>DNI</th>
             <th>Entregado</th>
           </tr>
        </thead>
        <tbody >
  {
    users?.map((user) => { 
      return (
        user.pulEntregada ? null :
        <tr key={user.dni +  user.name + user._id}>
          <td>{user.name}</td>
          <td>{user.dni}</td>
          <td className='td-button'>       
           <button 
           className={user.pulEntregada ? 'entregada' : 'no-entregada'}
           >{
           user.pulEntregada  ? 'OK' : 'X'
           }</button>
           <Link
           to={{pathname:`/user/${user._id}`, data: user}}
           className='button-edit'
           >EDIT</Link>
          </td>
        </tr>
      )
    })
  }
  </tbody>
</table>
<h2>ENTREGADAS</h2>
<table>
        <thead>
           <tr>
             <th>Nombre</th>
             <th>DNI</th>
             <th>Entregado</th>
           </tr>
        </thead>
        <tbody >
  {
    users?.map((user) => { 
      return (
        !user.pulEntregada ? null :
        <tr key={user.dni +  user.name + user._id}>
          <td>{user.name}</td>
          <td>{user.dni}</td>
          <td className='td-button'>       
           <button 
           className={user.pulEntregada ? 'entregada' : 'no-entregada'}
           >{
           user.pulEntregada  ? 'OK' : 'X'
           }</button>
           <Link
           to={{pathname:`/user/${user._id}`, data: user}}
           className='button-edit'
           >EDIT</Link>
          </td>
        </tr>
      )
    })
  }
  </tbody>
</table>
    </div>
  )
}

export default List