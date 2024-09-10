import React from "react";
import tutorHomeBanner from "../../assets/userbanner/Web_Photo_Editor.jpg";
import Footer from "../../components/common/UserCommon/Footer";
import TutorNav from "../../components/common/TutorCommon/TutorNav";
import { FaHome } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import HomeAbout from "../../components/TutorComponent/HomeAbout";
import HomeTutorComment from "../../components/TutorComponent/HomeTutorComment";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TutorHome = () => {

  const tutor = useSelector((state : RootState) => state.user)
  console.log(tutor);
  
    
  const navigate = useNavigate();

  const goToApplication = () => {
    navigate('/tutor/application');
  };

  return (
    <>
      <TutorNav />
      <div className="relative">
        <div className="relative h-screen overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={tutorHomeBanner}
            alt="Tutor Home Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>

          
          <div className="absolute top-32 left-5 sm:top-48 sm:left-10 p-4">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              Welcome to your Tutor Page
            </h1>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-5">
              Start your journey today!
            </h2>
          </div>


<Link to = "/tutor/login">
          <button
            className="absolute top-80 left-5 sm:top-96 sm:left-10 h-12 sm:h-16 md:h-20 w-40 sm:w-48 md:w-52 bg-black rounded-lg text-white font-bold text-center flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out"
           
            style={{ cursor: 'pointer' }}
          >
            <span className="mr-2">Go to Dashboard</span>
            <FaHome className="text-xl sm:text-2xl" />
          </button>
          </Link>

        {
          tutor.userInfo?.tutor === false ? 
          <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 md:right-20 lg:right-48 h-40 sm:h-48 md:h-52 w-60 sm:w-64 md:w-72 bg-green-500 rounded-lg p-5">
          <span className="font-bold text-white text-base sm:text-lg md:text-xl">
            Start your Tutor career.<br /> Sign up as a Tutor
          </span>
          <button
            className="w-full h-10 sm:h-12 bg-black rounded-md mt-5 sm:mt-10 text-white text-center flex items-center justify-center font-bold hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
            onClick={goToApplication}
            style={{ cursor: 'pointer' }}
          >
            Check your Eligibility
            <IoIosArrowDroprightCircle className="ml-2 sm:ml-3 text-2xl sm:text-3xl" />
          </button>
        </div> 
        : 

        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 md:right-20 lg:right-48 h-40 sm:h-48 md:h-52 w-60 sm:w-64 md:w-72 bg-green-500 rounded-lg p-5">
        <span className="font-bold text-white text-base sm:text-lg md:text-xl">
          Start building your community<br /> 
        </span>
        <button
          className="w-full h-10 sm:h-12 bg-black rounded-md mt-5 sm:mt-10 text-white text-center flex items-center justify-center font-bold hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
          // onClick={goToApplication}
          style={{ cursor: 'pointer' }}
        >
          Community
          <IoIosArrowDroprightCircle className="ml-2 sm:ml-3 text-2xl sm:text-3xl" />
        </button>
      </div>
        }
         
        </div>

       
        <HomeAbout />
        <HomeTutorComment />
      </div>
      <Footer />
    </>
  );
};

export default TutorHome;
