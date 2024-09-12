import React from 'react';
import AdminAside from '../../components/AdminComponent/AdminAside';
import Search from '../../components/common/AdminCommon/Search';
import UserTable from '../../components/AdminComponent/UserTable';
import ApplicationList from '../../components/AdminComponent/ApplicationList';

const AdminNewTutorApplications = () => {
    return (
        <div className="grid grid-cols-12">
        <AdminAside />
        <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
        <div className='flex justify-between'> 
        <h1 className="font-extrabold font-poppins text-2xl justify-start">New Tutor Applications</h1>
         
          </div>
         
          <ApplicationList setApplicationCount={function (count: number): void {
            throw new Error('Function not implemented.');
          } } />
          
        </div>
      </div>
    );
}

export default AdminNewTutorApplications;
