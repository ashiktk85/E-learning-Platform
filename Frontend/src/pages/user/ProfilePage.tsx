import React, { useState } from "react";
import Footer from "../../components/common/UserCommon/Footer";
import axios from "axios";
import proBanner from "../../assets/userbanner/windows-11-bloom-collection-green-background-green-abstract-3840x2160-8989.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, Toaster } from "sonner";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import UserDetails from "../../components/user/UserDetails";
import ProfileCourses from "../../components/user/ProfileCourses";
import ProfileTutors from "../../components/user/ProfileTutors";

const ProfilePage = () => {
  const data: any = useSelector((state: RootState) => state.user);

  const menuItems = [
    { name: 'Personal Info', Component: <UserDetails /> },
    { name: 'Courses', Component: <ProfileCourses /> },
    { name: 'Tutors', Component: <ProfileTutors /> },
    { name: 'Wallet' },
    { name: 'Logout' }
  ];

  const [activeItem, setActiveItem] = useState(menuItems[0].name);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem('accessToken');

    window.location.href = '/login';
  };

  return (
    <>
      <Toaster position="bottom-center" richColors />
      <div className="min-h-screen overflow-hidden bg-backgorund">
        <div className="relative">
          <div
            className="h-64 bg-cover bg-center m-8 rounded-lg"
            style={{ backgroundImage: `url(${proBanner})` }}
          ></div>
          <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center">
            <div className="relative bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-4xl overflow-hidden opacity-95">
              <div className="absolute inset-0 bg-white backdrop-blur-md"></div>
              <div className="relative flex items-center">
                <img
                  className="rounded-full w-20 h-20 border-2 border-white shadow-md"
                  src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                  alt="Profile"
                />
                <span className="material-symbols-outlined mt-12 mr-5">
                  edit
                </span>
                <div className="ml-4">
                  <h1 className="text-xl font-bold">
                    {data.userInfo.firstName + " " + data.userInfo.lastName}
                  </h1>
                  <p className="text-gray-500">Student</p>
                </div>
                <div className="ml-auto flex space-x-4">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">
                    App
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 h-96 bg-background mt-20 mb-32 ml-8 mr-8">
          <div className="h-96 col-span-3 bg-spotify-white m-3 rounded-2xl p-4">
            {menuItems.map((item, index) => (
              <h2
                key={index}
                className={`p-4 rounded-md cursor-pointer transition-colors font-medium ${
                  activeItem === item.name ? 'bg-green-500 text-white' : 'hover:bg-gray-100 hover:text-black'
                }`}
                onClick={() => {
                  if (item.name === 'Logout') {
                    setIsLogoutModalVisible(true);
                  } else {
                    setActiveItem(item.name);
                  }
                }}
              >
                {item.name}
              </h2>
            ))}
          </div>

          {menuItems.find(item => item.name === activeItem)?.Component}

          <div className="h-96 bg-spotify-white col-span-2 m-3 rounded-2xl"></div>
        </div>
      </div>

      <Footer />

      {isLogoutModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                onClick={() => setIsLogoutModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg align-middle"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
