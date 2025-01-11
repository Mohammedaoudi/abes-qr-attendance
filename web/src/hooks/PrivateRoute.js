import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Get the token and user role from local storage
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    // Determine if the token and user role are valid
    const isAuthenticated = token && userRole;
    const isAdmin = userRole === 'admin';

    // If authenticated and admin, return an outlet that will render child elements
    // If not authenticated or not admin, return element that will navigate to login page
    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
