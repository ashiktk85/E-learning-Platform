import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [loggedIn , setIsLoggedIn] = useState<boolean>(false)
  const navigate = useNavigate()

    useEffect(() => {
      const authStatus = localStorage.getItem('userInfo') === null
      if (authStatus) {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)      
      }
    })

    const login = () => {
      navigate('/login')
    }

    const goToProfile = () => {
      navigate('/profile')
    }

    const goToHome = () => {
      navigate('/')
    }

  return (
    <>
      <header className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50 ">
        <div className="text-spotify-green text-lg font-bold hover: cursor-pointer" onClick={goToHome}>Learn Sphere</div>
        <div className="space-x-4 mr-10">
          {loggedIn ? (
            <>
             <a href="" className="hover:underline font-poppins font-medium text-sm">Plans</a>
             <a href="" className="hover:underline font-poppins font-medium text-sm">Courses</a>
             <a href="" className="hover:underline font-poppins font-medium text-sm">Be a Tutor</a>
             <a href="" className="hover:underline font-poppins font-medium text-sm" onClick={goToProfile}>Profile</a>
            </> 
            
          ) : 
          (
            <>
            <a href="" className="hover:underline font-poppins font-medium text-sm">Plans</a>
             <a href="" className="hover:underline font-poppins font-medium text-sm">Courses</a>
             <a href="" className="hover:underline font-poppins font-medium text-sm">Be a Tutor</a>
             <a href="" className="hover:underline font-poppins font-bold text-sm text-spotify-green " onClick={login}>Log In</a>
            </>
          )
          }
         
        </div>
      </header>
    </>
  );
};

export default Navbar;
