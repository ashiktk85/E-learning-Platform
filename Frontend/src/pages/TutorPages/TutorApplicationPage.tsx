import React, { useState } from 'react';
import Footer from '../../components/common/UserCommon/Footer';
import tutorApplicationBanner from '../../assets/userbanner/freepik-export-20240804125951Lu85.jpeg';
import ApplicationParent from '../../components/TutorComponent/ApplicationParent';

const TutorApplicationPage: React.FC = () => {
  

    

    return (
        <>
            <div className="h-auto bg-gray-100 pb-20">
                <div
                    className="h-64 bg-cover bg-center m-8 rounded-lg"
                    style={{ backgroundImage: `url(${tutorApplicationBanner})` }}
                ></div>
               <h1 className='text-center mb-10 text-2xl font-bold font-poppins'>Application Form</h1>
                <ApplicationParent />
            </div>
            <Footer />
        </>
    );
};

export default TutorApplicationPage;
