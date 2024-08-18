import React from "react";
import Footer from "../../components/common/UserCommon/Footer";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";
import { toast, Toaster } from "sonner";

import { useNavigate } from "react-router-dom";
const url = "http://localhost:7000";

const TutorLogin: React.FC = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = Yup.object({
    applicationId: Yup.string()
      .required("Tutor ID is required")
      .min(6, "Tutor ID must be at least 6 characters"),
    passcode: Yup.string()
      .required("Passcode is required")
      .min(6, "Passcode must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      applicationId: "",
      passcode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values);
        const { applicationId, passcode } = values;
        const response = await axios.post(`${url}/tutor/login`, {
          applicationId,
          passcode,
        });

        if(response) {
            toast.success("Login successfull")
            localStorage.setItem("tutorCredentials", JSON.stringify({ applicationId, passcode }));
            setTimeout(() => {
                navigate('/tutor/dashboard')
            }, 1500);
        }
      } catch (error: any) {
        let errorMessage = "An unexpected error occurred";
        if (error.response && error.response.data) {
          errorMessage =
            error.response.data.message || JSON.stringify(error.response.data);
        }
        toast.error(errorMessage);
      }
    },
  });

  return (
    <>
      <Toaster richColors/>
      <div
        className="w-full h-screen flex justify-center items-center bg-cover bg-center bg-green-400"
        style={
          {
            // backgroundImage: "url('https://images.pexels.com/photos/808510/pexels-photo-808510.jpeg?auto=compress&cs=tinysrgb&w=1200')",
          }
        }
      >
        <div className="w-3/4 bg-slate-400 h-3/4 mt-10 flex">
          <div className="bg-black h-full w-full relative">
            <div className="absolute top-[20%] ml-5 flex flex-col">
              <h1 className="text-3xl text-white font-bold">
                Start your teaching career.
              </h1>
              <p className="text-lg text-white font-semibold pt-4">
                Start for free and start interacting with thousands of courses.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/5553065/pexels-photo-5553065.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-full object-cover"
              alt="green"
            />
          </div>
          <div className="bg-[#f5f5f5] h-full w-full font-poppins">
            <h2 className="p-10 text-4xl text-green-500 font-bold">
              Learn Sphere
            </h2>
            <h3 className="pl-10 pb-2 text-xl font-bold ">Login</h3>
            <h4 className="pl-10 text-lg font-medium ">
              Login to unlock your Dashboard
            </h4>

            <form onSubmit={formik.handleSubmit}>
              <div className="pl-10 pr-20">
                <input
                  type="text"
                  placeholder="Tutor ID"
                  name="applicationId"
                  className={`w-full text-black py-2 my-4 border-b bg-transparent border-black outline-none focus:outline-none ${
                    formik.touched.applicationId && formik.errors.applicationId
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formik.values.applicationId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.applicationId && formik.errors.applicationId ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.applicationId}
                  </div>
                ) : null}
              </div>

              <div className="pl-10 pr-20">
                <input
                  type="text"
                  placeholder="Passcode"
                  name="passcode"
                  className={`w-full text-black py-2 my-4 border-b bg-transparent border-black outline-none focus:outline-none ${
                    formik.touched.passcode && formik.errors.passcode
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formik.values.passcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.passcode && formik.errors.passcode ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.passcode}
                  </div>
                ) : null}
              </div>

              <div className="pl-10 pr-10 pt-10">
                <button
                  type="submit"
                  className="w-full text-white font-bold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorLogin;
