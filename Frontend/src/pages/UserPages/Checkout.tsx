import React, { useEffect, useState } from "react";
import Navbar from "../../components/UserComponent/Navbar";
import Footer from "../../components/common/UserCommon/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_URL, RAZOR_KEY } from "../../credentials";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userAxiosInstance from "../../config/axiosInstance/userInstance";

interface IcourseData {
  name: string;
  description: string;
  Category: string;
  sections: Isection[];
  tags: string[];
  language: string;
  ratings: number[];
  comments: string[];
  thumbnailUrl: string;
  tutorName: string;
  tutorBio: string;
  education: string;
  certifications: string[];
  email: string;
  courseId: string;
  price: any;
  users?: string[]
}

interface Ivideo {
  title: string;
  videoUrl: string;
}

interface Isection {
  title: string;
  sectionTitle: string;
  videos: Ivideo[];
}

const Checkout = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const email = userInfo?.email;
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<IcourseData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${Base_URL}/getCourse/${id}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, [id]);

  const handlePayment = async () => {
    if (courseData?.price === "Free") {
      // If the course is free, proceed with saving the course directly
      try {
        const res = await axios.post(`${Base_URL}/saveCourse`, {
          email: email,
          courseId: courseData?.courseId,
        });
  
        if (res) {
          toast("Course purchased", {
            action: {
              label: "ok",
              onClick: () => navigate("/coursesPage"),
            },
          });
        }
      } catch (error) {
        console.error("Error saving free course:", error);
        toast.error("Failed to purchase the free course.");
      }
    } else {
     
      try {
        const options = {
          key: RAZOR_KEY,
          amount: courseData?.price * 100, 
          currency: "INR",
          name: "Learnsphere",
          description: "Course Payment",
          handler: async function (response: {
            razorpay_payment_id: any;
            razorpay_order_id: any;
          }) {
            try {
              await axios.post(`${Base_URL}/createorder`, {
                amount: courseData?.price,
                currency: "INR",
                email: email,
                courseId: courseData?.courseId,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              });
  
              toast.success("Payment successful and order created.");
              setTimeout(() => {
                navigate("/coursesPage");
              }, 1500);
            } catch (error) {
              console.error("Error saving payment:", error);
              toast.error("Failed to save order.");
            }
          },
          prefill: {
            name: "Your Name",
            email: "your-email@example.com",
            contact: "9876543210",
          },
        };
  
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Error during payment process:", error);
        toast.error("Error during payment.");
      }
    }
  };
  

  return (
    <main className="max-h-max w-full">
      <Toaster position="top-center" richColors />
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-20 mb-20">
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Free delivery and free returns.
        </p>

        <div className="flex justify-between items-start py-6 border-b">
          <div className="flex">
            <img
              src={courseData?.thumbnailUrl}
              alt="Book Cover"
              className="w-1/2 h-44 object-cover rounded-md"
            />
            <div className="ml-4">
              <h2 className="text-lg font-bold">{courseData?.name}</h2>
              <div className="text-gray-600 text-sm mt-1">
                <p className="cursor-pointer mb-1">{courseData?.Category}</p>
                <p>{courseData?.description}</p>
                <p className="cursor-pointer mt-1">Sustainability</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-green-500 font-semibold">Price</button>
            <p className="font-bold">{courseData?.price}</p>
          </div>
        </div>

        <div className="flex flex-col mt-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">SUBTOTAL :</span>
            <span className="font-bold">
              {" "}
              {courseData?.price}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">EXTRA CHARGES :</span>
            <span className="font-bold">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800 font-semibold">TOTAL :</span>
            <span className="font-bold">
              {courseData?.price}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold"
            onClick={handlePayment}
          >
            Pay now
          </button>
          <span className="text-green-500">
            Get Daily Cash With Nespola Card
          </span>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Checkout;
