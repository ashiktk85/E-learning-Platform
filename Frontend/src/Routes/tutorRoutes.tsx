import React from 'react';
import {Navigate ,Route , Routes ,Router } from 'react-router-dom'
import UserProtector from '../services/UserProtector';
import TutorHome from '../pages/TutorPages/TutorHome';
import TutorApplicationPage from '../pages/TutorPages/TutorApplicationPage';
import ApplicationFinished from '../pages/TutorPages/ApplicationFinished';


const TutorRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path = '' element = {<UserProtector> <TutorHome /> </UserProtector>} />
                <Route path = '/application' element = {<UserProtector > <TutorApplicationPage /> </UserProtector>} />
                <Route path = '/applicationcompleted' element = {<UserProtector > <ApplicationFinished /> </UserProtector>} />
            </Routes>
        </div>
    );
}

export default TutorRoutes;
