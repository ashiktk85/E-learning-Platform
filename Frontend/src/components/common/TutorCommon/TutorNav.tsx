import React from 'react';

const TutorNav = () => {
    return (
        <div className='fixed top-0 left-0 right-0 z-50 h-16 bg-gray-100 w-full flex items-center justify-around shadow-md'>
            <ul className='flex space-x-4 list-none font-poppins font-semibold'>
                <li><a href="#" className='text-black'>Home</a></li>
                <li><a href="#" className='text-black'>Courses</a></li>
                <li><a href="#" className='text-black'>Profile</a></li>
                <li><a href="#" className='text-black'>Settings</a></li>
                <li><a href="#" className='text-black'>Logout</a></li>
            </ul>
        </div>
    );
}

export default TutorNav;