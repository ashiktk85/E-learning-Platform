import React from "react";
import Footer from "../../components/common/user/Footer";
import Navbar from "../../components/common/user/Navbar";
import Banner from "../../components/common/user/HomeBanner";

const Home : React.FC =  () => {
  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col">
        <div className="ml-36 pt-20">
          <h1 className="text-white font-poppins font-bold text-5xl mb-2">
            LEARN FROM THE
          </h1>
          <h1 className="text-white font-poppins font-bold text-5xl mb-4">
            BEST
          </h1>
          <h2 className="text-white font-poppins font-bold text-3xl mb-6">
            BE YOUR BEST.
          </h2>
          <h4 className="text-white">
            Get unlimited access to thousands of courses.{" "}
          </h4>
        </div>

        <button
          type="submit"
          className="w-44 bg-spotify-green font-poppins text-white pt-2 pb-2 mt-6 rounded font-bold text-start pl-5 ml-36 text-400"
        >
          JOIN THE COMMUNITY
        </button>
        <Banner />
      </div>
      <div className="bg-spotify-white min-h-screen">
        <button
          type="submit"
          className="w-44 bg-spotify-green font-poppins text-white pt-2 pb-2 mt-6 rounded font-bold text-start pl-5 ml-36 text-400"
        >
          JOIN THE COMMUNITY
        </button>
      </div>
      <Banner />
      <Footer />
    </>
  );
};

export default Home;
