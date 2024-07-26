import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import  {verifyOtp} from '../../redux/actions/userAction'



const OtpForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value.length > 0 && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const otpVerification = await dispatch(verifyOtp(otpValue))
    if(otpVerification === "wrong") {
      toast.error("Wrong OTP, try again!")
    } else if (otpVerification === "expired") {
      toast.error("OTP expired, send again.")
    } else if (otpVerification === true) {
      toast.success("OTP verifiaction successfull.")
      setTimeout(() => {
        navigate('/login')
      }, 2000);
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position="top-center" richColors />
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2 p-8 bg-black text-white flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6">OTP verification</h2>
          <p className="text-sm mb-4">valid upto 1 minute</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  className="w-12 h-12 text-center text-2xl bg-gray-800 text-white rounded-md focus:outline-none"
                />
              ))}
            </div>
            {errors && <div className="text-red-500 text-sm mt-1">{errors}</div>}
            <div className="text-gray-400 mt-2">
              {timeLeft > 0 ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : "Time expired"}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md font-bold mt-4 hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="md:w-1/2 bg-green-500 flex items-center justify-center p-10">
          <img src='' alt="OTP Illustration" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
