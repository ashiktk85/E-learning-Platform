import React from 'react';
import Navbar from "../../components/common/UserCommon/Navbar";
import LoginForm from "../../components/UserComponent/LoginForm";
import Footer from '../../components/common/UserCommon/Footer';

const UserLogin: React.FC = () => {

   

  return (
    <>
    <div className="h-screen bg-#dee1ea-900 text-wh">
   
    <LoginForm />
    <Footer />
    </div>
    </>
  );
};




export default UserLogin
