import React from 'react';
import { Navigate } from 'react-router-dom'; 
 
const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
 
    if (!token) {
        return <Navigate to="/login" />;
    }

    if(allowedRole && allowedRole!== role){
        return<Navigate to="/"/>;
    }

    return children;

};
export default ProtectedRoute;
 