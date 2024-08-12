import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { login } from "../../redux/actions/userAction";
import UserButton from "../common/UserCommon/UserButton";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { userInfo, error } = useSelector((state: any) => state.user); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const loginResult = await dispatch(login(values)).unwrap();
        if (loginResult) {
          if (userInfo?.isBlocked) {
            toast.error("Currently you are restricted from accessing the site.");
            return;
          }
          toast.success("Login successful");
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } catch (err: any) {
        toast.error(err.message || 'An error occurred');
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-full max-w-4xl mx-auto mt-20 mb-64">
          <div className="w-full md:w-1/2 p-4 mt-10 mb-0">
            <h2 className="text-white text-3xl mb-4 font-semibold">Welcome back.</h2>
            <p className="text-spotify-white mb-6">
              Don't have an account?{" "}
              <a className="text-spotify-green hover:underline" onClick={() => navigate("/signup")}>
                Sign up
              </a>
            </p>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <p className="text-spotify-white font-poppins mb-1.5">Email</p>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded bg-spotify-black text-white"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
              <p className="text-spotify-white font-poppins mb-1">Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-spotify-black text-white"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
              <div className="flex justify-between items-center">
                <label className="text-spotify-white flex items-center">
                  <input type="checkbox" className="mr-2" /> Keep me logged in
                </label>
                <Link to='/forgotPass' className="text-spotify-white hover:underline">
                  Forgot password?
                </Link>
              </div>
              <UserButton name={"Login"} />
            </form>
          </div>
          <div className="w-full md:w-1/2 p-4 bg-spotify-black rounded-md flex items-center justify-center">
            <div className="bg-spotify-green pl-80 items-start mr-24 text-white pt-36 pb-36 rounded-md"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
