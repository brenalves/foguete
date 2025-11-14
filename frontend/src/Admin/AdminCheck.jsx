import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../userContext';
import { Outlet } from 'react-router-dom';

export default function AdminCheck() {
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        console.log('AdminCheck - User data:', user);
        if (!user || !user.admin) {
            navigate('/');
        }
    }, [user, navigate]);

    return <Outlet />;
}