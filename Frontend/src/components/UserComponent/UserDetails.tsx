import React, { useState } from "react";
import { updateUserInfo } from "../../redux/actions/userAction";
import * as Yup from "yup";
import editButton from "../../assets/svgs/edit.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "sonner";
import ApiBlock from "../../services/ApiBlock";



const UserDetails = () => {
  const data: any = useSelector((state: RootState) => state.user);

  const openEditModal = () => setEdit(true);
  const handleOpenModal = () => setIsModalOpen(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = () => setIsModalOpen(false);

  const closeEditModal = () => setEdit(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);

  const editSubmit = async (values: {
    userId: any;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    try {
      values.userId = data.userInfo.userId;
      // ApiBlock()
      const isBlocked = localStorage.getItem("isBlocked")
      console.log("atleast here",isBlocked);
      if(isBlocked === "true") {
        console.log("atleast here");
        
        toast.warning("Currently you are restricted.")
        return;
      } else {

        const response = await dispatch(updateUserInfo(values));
     
      if (response.meta.requestStatus === "fulfilled") {
        console.log("User information updated successfully:", response.payload);
        toast.success("Details updated")
        closeEditModal();
      } else if (response.meta.requestStatus === "rejected") {
        
  
        toast.info("No changes made")
      }
    }
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const nameRegex = /^[A-Z][a-zA-Z]*$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(
        nameRegex,
        "First Name must start with a capital letter and contain only letters"
      )
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(
        nameRegex,
        "Last Name must start with a capital letter and contain only letters"
      )
      .required("Last Name is required"),
    phone: Yup.string()
      .matches(phoneRegex, "Phone number must be exactly 10 digits")
      .required("Phone is required"),
  });
  return (
    <>
      <div className="h-96 bg-gray-100 col-span-7 m-3 rounded-2xl font-poppins">
        <h1 className="ml-8 mr-5 mt-5 font-bold text-lg">
          Your personal Dashboard
        </h1>
        <h2 className="ml-8 mr-5 mt-5">
          Hello, this is your profile page here you can view your profile, edit
          and do all other stuff, you can see the courses you enrolled, tutors
          you follow and your progress. Below is the referral code for inviting
          your friend. Click to see how referral works.
          <span
            onClick={handleOpenModal}
            className="text-blue-500 cursor-pointer underline ml-2"
          >
            here.
          </span>
        </h2>
        <h5 className="ml-8 mr-5 mt-5">
          Referral code: <span className="font-bold">BGN567E</span>
        </h5>
        <h3 className="ml-8 mr-5 mt-4">
          Name :{" "}
          <b>{data?.userInfo?.firstName + " " + data?.userInfo?.lastName}</b>
        </h3>
        <h3 className="ml-8 mr-5 mt-2">
          {" "}
          Email : <b>{data?.userInfo.email}</b>
        </h3>
        <h3 className="ml-8 mr-5 mt-2">
          Contact : <b>{data?.userInfo.phone}</b>
        </h3>
        <h3 className="ml-8 mr-5 mt-2">Socials : </h3>
        <img
          className="w-8 ml-28"
          src="https://cdn-icons-png.flaticon.com/128/15707/15707749.png"
          alt=""
        />

        <img
          className="h-5 w-5 ml-96 mb-10"
          src={editButton}
          alt=""
          onClick={openEditModal}
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg  w-1/2">
            <h3 className="text-xl font-semibold">How Referral Works</h3>
            <p className="mt-4 mb-4">
              Sure, here's a small description for how the referral works: "When
              you invite a friend, and they either make a purchase or take a
              subscription, they will receive $100, and you, as the person who
              invited them, will receive $200."
            </p>
            <button
              onClick={handleCloseModal}
              className=" align-middle mt-4 bg-spotify-green text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {edit && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="w-4/12 h-auto bg-white rounded-lg">
            <h3 className="font-poppins font-bold ml-32 mt-5 text-xl">
              Edit your personal info
            </h3>
            <Formik
              initialValues={{
                userId: data.userInfo.userid,
                firstName: data.userInfo.firstName,
                lastName: data.userInfo.lastName,
                phone: data.userInfo.phone,
              }}
              validationSchema={validationSchema}
              onSubmit={editSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="border-solid hover:border-double ml-16 mb-5">
                    <h4 className="mb-2 mt-5 font-medium">First Name</h4>
                    <Field
                      className="bg-gray-200 h-8 rounded-sm p-2 w-3/4"
                      type="text"
                      name="firstName"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="border-solid hover:border-double ml-16 mb-5">
                    <h4 className="mb-2 mt-5 font-medium">Last Name</h4>
                    <Field
                      className="bg-gray-200 h-8 rounded-sm p-2 w-3/4"
                      type="text"
                      name="lastName"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="border-solid hover:border-double ml-16 mb-5">
                    <h4 className="mb-2 mt-5 font-medium">Phone</h4>
                    <Field
                      className="bg-gray-200 h-8 rounded-sm p-2 w-3/4"
                      type="text"
                      name="phone"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex justify-center space-x-4 mb-10">
                    <button
                      className="align-middle bg-spotify-green text-white px-4 py-2 rounded hover:bg-green-800"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                    <button
                      className="align-middle bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800"
                      type="button"
                      onClick={closeEditModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
