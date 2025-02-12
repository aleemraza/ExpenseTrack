import React,{useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
const ProtectedRoute = ({children,allowedRoles}) => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isAuthenticated !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated]);
    useEffect(() => {
        if (role !== undefined) {
            setLoading(false);
        }
    }, [role]);
    if (loading) {
        return null;
    }
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    if (allowedRoles && role !== null && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
};
export default ProtectedRoute


