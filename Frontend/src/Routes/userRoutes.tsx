import React from 'react';
import {Navigate ,Route , Routes ,Router } from 'react-router-dom'
import Home from '../pages/UserPages/HomePage';
import OtpForm from '../components/UserComponent/OtpForm';
import OtpPage from '../pages/UserPages/OtpPage';
import UserLogin from '../pages/UserPages/LoginPage';
import ProfilePage from '../pages/UserPages/ProfilePage';
import SignUp from '../pages/UserPages/SignupPage';
import UserProtector from '../services/UserProtector';
import AllCourses from '../pages/UserPages/AllCourses';
import CourseDetailsPage from '../pages/UserPages/CourseDetailsPage';

const UserRoutes = () => {
    return (
       <>
        <Routes >
                <Route path = '' element = {<Home />} />
                <Route path='/otp' element = {<OtpPage /> } />
                <Route path="/login" element ={<UserLogin />} />
                <Route path= '/profile' element = {<UserProtector><ProfilePage /></UserProtector>} />
                <Route path= '/signup' element = {<SignUp />} />
                <Route path = '/courses' element = {<AllCourses />} />
                <Route path = '/courseDetails/:id' element = {<CourseDetailsPage />} />
        </Routes>
       </>
    );
}

export default UserRoutes;
