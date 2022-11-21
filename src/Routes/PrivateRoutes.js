import {Outlet, Navigate} from 'react-router-dom';

const PrivateRoutes = () => {
    const auth = sessionStorage.getItem('token')
    return(
        auth ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes