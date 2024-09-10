import React from 'react';
import AdminAside from '../../components/AdminComponent/AdminAside';
import AdminCourseList from '../../components/AdminComponent/AdminCourseList';


const AdminCoursesPage = () => {
    return (
        <div className="grid grid-cols-12">
        <AdminAside />
        <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
        <div className='flex justify-between'> 
        <h1 className="font-extrabold font-poppins text-2xl justify-start">Course List</h1>
         
          </div>
         
         <AdminCourseList />
          
        </div>
      </div>
    );
}

export default AdminCoursesPage;
