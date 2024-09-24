import React from 'react';
import {Navigate ,Route , Routes ,Router } from 'react-router-dom'
import UserProtector from '../services/UserProtector';
import TutorHome from '../pages/TutorPages/TutorHome';
import TutorApplicationPage from '../pages/TutorPages/TutorApplicationPage';
import ApplicationFinished from '../pages/TutorPages/ApplicationFinished';
import TutorLogin from '../pages/TutorPages/TutorLogin';
import TutorDashboard from '../pages/TutorPages/TutorDashboard';
import AddSection from '../components/TutorComponent/CourseAddsection';
import CourseEdit from '../pages/TutorPages/CourseEdit';


const TutorRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path = '' element = {<UserProtector> <TutorHome /> </UserProtector>} />
                <Route path = '/application' element = {<UserProtector > <TutorApplicationPage /> </UserProtector>} />
                <Route path = '/applicationcompleted' element = {<UserProtector > <ApplicationFinished /> </UserProtector>} />
                <Route path=  '/login' element = {<UserProtector> <TutorLogin /> </UserProtector>} />
                <Route path='/dashboard' element = {<UserProtector> <TutorDashboard /> </UserProtector>} />
                <Route path = '/course-edit/:id' element = {<UserProtector> <CourseEdit /> </UserProtector>} />

            </Routes>
        </div>
    );
}

export default TutorRoutes;
