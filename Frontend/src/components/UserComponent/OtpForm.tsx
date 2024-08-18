// import React, { useState, useEffect } from "react";
// import { Toaster, toast } from 'sonner';
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
// import { verifyOtp, resendOtp } from '../../redux/actions/userAction';

// const OtpForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
//   const [errors, setErrors] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState<number>(60);
//   const [timerActive, setTimerActive] = useState<boolean>(true);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (timerActive) {
//       timer = setInterval(() => {
//         setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
//       }, 1000);
//     }

//     return () => clearInterval(timer);
//   }, [timerActive]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value;
//     setOtp(newOtp);

//     if (e.target.value.length > 0 && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) {
//         (nextInput as HTMLInputElement).focus();
//       }
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       if (prevInput) {
//         const newOtp = [...otp];
//         newOtp[index - 1] = "";
//         setOtp(newOtp);
//         (prevInput as HTMLInputElement).focus();
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const otpValue = otp.join("");
    
//     const otpVerification = await dispatch(verifyOtp(otpValue));
//     if (otpVerification === "wrong") {
//       toast.error("Wrong OTP, try again!");
//     } else if (otpVerification === "expired") {
//       toast.error("OTP expired, send again.");
//     } else if (otpVerification === true) {
//       toast.success("OTP verification successful.");
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     }
//   };

//   const resentOtp = async () => {
   
//     toast.loading('Loading...');
  
//     setTimeout(() => {
//       toast.dismiss(); 
//       toast.success('A new OTP has been sent.');
//       setTimeLeft(60); 
//       setTimerActive(true); 
//     }, 1000); 
  
//     const promise = async () => {
//       try {
//         const result = await dispatch(resendOtp());
//         if (!result) {
//           throw new Error("Failed to resend OTP");
//         }
//       } catch (error: any) {
//         throw new Error(error.message);
//       }
//     };
  
//     promise().catch(() => {
     
//       setTimeout(() => {
//         toast.dismiss();
//         toast.error('Error resending OTP.');
//       }, 1000); 
//     });
//   };

//   return (
//     <div className="flex min-h-screen bg-spotify-white ">
//         <div>
//           <img
//             className="min-h-screen"
//             src="https://images.pexels.com/photos/3585001/pexels-photo-3585001.jpeg?auto=compress&cs=tinysrgb&w=600"
//             alt="banner"
//           />
//         </div>
//       <div className="flex justify-center items-center min-h-screen bg-spotify-white w-full">
//       <Toaster position="top-center" richColors />
//       <div className="md:w-1/2 p-8 bg-spotify-grey text-white flex flex-col justify-center pt-20 pb-20">
//         <h2 className="text-3xl font-semibold mb-6">OTP verification</h2>
//         <p className="text-sm mb-4">Valid for 1 minute</p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex justify-between">
//             {otp.map((value, index) => (
//               <input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 maxLength={1}
//                 value={value}
//                 onChange={(e) => handleChange(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 className="w-12 h-12 text-center text-2xl bg-spotify-black text-white rounded-md focus:outline-none"
//               />
//             ))}
//           </div>
//           {errors && <div className="text-red-500 text-sm mt-1">{errors}</div>}
//           <div className="text-gray-400 mt-2">
//             {timeLeft > 0 ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : "Time expired"}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-2 rounded-md font-bold mt-4 hover:bg-green-600"
//           >
//             Submit
//           </button>
//         </form>
//         {timeLeft === 0 && (
//           <button
//             type="button"
//             className="mt-3 text-white font-thin cursor-pointer hover:underline"
//             onClick={resentOtp}
//           >
//             Resend OTP
//           </button>
//         )}
//       </div>
//     </div>
//     </div>
    
//   );
// };

// export default OtpForm;



import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../../redux/actions/userAction";

const OtpForm: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerActive]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    setOtp(newOtp);

    if (e.target.value.length > 0 && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");

    const otpVerification = await dispatch(verifyOtp(otpValue));
    if (otpVerification === "wrong") {
      toast.error("Wrong OTP, try again!");
    } else if (otpVerification === "expired") {
      toast.error("OTP expired, send again.");
    } else if (otpVerification === true) {
      toast.success("OTP verification successful.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const resentOtp = async () => {
    toast.loading("Loading...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("A new OTP has been sent.");
      setTimeLeft(60);
      setTimerActive(true);
    }, 1000);

    try {
      await dispatch(resendOtp());
    } catch (error: any) {
      toast.error("Error resending OTP.");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

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
          src="https://images.pexels.com/photos/6249461/pexels-photo-6249461.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="w-full h-full object-cover"
          alt="Learning Journey"
        />
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center pl-40">
        <h1
          className="text-3xl text-green-500 font-bold mb-10 cursor-pointer"
          onClick={goToHome}
        >
          Learn Sphere
        </h1>

        <div className="w-full max-w-[450px]">
          <div className="w-full flex flex-col mb-8">
            <h3 className="text-2xl font-semibold mb-2">OTP Verification</h3>
            <p className="mb-0 text-lg">Please enter your OTP.</p>
          </div>

          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  className="w-full text-black py-2 my-2 border-b bg-transparent border-black outline-none focus:outline-none text-center"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                />
              ))}
            </div>

            <div className="w-full flex items-center justify-between mt-4">
              <div className="flex items-center">
                <p className="mr-2 text-base">Time left:</p>
                {timeLeft > 0
                  ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`
                  : "Time expired"}
              </div>

              <p
                className="text-sm font-medium cursor-pointer underline"
                onClick={resentOtp}
              >
                Resend OTP
              </p>
            </div>

            <div className="w-full flex flex-col my-6">
              <button
                type="submit"
                className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
