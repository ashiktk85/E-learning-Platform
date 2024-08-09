import React from 'react';
import AdminCard from '../../components/AdminComponent/AdminCard';
import AdminAside from '../../components/AdminComponent/AdminAside';
import Search from '../../components/common/AdminCommon/Search';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <AdminAside />
      
      <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
        <div className='flex justify-between'> 
        <h1 className="font-extrabold font-poppins text-2xl justify-start">Welcome to Dashboard</h1>
        <Search />
        </div>
        
        <p className="text-spotify-black font-poppins font-medium mt-2">
          Here you can manage and view key metrics and data including total revenue, total users, tutors, graphs, statistics, top courses, and top tutors. Use the cards below to get quick insights into the performance and usage of the platform.
        </p>
        <div className="grid grid-cols-4 gap-4 h-auto mt-8 p-4">
          <AdminCard name={"Users"} data={212}/>
          <AdminCard name={"Tutors"} data={56}/>
          <AdminCard name={"Courses"} data={112}/>
          <AdminCard name={"Revenue"} data={56667}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
