import React from 'react';
import {Navigate ,Route , Routes ,Router } from 'react-router-dom'
import AdminLogin from '../pages/AdminPages/AdminloginPage';
import AdminDashboard from '../pages/AdminPages/AdminDashboard';
import UserList from '../pages/AdminPages/UserListPage';
import AdminNewTutorApplications from '../pages/AdminPages/ApplicationListPage';
import ApplicantDetails from '../pages/AdminPages/ApplicantDetailsPage';
import AdminProtector from '../services/AdminProtector';
import TutorList from '../pages/AdminPages/TutorListPage';
import CategoryList from '../components/AdminComponent/CategoryList';
import AdminReportList from '../components/AdminComponent/AdminReportList';
import ReportDetailComponent from '../components/AdminComponent/ReportDetailComponent';
import AdminCoursesPage from '../pages/AdminPages/AdminCoursesPage';

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
                    <Route path = '/reports' element = {<AdminProtector> <AdminReportList /> </AdminProtector>} />
                    <Route path = '/reportDetail/:id' element = {<AdminProtector><ReportDetailComponent /></AdminProtector>} /> 
                    <Route path = '/courses' element = {<AdminProtector> <AdminCoursesPage /></AdminProtector>} />
            </Routes>
        </div>
    );
}

export default AdminRoutes;
