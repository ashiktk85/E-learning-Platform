import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { verifyOtp, resendOtp } from '../../redux/actions/userAction';

const OtpForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive) {
      timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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
        navigate('/login');
      }, 2000);
    }
  };

  const resentOtp = async () => {
   
    toast.loading('Loading...');
  
    setTimeout(() => {
      toast.dismiss(); 
      toast.success('A new OTP has been sent.');
      setTimeLeft(60); 
      setTimerActive(true); 
    }, 1000); 
  
    const promise = async () => {
      try {
        const result = await dispatch(resendOtp());
        if (!result) {
          throw new Error("Failed to resend OTP");
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
  
    promise().catch(() => {
     
      setTimeout(() => {
        toast.dismiss();
        toast.error('Error resending OTP.');
      }, 1000); 
    });
  };

  return (
    <div className="flex min-h-screen bg-spotify-white ">
        <div>
          <img
            className="min-h-screen"
            src="https://images.pexels.com/photos/3585001/pexels-photo-3585001.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="banner"
          />
        </div>
      <div className="flex justify-center items-center min-h-screen bg-spotify-white w-full">
      <Toaster position="top-center" richColors />
      <div className="md:w-1/2 p-8 bg-spotify-grey text-white flex flex-col justify-center pt-20 pb-20">
        <h2 className="text-3xl font-semibold mb-6">OTP verification</h2>
        <p className="text-sm mb-4">Valid for 1 minute</p>
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
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl bg-spotify-black text-white rounded-md focus:outline-none"
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
        {timeLeft === 0 && (
          <button
            type="button"
            className="mt-3 text-white font-thin cursor-pointer hover:underline"
            onClick={resentOtp}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default OtpForm;
