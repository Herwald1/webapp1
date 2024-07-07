import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import Dashboard from '../../views/DashBoard';

export default function DefaultLayout() {
    const {user, token} = useStateContext();

    if (!token) {
        return (<Navigate to="/login" />);
    }


    return (
       <>
       <Dashboard />

       <Outlet />
       </>
    );

}
