import React from 'react';
import AdminAside from './AdminAside';
import Search from '../common/AdminCommon/Search';
import UserTable from './UserTable';
import ApplicationList from './ApplicationList';

const AdminNewTutorApplications = () => {
    return (
        <div className="grid grid-cols-12">
        <AdminAside />
        <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
        <div className='flex justify-between'> 
        <h1 className="font-extrabold font-poppins text-2xl justify-start">New Tutor Applications</h1>
          <Search />
          </div>
         
          <ApplicationList />
          
        </div>
      </div>
    );
}

export default AdminNewTutorApplications;
