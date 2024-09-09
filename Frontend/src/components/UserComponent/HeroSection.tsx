import React from 'react';
import blog from '../../assets/userbanner/blog-3_1296x.webp';
import overlayImage1 from '../../assets/userbanner/Web_Photo_Editor.jpg';
import overlayImage2 from '../../assets/userbanner/Web_Photo_Editor.jpg'; 
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

  const navigate = useNavigate()

  const goToCommunity = () => {
    navigate('/community')
  }
  return (
    <section className="relative flex h-screen items-center justify-center bg-[#f5f5f7] px-4">
      <div className="grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        
        <div className="flex flex-col justify-center text-center md:text-left gap-8">
          <h1 className="text-5xl font-extrabold text-[#7BC74D] md:text-6xl">
            Empower Your Learning Journey
          </h1>
          <p className=" text-lg text-[#393E46] md:text-xl">
            Access hundreds of courses and learn at your own pace. Start your journey with us today!
          </p>
          <div className=" flex justify-center gap-4 md:justify-start">
            <button className="rounded-full h-11 bg-[#17171a] px-6 py-2 text-white shadow-lg   focus:outline-none focus:ring-4 focus:ring-blue-300">
              Get Started
            </button>
            <button className="rounded-full border h-11 bg-[#EEEEEE] border-black px-6 py-2 text-gray-800   focus:outline-none focus:ring-4 focus:ring-gray-200 cursor-pointer
            text-center
            "
            onClick={goToCommunity}>
              Community
            </button>
          </div>
        </div>

        
        <div className="relative flex items-center justify-center ">
          
          <div className="relative w-[500px] h-[300px] transition-transform duration-500 transform hover:scale-110 hover:translate-y-[-10px] z-10">
            <img
              src={blog}
              alt="E-Learning Illustration"
              className="w-full h-full object-cover rounded-xl shadow-lg" 
            />
            <div className="absolute bottom-4 left-4 bg-white/75 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
              <p className="text-sm font-semibold text-[#17171a]">Explore Our Courses</p>
            </div>
          </div>

          
          <div className="relative w-[500px] h-[300px] ml-[-50px] transition-transform duration-500 transform hover:scale-110 hover:translate-y-[-20px] z-20">
            <img
              src={overlayImage1}
              alt="Overlay Image 1"
              className="w-full h-full object-cover rounded-xl shadow-xl" 
            />
            <div className="absolute bottom-4 left-4 bg-white/75 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
              <p className="text-sm font-semibold text-[#17171a]">Meet Our Tutors</p>
            </div>
          </div>

          
          <div className="relative w-[500px] h-[300px] ml-[-50px] transition-transform duration-500 transform hover:scale-110 hover:translate-y-[-30px] z-30">
            <img
              src={overlayImage2}
              alt="Overlay Image 2"
              className="w-full h-full object-cover rounded-xl shadow-xl" 
            />
            <div className="absolute bottom-4 left-4 bg-white/75 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
              <p className="text-sm font-semibold text-[#17171a]"
              onClick={goToCommunity}
              >Join Our Community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
