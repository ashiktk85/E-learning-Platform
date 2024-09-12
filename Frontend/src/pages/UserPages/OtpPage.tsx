import React from 'react';
import Navbar from "../../components/common/UserCommon/Navbar"
import Footer from '../../components/common/UserCommon/Footer';
import OtpForm from '../../components/UserComponent/OtpForm';
import BlockChecker from '../../services/BlockChecker';

const OtpPage : React.FC = () => {
  
    return (
        <>
    <div className="h-screen bg-#dee1ea-900 text-wh">
   
    <OtpForm />
    <Footer />
    </div>
    </>
    );
}

export default OtpPage;
