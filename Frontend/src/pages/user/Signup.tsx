import React  from "react";
import SignupForm from "../../components/user/SignupForm";
import Navbar from '../../components/common/user/Navbar'
import Footer from "../../components/common/user/Footer";

const SignUp : React.FC = () => {
    return (
        <div className='h-screen bg-#dee1ea-900'>
            <Navbar />
           <SignupForm />
           <Footer />
        </div>
    )
}

export default SignUp;