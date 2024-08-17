import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaBook,
  FaWallet,
  FaFlag,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/adminActions";
import { AppDispatch } from "../../redux/store";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from '../common/AdminCommon/Badge'

const ConfirmationModal = ({ isOpen, onClose, onConfirm }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h3 className="text-lg mb-4 font-bold text-center">Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminAside = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [notifications, setNotifications] = useState({
    users: 5, // Example value
    tutors: 2, // Example value
    applications: 8, // Example value
    courses: 0, // Example value
    wallet: 1, // Example value
    reports: 3, // Example value
  });

  // Retrieve sidebar state from localStorage
  useEffect(() => {
    const storedCollapsedState = localStorage.getItem("isCollapsed");
    if (storedCollapsedState) {
      setIsCollapsed(JSON.parse(storedCollapsedState));
    }
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem("isCollapsed", JSON.stringify(newCollapsedState));
  };

  const handleNavigation = (path: string) => {
    setActiveItem(path); // Set the active item
    localStorage.setItem("activeItem", path); // Save the active item in localStorage
    if (path === "/admin/logout") {
      setIsModalOpen(true);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        localStorage.removeItem("activeItem");
        navigate("/admin");
      })
      .catch((error: any) => {
        console.error("Logout failed:", error);
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <div className="grid col-span-3 h-full">
      <div className="flex h-screen">
        <aside
          className={`bg-black text-white transition-all duration-300 rounded-md h-full ${
            isCollapsed ? "w-16" : "w-64"
          } flex flex-col p-4`}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "black", color: "white" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ bgcolor: "black", color: "white", fontSize: 20, marginBottom: 2, marginTop: 2 }}
              >
                Admin Dashboard
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => handleNavigation("/admin/dashboard")}
              sx={{
                paddingLeft: 1,
                backgroundColor: activeItem === "/admin/dashboard" ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FaTachometerAlt className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleNavigation("/admin/users")}
              sx={{
                paddingLeft: 1,
                position: "relative",
                backgroundColor: activeItem === "/admin/users" ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FaUser className="text-white" />
                <Badge count={notifications.users} />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleNavigation("/admin/tutors")}
              sx={{
                paddingLeft: 1,
                position: "relative",
                backgroundColor: activeItem === "/admin/tutors" ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FaChalkboardTeacher className="text-white" />
                <Badge count={notifications.tutors} />
              </ListItemIcon>
              <ListItemText primary="Tutors" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleNavigation("/admin/tutorapplications")}
              sx={{
                paddingLeft: 1,
                position: "relative",
                backgroundColor: activeItem === "/admin/tutorapplications" ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FaChalkboardTeacher className="text-white" />
                <Badge count={notifications.applications} />
              </ListItemIcon>
              <ListItemText primary="Tutor Applications" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleNavigation("/admin/courses")}
              sx={{
                paddingLeft: 1,
                position: "relative",
                backgroundColor: activeItem === "/admin/courses" ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FaBook className="text-white" />
                <Badge count={notifications.courses} />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleNavigation("/admin/wallet")}
              sx={{
                paddingLeft: 1,
                position: "relative",
                backgroundColor: activeItem === "/admin/wallet" ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FaWallet className="text-white" />
                <Badge count={notifications.wallet} />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleNavigation("/admin/reports")}
              sx={{
                paddingLeft: 1,
                position: "relative",
                backgroundColor: activeItem === "/admin/reports" ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FaFlag className="text-white" />
                <Badge count={notifications.reports} />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleNavigation("/admin/logout")}
              sx={{
                paddingLeft: 1,
                backgroundColor: "#374151",
                "&:hover": {
                  backgroundColor: "#4B5563",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <IoMdLogOut className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </aside>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
};

export default AdminAside;
