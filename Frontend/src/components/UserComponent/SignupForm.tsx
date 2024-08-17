// import React, { useState } from "react";
// import UserButton from "../common/UserCommon/UserButton";
// import { useNavigate } from "react-router-dom";
// import GoogleButton from "../common/UserCommon/googleButton";
// import { validateSignUp } from "../../validation/user/signUpValidation";
// import { Toaster, toast } from "sonner";
// import { registerUser } from "../../redux/actions/userAction";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";

// interface ValidationErrors {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phone?: string;
//   password?: string;
//   confirmPassword?: string;
// }

// const SignupForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   let [firstName, setFirstName] = useState<string>("");
//   let [lastName, setLastName] = useState<string>("");
//   let [email, setEmail] = useState<string>("");
//   let [phone, setPhone] = useState<string>("");
//   let [password, setPassword] = useState<string>("");
//   let [confirmPassword, setConfirmPassword] = useState<string>("");
//   let [referal, setReferal] = useState<string>("");
//   let [errors, setErrors] = useState<ValidationErrors>({});

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     firstName = firstName.trim();
//     lastName = lastName.trim();
//     email = email.trim();
//     phone = phone.trim();
//     password = password.trim();
//     confirmPassword = confirmPassword.trim();

//     if (
//       !firstName &&
//       !lastName &&
//       !email &&
//       !phone &&
//       !password &&
//       !confirmPassword
//     ) {
//       toast.error("All fields are required.");
//     } else {
//       const validationErrors: ValidationErrors = validateSignUp(
//         firstName,
//         lastName,
//         email,
//         phone,
//         password,
//         confirmPassword
//       );

//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);

//         const firstErrorKey = Object.keys(validationErrors)[0] as keyof ValidationErrors;
//         const firstError = validationErrors[firstErrorKey];

//         if (firstError) {
//           toast.error(firstError);
//         }
//       } else {
//         const registrationResult = await dispatch(
//           registerUser({
//             firstName,
//             lastName,
//             email,
//             phone,
//             password,
//             confirmPassword,
//           }) as any
//         );

//         if (registrationResult === false) {
//           toast.error("Email already in use.");
//         }

//         if (registrationResult === true) {
//           console.log("getting to otp");

//           navigate("/otp");
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen">
//         <Toaster position="top-center" richColors />
//         <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-full max-w-4xl mx-auto mt-20 mb-64">
//           <div className="w-full md:w-1/2 p-4 mt-5 mb-0">
//             <h2 className="text-white text-2xl mb-3 font-semibold font-poppins">
//               Register
//             </h2>
//             <p className="text-spotify-lightgrey text-xs mb-4">
//               Already have an Account?{" "}
//               <a
//                 className="text-spotify-green font-medium hover:underline cursor-pointer"
//                 onClick={() => navigate("/login")}
//               >
//                 login
//               </a>
//             </p>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div className="flex space-x-3">

//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   className="w-1/2 p-1.5 rounded bg-spotify-black text-white"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />

//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   className="w-1/2 p-1.5 rounded bg-spotify-black text-white"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>

//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 className="w-full p-1.5 rounded bg-spotify-black text-white"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <input
//                 type="text"
//                 placeholder="Enter your Phone number"
//                 className="w-full p-1.5 rounded bg-spotify-black text-white"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />

//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full p-1.5 rounded bg-spotify-black text-white"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 className="w-full p-1.5 rounded bg-spotify-black text-white"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Code"
//                 className="w-full p-1.5 rounded bg-spotify-black text-white"
//                 value={referal}
//                 onChange={(e) => setReferal(e.target.value)}
//               />
//               <UserButton name={"Sign Up"} />
//               {/* <GoogleButton name={"Sign In"} /> */}
//             </form>
//           </div>
//           <div className="w-full md:w-1/2 bg-spotify-black rounded-md flex items-center justify-center">
//             <div className="bg-spotify-green w-full mr-10 rounded-md pt-48 pb-48">

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignupForm;

import { FcGoogle } from "react-icons/fc";

const SignupForm: React.FC = () => {
  return (
    <div className="w-full h-auto flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Start your Learning Journey.
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and start interacting with thousands of courses.
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/7099909/pexels-photo-7099909.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col pl-20 pr-20 pt-8 justify-between">
        <h1 className="text-3xl text-green-500 font-bold">Learn Sphere.</h1>

        <div className="w-full flex flex-col max-w-[450px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-2">Register</h3>
            <p className="text-base mb-2">
              Welcome back! Please Enter your details
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col">

          <div className="w-full flex gap-5">
          <input
            type="text"
            className="w-1/2 text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="First name"
          />
          <input
            type="text"
            className="w-1/2 text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Last name"
          />
          </div>
          <input
            type="text"
            className="w-full text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Email"
          />

          <input
            type="text"
            className="w-full text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Phone number"
          />

          <input
            type="password"
            className="w-full text-black py-2 my-4 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Password"
          />

          <input
            type="password"
            className="w-full text-black py-2 my-4 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Confirm Password"
          />
        </div>

        <div className="w-full flex items-center justify-between">
         

         
        </div>

        <div className="w-full flex flex-col my-4">
          <button className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center">
          Register
          </button>

         
        </div>

        <div className="w-full flex items-center justify-center relative">
          <div className="w-full h-[1px] bg-black"></div>
          <p className="text-base absolute text-black/80 bg-[#f5f5f5]">OR</p>
        </div>

        <div className="w-full text-[#060606] my-2 bg-white border-[1.5px] border-black/40 rounded-md p-4 text-center flex items-center justify-center mt-5">
          <FcGoogle className=" mr-2" />
          Sign In with Google
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-black">
           Have an account?{" "}
            <span className="font-semibold underline underline-offset-2 cursor-pointer">
              login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
