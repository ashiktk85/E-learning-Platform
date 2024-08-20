import React, { useState } from "react";
import { FaHome, FaBook, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import TutorMainPage from "../../components/TutorComponent/TutorMainPage";
import TutorProfile from "../../components/TutorComponent/TutorProfile";
import CourseCreation1 from "../../components/TutorComponent/CourseCreation1";

const TutorDashboard = () => {
  const [selectedItem, setSelectedItem] = useState(() => {
    return sessionStorage.getItem("selectedItem") || "Dashboard";
  });

  const menuItems = [
    { name: "Dashboard", icon: <FaHome size={24} />, Component: <TutorMainPage /> },
    { name: "Profile", icon: <IoPersonSharp size={24} />, Component: <TutorProfile /> },
    { name: "Courses", icon: <FaBook size={24} />, Component: <div>Courses Content</div> },
    { name: "Add Course", icon: <FaPlusCircle size={24} />, Component: <CourseCreation1 /> },
    { name: "Logout", icon: <FaSignOutAlt size={24} /> },
  ];

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    sessionStorage.setItem("selectedItem", itemName);
  };

  const renderContent = () => {
    const selected = menuItems.find((item) => item.name === selectedItem);
    return selected?.Component || null;
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-100 font-poppins gap-2">
      {/* Sidebar */}
      <div className="bg-white flex-shrink-0 w-1/6 rounded-md shadow-lg flex flex-col">
        <h1 className="p-5 text-green-500 font-extrabold text-2xl">Learn Sphere</h1>
        <p className="pl-5 pt-6 font-medium text-xl">Overview</p>
        <div className="flex-grow">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`w-full flex pl-6 mt-5 gap-3 cursor-pointer hover:text-green-500 ${
                selectedItem === item.name
                  ? "text-green-500 bg-green-100 pt-2 pb-2 rounded-sm font-semibold"
                  : ""
              }`}
              onClick={() => handleItemClick(item.name)}
            >
              <div className="pt-1">{item.icon}</div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-green-300 flex-grow rounded-md shadow-lg p-10 flex flex-col">
        <div className="relative">
          <div className="absolute top-0 left-0 p-10">
            <h1 className="text-4xl text-white font-bold my-4 pl-10">Start your Learning Journey.</h1>
            <p className="text-xl text-white font-normal pl-10">Start for free and start interacting with thousands of courses.</p>
          </div>
          <img
            src="https://images.pexels.com/photos/18069363/pexels-photo-18069363/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-how-ai-could-help-understand-ecosystems-and-identify-species-it-was-created-by-nidia-dias-as-part-of-the-visua.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-full h-40 rounded-lg object-cover"
          />
        </div>
        <h2 className="pb-2 pt-6 font-bold text-xl">{selectedItem}</h2>
        <div className="h-[1px] w-full pl-10 pr-10 bg-gray-500"></div>
        <div className="flex-grow mt-5">{renderContent()}</div>
      </div>

      {/* Right Sidebar */}
      <div className="bg-white flex-shrink-0 w-1/6 rounded-md shadow-lg flex flex-col"></div>
    </div>
  );
};

export default TutorDashboard;
