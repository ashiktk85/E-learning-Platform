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
import Checkout from '../pages/UserPages/Checkout';
import CoursePlayer from '../pages/UserPages/CoursePlayer';
import MyCourses from '../pages/UserPages/MyCourses';
import Community from '../pages/UserPages/Community';
import TutorsPage from '../pages/UserPages/TutorsPage';
import TutorDetails from '../pages/UserPages/TutorDetails';
import CoursePlayer2 from '../pages/UserPages/CoursePlayer2';
import MyOrders from '../pages/UserPages/MyOrders';
// import OrderHistory from '../pages/UserPages/OrderHistory';

const UserRoutes = () => {
    return (
       <>
        <Routes >
                <Route path = '' element = {<Home />} />
                <Route path= '/otp' element = {<OtpPage /> } />
                <Route path= "/login" element ={<UserLogin />} />
                <Route path= '/profile' element = {<UserProtector><ProfilePage /></UserProtector>} />
                <Route path= '/signup' element = {<SignUp />} />
                <Route path = '/coursesPage' element = {<AllCourses />} />
                <Route path = '/courseDetails/:id' element = {<CourseDetailsPage />} />
                <Route path = '/checkout/:id' element = {<Checkout />} />
                <Route path = '/coursePlayer/:courseId' element = {<UserProtector> <CoursePlayer2 /> </UserProtector>} />
                <Route path = '/mycourses' element = {<UserProtector> <MyCourses /> </UserProtector>} />
                <Route path = '/community' element = {<UserProtector ><Community /></UserProtector>} />
                <Route path = '/tutors' element = {<TutorsPage />} />
                <Route path = '/tutorDetails/:id' element = {<TutorDetails />} />
                <Route path = '/my-orders/:userId' element = {<UserProtector> <MyOrders /></UserProtector>} />
                {/* <Route path = '/orders' element = {<OrderHistory />} /> */}
        </Routes>
       </>
    );
}

export default UserRoutes;
