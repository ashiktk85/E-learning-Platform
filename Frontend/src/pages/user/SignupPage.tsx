import React  from "react";
import SignupForm from "../../components/user/SignupForm";
import Navbar from '../../components/common/UserCommon/Navbar'
import Footer from "../../components/common/UserCommon/Footer";
import { Toaster, toast } from 'sonner'

const SignUp : React.FC = () => {
    return (
        <div className='h-screen bg-#dee1ea-900'>
           <Toaster position="top-center" richColors  />
            
          <SignupForm />
           <Footer />
        </div>
    )
}

export default SignUp;