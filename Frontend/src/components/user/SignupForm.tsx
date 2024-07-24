import React, { useState } from "react";
import UserButton from "../common/user/UserButton";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../common/user/googleButton";
import { validateSignUp } from "../../validation/user/signUpValidation";
import { Toaster, toast } from 'sonner'
import { registerUser } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const SignupForm = () => {

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/login");
  };

  const [firstName , setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setphone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [referal, setReferal] = useState<string>('')
  const [errors , setErrors] = useState<{firstName ?: string; lastName ?: string; email?: string, phone?: string , password ?: string; confirmPassword ?: string}>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const validationErrors = validateSignUp(firstName, lastName, email, phone, password, confirmPassword);
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
  
      if (validationErrors.firstName) {
        toast.error(validationErrors.firstName);
      } else if (validationErrors.lastName) {
        toast.error(validationErrors.lastName);
      } else if (validationErrors.email) {
        toast.error(validationErrors.email);
      } else if (validationErrors.phone) {
        toast.error(validationErrors.phone);
      } else if (validationErrors.password) {
        toast.error(validationErrors.password);
      } else if (validationErrors.confirmPassword) {
        toast.error(validationErrors.confirmPassword);
      }
    } else {
   
      dispatch(registerUser({
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword
      }));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        
        <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-full max-w-4xl mx-auto mt-20 mb-64">
          <div className="w-full md:w-1/2 p-4 mt-5 mb-0">
            <h2 className="text-white text-2xl mb-3 font-semibold font-poppins">
              Register
            </h2>
            <p className="text-spotify-lightgrey text-xs mb-4">
              Already have an Account?{" "}
              <a
                className="text-spotify-green font-medium hover:underline cursor-pointer"
                onClick={goToSignUp}
              >
                login
              </a>
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 p-1.5 rounded bg-spotify-black text-white"
                  value = {firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 p-1.5 rounded bg-spotify-black text-white"
                  value = {lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-1.5 rounded bg-spotify-black text-white"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your Phone number"
                className="w-full p-1.5 rounded bg-spotify-black text-white"
                value = {phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-1.5 rounded bg-spotify-black text-white"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-1.5 rounded bg-spotify-black text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

              />
              <input
                type="text"
                placeholder="Code"
                className="w-full p-1.5 rounded bg-spotify-black text-white"
                value={referal}
                onChange={(e) => setReferal(e.target.value)}
              />
              <UserButton name={"Sign Up"} />
              <GoogleButton name={"Sign In"} />
            </form>
          </div>
          <div className="w-full md:w-1/2  bg-spotify-black rounded-md flex items-center justify-center">
            <div className="bg-spotify-green w-full mr-10 rounded-md pt-48 pb-48">
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
