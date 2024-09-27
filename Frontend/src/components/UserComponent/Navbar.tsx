import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const LINKS = [
    { text: "Plans", path: "/plans" },
    { text: "Courses", path: "/coursesPage" },
    { text: "Be a Tutor", path: "/tutor" },
    { text: "Orders", path: "/orders" },
    { text: "Contact", path: "/contact" },
    { text: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white  shadow-md">
      <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <div
          className="text-2xl font-bold cursor-pointer text-[#7BC74D]"
          onClick={() => navigate("/")}
        >
          E-Learn
        </div>
        <div className="hidden md:flex space-x-6">
          {LINKS.map((link) => (
            <button
              key={link.text}
              onClick={() => handleNavigation(link.path)}
              className="text-black font-sans hover:text-[#7BC74D]  "
            >
              {link.text}
            </button>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
