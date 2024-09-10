import React from 'react';
import AdminAside from '../../components/AdminComponent/AdminAside';
import UserTable from '../../components/AdminComponent/UserTable';
import Search from '../../components/common/AdminCommon/Search';

const UserList = () => {
    return (
        <div className="grid grid-cols-12">
      <AdminAside />
      <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
      <div className='flex justify-between'> 
        <h1 className="font-extrabold font-poppins text-2xl justify-start">User list</h1>
         
          </div>
       
        <UserTable />
        
      </div>
    </div>
    );
}

export default UserList;
