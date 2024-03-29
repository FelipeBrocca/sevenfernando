import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUsers } from '../context/UsersContext';


const List = () => {
  
  const {users} = useUsers()
  const [usersSearch, setUsersSearch] = useState(users)
  const [busqueda, setBusqueda] = useState('')



  const handleBusqueda = (e) => {
    setBusqueda(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (terBusqueda) => {
    let resultadoBusqueda = users.filter((user) => {
      if(user.name.toString().toLowerCase().includes(terBusqueda.toLowerCase())){
        return user
      } else return ''
    })
    setUsersSearch(resultadoBusqueda)
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

      <div className='searchbar'>
         <label htmlFor='searchbar'>Buscar por Nombre</label>
         <input 
         type='search' 
         name='searchbar' 
         placeholder='Ingresar Nombre'
         autoComplete='off'
         value={busqueda}
         onChange={handleBusqueda}
         />
         <div className={busqueda ? 'search-container active' : 'search-container none'}>
          <ul>
         {
          busqueda ?
          usersSearch.slice(0, 4).map((user) => {
            return(
              <Link 
              key={user.id + user.name}
              onClick={() => setBusqueda('')}
              to={{pathname:`/user/${user._id}`, data: user}}
              >
              <li>{user.name}</li>
              </Link>
            )
          })
          : ''
         }
         </ul>
          </div>
      </div>
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