import React, { useState } from 'react';
import Footer from '../../components/common/UserCommon/Footer';
import tutorApplicationBanner from '../../assets/userbanner/freepik-export-20240804125951Lu85.jpeg';
import ApplicationParent from '../../components/TutorComponent/ApplicationParent';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";

const TutorApplicationPage: React.FC = () => {
  

    

    return (
        <>
            <div className="h-auto bg-gray-100 pb-20">
            <div className="m-8">
           
            

           
            <div
                className="h-64 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${tutorApplicationBanner})` }}
            >
               
                <nav className="text-white text-sm mb-4 pt-5 pl-10 font-bold">
                <ul className="flex">
                <FaHome className='w-10 h-4 hover:bg-green-600'/>
                    <li>
                        <Link to="/tutor" className="hover:text-green-600">Home</Link>
                    </li>
                    <li className="mx-2">/</li>
                    <MdAccountBox />
                    <li>
                        <Link to="/tutor/application" className="hover:text-green-600">Application</Link>
                    </li>
                   
                    
                </ul>
            </nav>
            </div>
        </div>
               <h1 className='text-center mb-10 text-2xl font-bold font-poppins'>Application Form</h1>
                <ApplicationParent />
            </div>
            <Footer />
        </>
    );
};

export default TutorApplicationPage;
