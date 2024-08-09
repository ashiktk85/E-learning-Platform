import React from 'react';
import {Navigate ,Route , Routes ,Router } from 'react-router-dom'
import AdminLogin from '../pages/AdminPages/AdminloginPage';
import AdminDashboard from '../pages/AdminPages/AdminDashboard';
import UserList from '../components/AdminComponent/UserList';

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                    <Route path = '' element = {<AdminLogin />} />
                    <Route path = '/dashboard' Component={AdminDashboard} />
                    <Route path = '/users' Component={UserList} />
            </Routes>
        </div>
    );
}

export default AdminRoutes;
