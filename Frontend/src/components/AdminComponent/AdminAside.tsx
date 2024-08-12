import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaTachometerAlt, FaChalkboardTeacher, FaBook, FaWallet, FaFlag } from "react-icons/fa"; // Importing React Icons

const AdminAside = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigation = (item: string, path: string) => {
    setActiveItem(item);
    navigate(path);
  };

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Users", icon: <FaUser />, path: "/admin/users" },
    { name: "Tutors", icon: <FaChalkboardTeacher />, path: "/admin/tutors" },
    { name: "Tutor Applications", icon: <FaChalkboardTeacher />, path: "/admin/tutorapplications" },
    { name: "Course List", icon: <FaBook />, path: "/admin/courses" },
    { name: "Category", icon: <FaBook />, path: "/admin/category" },
    { name: "Wallet", icon: <FaWallet />, path: "/admin/wallet" },
    { name: "Report", icon: <FaFlag />, path: "/admin/reports" },
  ];

  return (
    <div className="grid col-span-3">
      <div className="flex h-screen">
        <aside
          className={`bg-black text-white transition-all duration-300 rounded-md m-2 ${
            isCollapsed ? "w-16" : "w-64"
          } flex flex-col p-4`}
        >
          <nav className="flex flex-col w-full">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleNavigation(item.name, item.path)}
                className={`w-full p-2 mt-4 transition-transform duration-200 flex items-center cursor-pointer rounded-md hover:bg-gray-700 ${
                  activeItem === item.name ? "bg-gray-700" : ""
                }`}
              >
                <div className="text-xl">{item.icon}</div>
                {!isCollapsed && (
                  <span className="ml-4 font-poppins font-semibold">
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </nav>
          <button
            onClick={toggleSidebar}
            className="mt-auto text-2xl transform transition-transform duration-300"
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default AdminAside;
