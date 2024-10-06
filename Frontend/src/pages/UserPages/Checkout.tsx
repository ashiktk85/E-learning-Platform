import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/UserComponent/Navbar";
import Footer from "../../components/common/UserCommon/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_URL, RAZOR_KEY } from "../../credentials";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BlockChecker from "../../services/BlockChecker";
import triggerConfetti from "../../utils/confetti";

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
  users?: string[];
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
  BlockChecker();
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
      try {
        const res = await axios.post(`${Base_URL}/saveCourse`, {
          userId : userInfo?.userId,
          email: email,
          courseId: id,
        });

        if (res) {
          triggerConfetti()
          toast.success("Course purchased successfully.", {
            action: {
              label: "OK",
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
            razorpay_payment_id: string;
            razorpay_order_id: string;
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
              triggerConfetti()
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
            name: userInfo?.firstName || "Your Name",
            email: email || "your-email@example.com",
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
    <>
      <Toaster position="top-center" richColors />
      <Navbar />
      <div className="max-h-max bg-[#f5f5f5] pt-16">
        <div className="w-full h-screen flex">
          <div className="relative w-4/12 h-full flex flex-col">
            <div className="absolute top-[20%] left-[10%] flex flex-col">
              <h1 className="text-4xl text-green-500 font-bold my-4">
                Order Summary
              </h1>
              <p className="text-xl text-white font-normal">
                Review the items in your cart, ensure your shipping details are
                correct, and complete your purchase.
              </p>
            </div>
            <img
              src="https://img.freepik.com/free-photo/medium-shot-man-working-late-night-laptop_23-2150280975.jpg"
              className="w-full h-full object-cover"
              alt="cover img"
            />
          </div>

          <div className="w-3/4 h-full bg-[#f5f5f5] flex flex-col pl-40 pr-0 pt-2">
            <div className="w-full max-w-[650px]">
              <div className="w-full flex flex-col mb-8">
                <h3 className="text-2xl font-semibold mb-2 pt-2">Checkout</h3>
                <p className="text-base mb-4">
                  Review your order and make your payment to complete the
                  purchase.
                </p>
              </div>

              <div className="flex justify-between items-start py-3 border-b">
                <div className="flex">
                  <img
                    src={courseData?.thumbnailUrl || "/fallback-thumbnail.jpg"}
                    alt="Course Thumbnail"
                    className="w-3/4 h-44 object-cover rounded-md"
                  />
                  <div className="ml-4 w-full">
                    <h2 className="text-lg font-bold">{courseData?.name}</h2>
                    <div className="text-gray-600 text-sm mt-1 w-full">
                      <p className="cursor-pointer mb-1">
                        {courseData?.Category}
                      </p>
                      <p>{courseData?.description}</p>
                      <p className="cursor-pointer mt-1">Sustainability</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="text-green-500 font-semibold">
                    Price
                  </button>
                  <p className="font-bold">
                    ₹{courseData?.price ? courseData?.price : "Free"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">SUBTOTAL :</span>
                  <span className="font-bold">₹{courseData?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">EXTRA CHARGES :</span>
                  <span className="font-bold">₹0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800 font-semibold">TOTAL :</span>
                  <span className="font-bold">₹{courseData?.price}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center gap-5">
                {/* <button
                    className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold"
                    
                  >
                    Pay now
                  </button> */}

                <button
                  type="submit"
                  className="w-3/4 text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center gap-5 font-semibold"
                  onClick={handlePayment}
                >
                  Pay Now
                </button>
                <span className="text-green-500 pl-10">
                  Get Daily Cash With Nespola Card
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
