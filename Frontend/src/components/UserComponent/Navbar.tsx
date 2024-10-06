import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import Avatar from "@mui/joy/Avatar";
import userAxiosInstance from "../../config/axiosInstance/userInstance";

const Navbar = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const userId = userInfo?.userId;
  const email = userInfo?.email;

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [profileUrl, setProfileUrl] = useState<string | null>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (email) {
          const { data } = await userAxiosInstance.get(`/getProfile/${email}`);
          if (data) {
            setProfileUrl(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [email]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const LINKS = [
    { text: "Plans", path: "/plans" },
    { text: "Courses", path: "/coursesPage" },
    { text: "Be a Tutor", path: "/tutor" },
    { text: "Orders", path: `/my-orders/${userId}` },
    { text: "Contact", path: "/contact" },
    // { text: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90  shadow-md">
      <div className="flex items-center justify-between p-4  px-14 mx-auto">
        <div
          className="text-2xl font-bold cursor-pointer text-green-500"
          onClick={() => navigate("/")}
        >
          Learn Sphere
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {LINKS.map((link) => (
            <button
              key={link.text}
              onClick={() => handleNavigation(link.path)}
              className="text-white font-sans hover:text-[#7BC74D]"
            >
              {link.text}
            </button>
          ))}

        
          <div className="ml-auto ">
            <Avatar
              size="sm"
              src={profileUrl || ""} 
              onClick={() => navigate("/profile")}
              style={{ cursor: "pointer" }} 
            />
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {LINKS.map((link) => (
              <li key={link.text}>
                <button
                  onClick={() => handleNavigation(link.path)}
                  className="block text-gray-700 hover:text-blue-600"
                >
                  {link.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
