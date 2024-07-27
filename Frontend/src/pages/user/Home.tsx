import React from "react";
import Footer from "../../components/common/user/Footer";
import Navbar from "../../components/common/user/Navbar";
import Banner from "../../components/common/user/HomeBanner";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col">
        <div className="px-4 md:px-20 lg:px-36 pt-20 text-center md:text-left">
          <h1 className="text-white font-poppins font-bold text-3xl md:text-5xl mb-2">
            LEARN FROM THE
          </h1>
          <h1 className="text-white font-poppins font-bold text-3xl md:text-5xl mb-4">
            BEST
          </h1>
          <h2 className="text-white font-poppins font-bold text-2xl md:text-3xl mb-6">
            BE YOUR BEST.
          </h2>
          <h4 className="text-white text-sm md:text-base">
            Get unlimited access to thousands of courses.
          </h4>
          
        </div>

        <div className="flex justify-center md:justify-start md:ml-36 mt-6">
          <button
            type="submit"
            className="w-36 md:w-44 bg-spotify-green font-poppins text-white py-2 rounded font-bold text-start pl-5 text-sm md:text-base"
          >
            JOIN THE COMMUNITY
          </button>
          
        </div>
       
        <Banner />
      </div>
      <div className="bg-spotify-white min-h-screen">
        <div className="flex justify-center md:justify-start md:ml-36 mt-6">
          <button
            type="submit"
            className="w-36 md:w-44 bg-spotify-green font-poppins text-white py-2 rounded font-bold text-start pl-5 text-sm md:text-base"
          >
            JOIN THE COMMUNITY
          </button>
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
};

export default Home;
