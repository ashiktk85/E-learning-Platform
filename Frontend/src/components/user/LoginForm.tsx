import React from 'react';
import UserButton from '../common/user/UserButton';
import { useNavigate } from 'react-router-dom';
import logoBanner from '../../assets/userbanner/loginBanner.png'
import GoogleButton from '../common/user/googleButton';
const LoginForm = () => {
    const navigate = useNavigate()
    const goToSignUp = () => {
        navigate('/signup')
    }
    return (
        <>
     <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-full max-w-4xl mx-auto mt-20 mb-64">
        <div className="w-full md:w-1/2 p-4 mt-10 mb-0">
          <h2 className="text-white text-3xl mb-4 font-semibold">Welcome back.</h2>
          <p className="text-spotify-white mb-6">Don't have an account? <a className="text-spotify-green hover:underline" onClick={goToSignUp}>Sign up</a></p>
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-2 rounded bg-spotify-black text-white" />
            <input type="password" placeholder="Password" className="w-full p-2 rounded bg-spotify-black text-white" />
            <div className="flex justify-between items-center">
              <label className="text-spotify-white flex items-center">
                <input type="checkbox" className="mr-2" /> Keep me logged in
              </label>
              <a href="#" className="text-spotify-white hover:underline">Forgot password?</a>
            </div>
            <UserButton name={'Login'} />
            <GoogleButton name = {'Login'}/>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-4 bg-spotify-black rounded-md flex items-center justify-center">
          <div className='bg-spotify-green pl-80  items-start mr-24 text-white pt-36 pb-36 rounded-md'>
            
          </div>
        </div>
      </div>
    </div>
         
    <h1>sdfsdfed</h1>
    
        </>
    );
}

export default LoginForm;
