import React from 'react';
import Footer from '../../components/common/user/Footer';
import Navbar from '../../components/common/user/Navbar';

const ProfilePage: React.FC = () => {


  return (
    <>
    <Navbar />
     <div className="min-h-screen bg-secondary text-white">
      {/* Banner */}
      <div className="relative h-96 bg-primary">
        <img
          src="https://images.pexels.com/photos/277054/pexels-photo-277054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 w-full text-center">
          <h1 className="text-4xl font-bold">Welcome, John Doe!</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="container mx-auto p-4">
        <div className="bg-black p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-primary"
            />
            <div>
              <h2 className="text-3xl font-bold">John Doe</h2>
              <p className="text-gray-400">johndoe@example.com</p>
              <p className="text-gray-400">Joined January 2021</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
       
      </div>
    </div>
    <Footer />
    </>
   
  );
};

export default ProfilePage;
