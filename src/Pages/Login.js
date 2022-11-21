import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [datos, setDatos] = useState({})

  const navigation = useNavigate()

  const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name]: event.target.value
    })
}

  const handleLogin = () => {
    const goodUser = datos.user === 'adminseven'
    const goodPassword = datos.password === 'mochila04'

    if(goodUser && goodPassword){
      sessionStorage.setItem('token', true)
      navigation('/')
    }
  }

  return (
    <div className='div-login'>
      <h1>SEVEN FERNANDO JOSÉ DEBUCHY</h1>
      <form onSubmit={handleLogin}>
        <label>Usuario</label>
        <input
        type='text'
        name='user'
        onChange={handleInputChange}
        />
        <label>Contraseña</label>
        <input
        type='password'
        name='password'
        onChange={handleInputChange}
        />
        <button
        >ENVIAR</button>
      </form>
    </div>
  )
}

export default Login