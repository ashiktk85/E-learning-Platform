import React  from "react";
import SignupForm from "../../components/UserComponent/SignupForm";
import Navbar from '../../components/common/UserCommon/Navbar'
import Footer from "../../components/common/UserCommon/Footer";
import { Toaster, toast } from 'sonner'

const SignUp : React.FC = () => {
    
    return (
        <div className='h-screen bg-[#f5f5f5]'>
           <Toaster position="top-center" richColors  />
            
          <SignupForm />
          
        </div>
    )
}

export default SignUp;