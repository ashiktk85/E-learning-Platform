



// const SignupForm: React.FC = () => {
//   

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

import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { AppDispatch } from "../../redux/store";
import { registerUser } from "../../redux/actions/userAction";

const SignupForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Formik setup with validation using Yup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
     validationSchema : Yup.object({
      firstName: Yup.string()
        .transform((value) => value.trim())
        .matches(/^[A-Z][a-zA-Z]*$/, "First name must start with a capital letter and contain only letters")
        .required("First name is required"),
      
      lastName: Yup.string()
        .transform((value) => value.trim())
        .matches(/^[A-Z][a-zA-Z]*$/, "Last name must start with a capital letter and contain only letters")
        .required("Last name is required"),
      
      email: Yup.string()
        .transform((value) => value.trim())
        .email("Invalid email address")
        .required("Email is required"),
      
      phone: Yup.string()
        .transform((value) => value.trim())
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      
      password: Yup.string()
        .transform((value) => value.trim())
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      
      confirmPassword: Yup.string()
        .transform((value) => value.trim())
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const registrationResult = await dispatch(registerUser(values));
        if (registrationResult) {
          navigate("/otp");
        } else {
          toast.error("Email already in use.");
        }
      } catch (error) {
        toast.error("An error occurred during registration.");
      }
    },
  });

  return (
    <div className="w-full h-auto flex items-start">
      <Toaster position="top-center" richColors />
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

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col pl-20 pr-20 pt-20 justify-between">
        <h1 className="text-3xl text-green-500 font-bold">Learn Sphere.</h1>

        <div className="w-full flex flex-col max-w-[450px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-2">Register</h3>
            <p className="text-base mb-2">Please Enter your details</p>
          </div>
        </div>

        <form className="w-full flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="w-full flex gap-5">
            <input
              type="text"
              name="firstName"
              className="w-1/2 text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
              placeholder="First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            ) : null}
            <input
              type="text"
              name="lastName"
              className="w-1/2 text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
              placeholder="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            ) : null}
          </div>
          <input
            type="text"
            name="email"
            className="w-full text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}

          <input
            type="text"
            name="phone"
            className="w-full text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          ) : null}

          <input
            type="password"
            name="password"
            className="w-full text-black py-2 my-4 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}

          <input
            type="password"
            name="confirmPassword"
            className="w-full text-black py-2 my-4 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          ) : null}

          <div className="w-full flex flex-col my-4">
            <button
              className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        <div className="w-full flex items-center justify-center relative">
          <div className="w-full h-[1px] bg-black"></div>
          <p className="text-base absolute text-black/80 bg-[#f5f5f5]">OR</p>
        </div>

        <div className="w-full text-[#060606] my-2 bg-white border-[1.5px] border-black/40 rounded-md p-4 text-center flex items-center justify-center mt-5 cursor-pointer">
          <FcGoogle className=" mr-2" />
          Sign In with Google
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-black">
            Have an account?{" "}
            <Link to="/login">
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

