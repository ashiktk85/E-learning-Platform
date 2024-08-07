import React from 'react';
import {Navigate ,Route , Routes ,Router } from 'react-router-dom'
import Home from '../pages/user/HomePage';
import OtpForm from '../components/user/OtpForm';
import OtpPage from '../pages/user/OtpPage';
import UserLogin from '../pages/user/LoginPage';
import ProfilePage from '../pages/user/ProfilePage';
import SignUp from '../pages/user/SignupPage';
import UserProtector from '../services/UserProtector';

const UserRoutes = () => {
    return (
       <>
        <Routes >
                <Route path = '' element = {<Home />} />
                <Route path='/otp' element = {<UserProtector><OtpPage /></UserProtector> } />
                <Route path="/login" element ={<UserLogin />} />
                <Route path= '/profile' element = {<UserProtector><ProfilePage /></UserProtector>} />
                <Route path= '/signup' element = {<SignUp />} />
        </Routes>
       </>
    );
}

export default UserRoutes;
