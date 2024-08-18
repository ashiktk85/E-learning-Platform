// const LoginForm = () => {
//   const dispatch = useDispatch<any>();
//   const navigate = useNavigate();
//   const { userInfo, error } = useSelector((state: any) => state.user);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Email is required"),
//       password: Yup.string()
//         .min(8, "Password must be at least 8 characters")
//         .required("Password is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const loginResult = await dispatch(login(values)).unwrap();
//         if (loginResult) {
//           if (userInfo?.isBlocked) {
//             toast.error("Currently you are restricted from accessing the site.");
//             return;
//           }
//           toast.success("Login successful");
//           setTimeout(() => {
//             navigate('/');
//           }, 1500);
//         }
//       } catch (err: any) {
//         toast.error(err.message || 'An error occurred');
//       }
//     },
//   });

//   return (
//     <>
//       <Toaster position="top-center" richColors />
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="flex flex-wrap bg-spotify-black p-8 rounded-md shadow-md w-full max-w-2xl mx-auto mt-20 mb-64">
//           <div className="w-full md:w-1/2 p-4 mt-10 mb-0">
//             <h2 className="text-white text-3xl mb-4 font-semibold">Welcome back.</h2>
//             <p className="text-spotify-white mb-6">
//               Don't have an account?{" "}
//               <a className="text-spotify-green hover:underline" onClick={() => navigate("/signup")}>
//                 Sign up
//               </a>
//             </p>
//             <form className="space-y-4" onSubmit={formik.handleSubmit}>
//               <p className="text-spotify-white font-poppins mb-1.5">Email</p>
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="w-full p-2 rounded bg-spotify-black text-white"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <div className="text-red-500 text-sm">{formik.errors.email}</div>
//               ) : null}
//               <p className="text-spotify-white font-poppins mb-1">Password</p>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className="w-full p-2 rounded bg-spotify-black text-white"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="text-red-500 text-sm">{formik.errors.password}</div>
//               ) : null}
//               <div className="flex justify-between items-center">
//                 <label className="text-spotify-white flex items-center">
//                   <input type="checkbox" className="mr-2" /> Keep me logged in
//                 </label>
//                 <Link to='/forgotPass' className="text-spotify-white hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>
//               <UserButton name={"Login"} />
//             </form>
//           </div>
//           {/* <div className="w-full md:w-1/2 p-4 bg-spotify-black rounded-md flex items-center justify-center"> */}
//             {/* <div className="bg-spotify-green pl-80 items-start mr-24 text-white pt-36 pb-36 rounded-md"></div> */}
//           {/* </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginForm;

import { FcGoogle } from "react-icons/fc";
import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { login } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const loginResult = await dispatch(login(values)).unwrap();
        if (loginResult) {
          if (userInfo?.isBlocked) {
            toast.error(
              "Currently, you are restricted from accessing the site."
            );
            return;
          }
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (err: any) {
        toast.error(err.message || "An error occurred");
      }
    },
  });

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div className="w-full h-screen flex">
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
          alt="Learning Journey"
        />
      </div>


      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center pl-40">
        <h1 className="text-3xl text-green-500 font-bold mb-10 cursor-pointer" onClick={goToHome}>Learn Sphere</h1>

        <div className="w-full max-w-[450px]">
          <div className="w-full flex flex-col mb-8">
            <h3 className="text-2xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-4">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="w-full flex flex-col" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="w-full text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}

            <input
              type="password"
              className="w-full text-black py-2 my-4 border-b bg-transparent border-black outline-none focus:outline-none"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}

            <div className="w-full flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember Me</p>
              </div>

              <p className="text-sm font-medium cursor-pointer underline">
                Forgot Password?
              </p>
            </div>

            <div className="w-full flex flex-col my-6">
              <button
                type="submit"
                className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              >
                Log in
              </button>

              <Link to="/signup">
                <button
                  type="button"
                  className="w-full text-[#060606] my-2 bg-white border-[1.5px] border-black/40 rounded-md p-4 text-center flex items-center justify-center"
                >
                  Register
                </button>
              </Link>
            </div>
          </form>

          <div className="w-full flex items-center justify-center relative mb-6">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-base absolute text-black/80 bg-[#f5f5f5] px-2">
              OR
            </p>
          </div>

          <button className="w-full text-[#060606] bg-white border-[1.5px] border-black/40 rounded-md p-4 text-center flex items-center justify-center">
            <FcGoogle className="mr-2" />
            Sign In with Google
          </button>

          <div className="w-full flex items-center justify-center mt-4">
            <p className="text-sm font-normal text-black">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold underline underline-offset-2"
              >
                Sign Up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
