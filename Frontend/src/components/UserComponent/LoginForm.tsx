import React, { useState } from "react";
import UserButton from "../common/UserCommon/UserButton";
import { Link, useNavigate } from "react-router-dom";
import logoBanner from "../../assets/userbanner/loginBanner.png";
import GoogleButton from "../common/UserCommon/googleButton";
import { loginValidation } from "../../validation/user/loginValidation";
import { toast, Toaster } from "sonner";
import { login } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";



const LoginForm = () => {
  const dispatch = useDispatch<any>()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors , setErrors] = useState<{email ?: string; password ?: string}>({})
 

  const handleLogin  = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!email && !password) {
      toast.error("Feilds are empty.")
    } else {
      const validationErrors = loginValidation(email , password)

    if(Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);

        Object.values(validationErrors).forEach(err => {
          if(err) {
            toast.error(err)
          }
        })
    } else {
      try {
        const loginResult = await dispatch(login({ email, password })).unwrap();
       if (loginResult) {
          toast.success("Login successful");
          setTimeout(() => {
            navigate('/')
          }, 1500);
        }
      } catch (err: any) {
        
        toast.error(err.message || 'An error occurred');
      }
    }
    }
  }

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-full max-w-4xl mx-auto mt-20 mb-64">
          <div className="w-full md:w-1/2 p-4 mt-10 mb-0">
            <h2 className="text-white text-3xl mb-4 font-semibold">
              Welcome back.
            </h2>
            <p className="text-spotify-white mb-6">
              Don't have an account?{" "}
              <a
                className="text-spotify-green hover:underline"
                onClick={goToSignUp}
              >
                Sign up
              </a>
            </p>
            <form className="space-y-4" onSubmit={handleLogin}>
            <p className="text-spotify-white font-poppins mb-1.5">Email</p>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-2 rounded bg-spotify-black text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-spotify-white font-poppins mb-1">Password</p>
              <input
                type="Enter your password"
                placeholder="Password"
                className="w-full p-2 rounded bg-spotify-black text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
              <div className="flex justify-between items-center">
                <label className="text-spotify-white flex items-center">
                  <input type="checkbox" className="mr-2" /> Keep me logged in
                </label>
                <Link to= '/forgotPass' className="text-spotify-white hover:underline">
                  Forgot password?
                </Link>
              </div>
              <UserButton name={"Login"} />
              {/* <GoogleButton name={"Login"} /> */}
            </form>
          </div>
          <div className="w-full md:w-1/2 p-4 bg-spotify-black rounded-md flex items-center justify-center">
            <div className="bg-spotify-green pl-80  items-start mr-24 text-white pt-36 pb-36 rounded-md"></div>
          </div>
        </div>
      </div>

      <h1>sdfsdfed</h1>
    </>
  );
};

export default LoginForm;
