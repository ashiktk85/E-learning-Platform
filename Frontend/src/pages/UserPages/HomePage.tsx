import React, { useEffect } from "react";
import Footer from "../../components/common/UserCommon/Footer";
import Navbar from "../../components/UserComponent/Navbar"
import Banner from "../../components/common/UserCommon/HomeBanner";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import bannerVector from '../../assets/userbanner/freepik-export-20240804125951Lu85.jpeg'
import BlockChecker from "../../services/BlockChecker";
import Home2 from "../../components/UserComponent/Home2nd";
import HomeCard from "../../components/UserComponent/Card";
import HeroSection from "../../components/UserComponent/HeroSection";
import CoursesHome from "../../components/UserComponent/CoursesHome";
import About from "../../components/UserComponent/About";
import Mission from "../../components/UserComponent/mission";

const Home: React.FC = () => {

  BlockChecker();
 

  return (
    <main className="overflow-y-hidden  antialiased relative">
     <HeroSection />
     <Navbar />
     <About />
    
    
    <CoursesHome />
    <Footer />
   
    </main>
  );
};

export default Home;
