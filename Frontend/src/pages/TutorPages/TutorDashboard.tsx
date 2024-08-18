import React from 'react';
import { FaHome } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

const TutorDashboard = () => {
    return (
        <>
            <div className='h-screen w-full flex justify-between gap-5 bg-gray-100 font-poppins'>
                <div className='bg-white h-full w-1/6 rounded-md'>
                <h1 className='p-5 text-green-500 font-extrabold text-2xl'>Learn Sphere</h1>
                <p className='pl-5 pt-6 font-medium text-xl'>Overview</p>
                <div className='w-full flex pl-6 pt-4 gap-3 cursor-pointer hover:text-green-500 '>
                <FaHome className='h-8 ' /><p className='pt-1 font-medium  hover:font-bold'>Dashboard</p>
                </div>
                <div className='w-full flex pl-6 pt-4 gap-3 cursor-pointer hover:text-green-500 '>
                <IoPersonSharp  className='h-8'/><p className='pt-1 font-medium hover:font-bold'>Profile</p>
                </div>
                <div className='w-full flex pl-6 pt-4 gap-3 cursor-pointer hover:text-green-500 '>
                <FaHome className='h-8'/><p className='pt-1 font-medium hover:font-bold '>Courses</p>
                </div>
                <div className='w-full flex pl-6 pt-4 gap-3 cursor-pointer hover:text-green-500 hover:font-bold'>
                <FaHome className='h-8'/><p className='pt-1 font-medium hover:font-bold '>Add course</p>
                </div>
                <div className='w-full flex pl-6 pt-4 gap-3 cursor-pointer hover:text-green-500 '>
                <FaHome className='h-8'/><p className='pt-1 font-medium hover:font-bold'>Dashboard</p>
                </div>
                <div className='w-full flex pl-6 pt-4 gap-3 cursor-pointer hover:text-green-500 '>
                <FaHome className='h-8'/><p className='pt-1 font-medium hover:font-bold'>Dashboard</p>
                </div>
                </div>
                <div className='bg-white  h-full w-3/4'>
                <div className='p-10 '>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqsKz0psSEgcot4Ylm4XGx8dZZNpQUnsMAgg&s" 
                    alt="" 
                    className='w-full h-64 rounded-lg object-cover'/>
                </div>
                </div>
                <div className='bg-white  h-full w-1/6 '></div>
            </div>
        </>
    );
}

export default TutorDashboard;
