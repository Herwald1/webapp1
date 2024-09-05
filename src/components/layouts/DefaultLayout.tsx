import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import Dashboard from '../../views/DashBoard';

interface User {
    name: string;
}

export default function DefaultLayout() {
    const { user, token, setToken } = useStateContext();

    if (!token) {
        return (<Navigate to="/login" />);
    }

    const logout = () => {
        console.log('logout');
        setToken(null);

    }

    return (
        <>
            <Dashboard
                name={(user as User).name}
                logout={logout}
            />
        </>
    );

}
