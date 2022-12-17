import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { UsersProvider, useUsers } from './context/UsersContext';


import Login from './Pages/Login'
import PrivateRoutes from './Routes/PrivateRoutes'
import List from './Pages/List'
import Add from './Pages/Add'
import Profile from './Pages/Profile';
import { useEffect } from 'react';


function App() {

  const {getUsers} = useUsers()

  useEffect(() => {
     getUsers()
  }, [])
  
  return (
    <div className="App">
    <UsersProvider>
      <BrowserRouter >
        <Routes>
          <Route element={<PrivateRoutes />}>
                <Route element={<List />} path="/" exact />
                <Route element={<Profile />} path='/user/:id' />
                <Route element={<Add />} path="/registrar" exact />
          </Route>
                <Route element={<Login/>} path="/login" /> 
        </Routes>
      </BrowserRouter>
    </UsersProvider>
    </div>
  );
}

export default App;
