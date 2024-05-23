import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

const PrivateOutlet = () => {
    const {user} = useAuth();
    const location = useLocation();

    return user.email?<Outlet/>: <Navigate to="/login" state={{from:location}} replace/>;
}
export default PrivateOutlet;