import React from 'react';
import Navbar from "../../components/common/UserCommon/Navbar";
import LoginForm from "../../components/UserComponent/LoginForm";
import Footer from '../../components/common/UserCommon/Footer';

const UserLogin: React.FC = () => {

   

  return (
    <>
    <div className="max-h-max bg-[#f5f5f5] text-wh">
   
    <LoginForm />
    <Footer />
    </div>
    </>
  );
};




export default UserLogin
