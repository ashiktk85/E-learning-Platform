import React, { useEffect } from "react";
import Footer from "../../components/common/UserCommon/Footer";
import Navbar from "../../components/common/UserCommon/Navbar";
import Banner from "../../components/common/UserCommon/HomeBanner";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import bannerVector from '../../assets/userbanner/freepik-export-20240804125951Lu85.jpeg'
import BlockChecker from "../../services/BlockChecker";
import Home2 from "../../components/UserComponent/Home2nd";
import HomeCard from "../../components/UserComponent/Card";

const Home: React.FC = () => {

  BlockChecker();

  const locatin = useLocation();

  useEffect(() => {
    if (locatin?.state) {
      toast.success(locatin.state.message);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col">
        <div className="px-4 md:px-20 lg:px-36 pt-20 text-center md:text-left flex">
          <div>
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
         
          <div className="h-20 bg-black justify-items-end w-96 ml-96 mb-20 mt-0 ">
              <img className= " rounded-xl" src={bannerVector} alt="" />
          </div>
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
        
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
      <Footer />
    </>
  );
};

export default Home;
