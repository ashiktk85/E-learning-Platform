import React from 'react';
import AdminAside from '../../components/AdminComponent/AdminAside';
import UserTable from '../../components/AdminComponent/UserTable';
import ReportList from '../../components/AdminComponent/ReportList';

const AdminReportList = () => {
    return (
        <div className="grid grid-cols-12">
        <AdminAside />
        <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
        <div className='flex justify-between'> 
        <h1 className="font-extrabold font-poppins text-2xl justify-start">Report Details</h1>
         
          </div>
         
          <ReportList />
          
        </div>
      </div>
    );
}

export default AdminReportList;
