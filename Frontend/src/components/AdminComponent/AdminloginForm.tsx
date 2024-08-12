import React, { useState } from "react";
import UserButton from "../common/UserCommon/UserButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { adminLogin } from "../../redux/actions/adminActions";
import { toast, Toaster } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

const AdminloginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
    
  const { error }: any = useSelector((state: RootState) => state.admin);
 

  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    setGeneralError(null);
    setLoading(true);
  
    try {
     
      const resultAction = await dispatch(adminLogin(values));
  
   
  
      if (error) {
        if (error.message === "Invalid email") {
          toast.error("Invalid email address");
         
        } else if (error.message === "Invalid password") {
          toast.error("Incorrect password");
         
        } else {
          toast.error(error.message);
       
        }
      } else if (adminLogin.fulfilled.match(resultAction)) {
        // Handle successful login
        toast.success("Login successful");
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
      setGeneralError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  

  return (
    <>
      
      <div className="flex min-h-screen bg-spotify-white">
      <Toaster position="top-center" richColors />
        <div>
          <img
            className="min-h-screen"
            src="https://images.pexels.com/photos/3585001/pexels-photo-3585001.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="banner"
          />
        </div>

        <div className="justify-center items-center min-h-screen bg-spotify-white">
          <h2 className="text-3xl font-extrabold font-poppins ml-72 mt-36">Admin Login</h2>
          <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-auto ml-60 mx-auto mt-10 mb-64">
            <div className="w-full md:w-1/2 p-4 mt-5 mb-0">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label className="text-spotify-white font-poppins mb-3">Email</label>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        className="w-72 p-2 rounded bg-spotify-black text-white"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="relative">
                      <label className="text-spotify-white font-poppins mb-3">Password</label>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="w-72 p-2 rounded bg-spotify-black text-white"
                      />
                      <div
                        className="absolute right-2 top-9 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiOutlineEye className="text-white" />
                        ) : (
                          <AiOutlineEyeInvisible className="text-white" />
                        )}
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>

                    {generalError && (
                      <div className="text-red-500 text-sm">{generalError}</div>
                    )}

                    <div className="flex justify-between items-center mt-10">
                      <UserButton name={"Login"} />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminloginForm;
