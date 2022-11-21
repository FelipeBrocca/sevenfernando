import {BrowserRouter, Routes, Route } from 'react-router-dom';


import Login from './Pages/Login'
import PrivateRoutes from './Routes/PrivateRoutes'
import List from './Pages/List'
import Add from './Pages/Add'
import Profile from './Pages/Profile';


function App() {
  
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
