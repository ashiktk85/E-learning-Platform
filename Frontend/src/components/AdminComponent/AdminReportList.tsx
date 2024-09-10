import React from 'react';
import AdminAside from './AdminAside';
import UserTable from './UserTable';
import ReportList from './ReportList';

const AdminReportList = () => {
    return (
        <div className="grid grid-cols-12">
        <AdminAside />
        <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
        <div className='flex justify-between'> 
        <h1 className="font-extrabold font-poppins text-2xl justify-start">Report list</h1>
         
          </div>
         
          <ReportList />
          
        </div>
      </div>
    );
}

export default AdminReportList;
