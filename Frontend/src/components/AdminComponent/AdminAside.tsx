import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAside = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const goToUsers = () => {
    navigate("/admin/users");
  };
  const goToDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="grid col-span-3">
      <div className="flex h-screen">
        <aside
          className={`bg-black text-white transition-all duration-300 rounded-md m-2 ${
            isCollapsed ? "w-16" : "w-64"
          } flex flex-col items-center p-4`}
        >
         <div className="flex flex-wrap justify-center">
  <div className="w-20 sm:w-4/12 px-4">
    <img src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" alt="..." className="shadow rounded-full max-w-full h-auto align-middle border-none" />
  </div>
</div>
          <nav className="flex flex-col w-full">
            <a className="w-full p-2 mt-4 hover:scale-105 transition-transform duration-200 flex items-center hover:bg-admin-secondary rounded-md hover:cursor-pointer "
              onClick={goToDashboard}
            >
              <span className="material-icons font-poppins font-semibold">
                Dashboard
              </span>
            
            </a>
            <a
              className="w-full p-2 mt-4 hover:scale-105 transition-transform duration-200 flex items-center  hover:bg-admin-secondary rounded-md hover:cursor-pointer"
              onClick={goToUsers}
            >
              <span className="material-icons font-poppins font-semibold ">
                Users
              </span>
            </a>
            <a
             
              className="w-full p-2 mt-4 hover:scale-105 transition-transform duration-200 flex items-center  hover:bg-admin-secondary rounded-md hover:cursor-pointer"
            >
              <span className="material-icons font-poppins font-semibold">
                Tutors
              </span>
            </a>
            <a
              
              className="w-full p-2 mt-4 hover:scale-105 transition-transform duration-200 flex items-center  hover:bg-admin-secondary rounded-md hover:cursor-pointer"
            >
              <span className="material-icons font-poppins font-semibold">
                Course List
              </span>
            </a>
            <a
             
              className="w-full p-2 mt-4 hover:scale-105 transition-transform duration-200 flex items-center  hover:bg-admin-secondary rounded-md hover:cursor-pointer"
            >
              <span className="material-icons font-poppins font-semibold">
                Wallet
              </span>
            </a>
            <a
              
              className="w-full p-2 mt-4 hover:scale-105 transition-transform duration-200 flex items-center  hover:bg-admin-secondary rounded-md hover:cursor-pointer"
            >
              <span className="material-icons font-poppins font-semibold">
                Report
              </span>
            </a>
          </nav>
          <button
            onClick={toggleSidebar}
            className="mt-auto text-2xl transform transition-transform duration-300"
          >
            {isCollapsed ? ">=" : "=<"}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default AdminAside;
