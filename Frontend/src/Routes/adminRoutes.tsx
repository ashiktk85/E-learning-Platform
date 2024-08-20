import React from 'react';
import {Navigate ,Route , Routes ,Router } from 'react-router-dom'
import AdminLogin from '../pages/AdminPages/AdminloginPage';
import AdminDashboard from '../pages/AdminPages/AdminDashboard';
import UserList from '../components/AdminComponent/UserList';
import AdminNewTutorApplications from '../components/AdminComponent/AdminNewTutorApplications';
import ApplicantDetails from '../components/AdminComponent/ApplicantDetails';
import AdminProtector from '../services/AdminProtector';
import TutorList from '../components/AdminComponent/TutorList';
import CategoryList from '../components/AdminComponent/CategoryList';

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                    <Route path = '' element = {<AdminLogin />} />
                    <Route path = '/dashboard' element ={ <AdminProtector> <AdminDashboard /> </AdminProtector>} />
                    <Route path = '/users' element={ <AdminProtector><UserList /></AdminProtector>} />
                    <Route path = '/tutorapplications' element={<AdminProtector><AdminNewTutorApplications /></AdminProtector>} />
                    <Route path=  '/applicationdetails' element={<AdminProtector><ApplicantDetails /></AdminProtector>} />
                    <Route path = '/tutors' element = {<AdminProtector> <TutorList /> </AdminProtector>} />
                    <Route path = '/category' element = {<AdminProtector> <CategoryList /></AdminProtector>} />
            </Routes>
        </div>
    );
}

export default AdminRoutes;
