import React from 'react';
import UserButton from '../common/user/UserButton';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../common/user/googleButton';


const SignupForm : React.FC = () => {
    const navigate = useNavigate()
    const goToSignUp  = () => {
        navigate('/login')
    }
    
    return (
        <>
        <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-full max-w-4xl mx-auto mt-20 mb-64">
        <div className="w-full md:w-1/2 p-4 mt-5 mb-0">
          <h2 className="text-white text-2xl mb-3 font-semibold font-poppins">Register</h2>
          <p className="text-spotify-lightgrey text-xs mb-4">
            Already have an Account?{' '}
            <a className="text-spotify-green font-medium hover:underline cursor-pointer" onClick={goToSignUp}>
              login
            </a>
          </p>
          <form className="space-y-4">
            <div className="flex space-x-3">
              <input type="text" placeholder="First Name" className="w-1/2 p-1.5 rounded bg-spotify-black text-white" />
              <input type="text" placeholder="Last Name" className="w-1/2 p-1.5 rounded bg-spotify-black text-white" />
            </div>
            <input type="email" placeholder="Enter your email" className="w-full p-1.5 rounded bg-spotify-black text-white" />
            <input type="text" placeholder="Enter your Phone number" className="w-full p-1.5 rounded bg-spotify-black text-white" />
            <input type="password" placeholder="Password" className="w-full p-1.5 rounded bg-spotify-black text-white" />
            <input type="password" placeholder="Confirm password" className="w-full p-1.5 rounded bg-spotify-black text-white" />
            <input type="text" placeholder="Code" className="w-full p-1.5 rounded bg-spotify-black text-white" />
            <UserButton name={"Sign Up"} />
            <GoogleButton name = {'Sign In'} />
          </form>
        </div>
        <div className="w-full md:w-1/2  bg-spotify-black rounded-md flex items-center justify-center">
          <div className='bg-spotify-green w-full mr-10 rounded-md pt-48 pb-48'>
            {/* Add any content you want in the green div here */}
          </div>
        </div>
      </div>
    </div>
        </>
        
    );
}

export default SignupForm;
