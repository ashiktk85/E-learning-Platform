import React from 'react';
import Navbar from "../../components/common/user/Navbar"
import Footer from '../../components/common/user/Footer';
import OtpForm from '../../components/user/OtpForm';

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
