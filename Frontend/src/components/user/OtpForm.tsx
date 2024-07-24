import React, { useEffect, useState } from 'react';

const OtpForm = () => {
    const [otp , setOtp] = useState(Array(6).fill(""))
    const [timer ,setTimer] = useState<number>(60)

    useEffect(() => {
        const countdown = setInterval(() => {
            if(timer > 0) {
                setTimer(timer - 1)
            }
        }, 1000)

        return () => clearInterval(countdown)
    },[timer])




    return (
        <div>
             <div className="flex h-screen items-center ml-32 mr-32" >
      <div className="w-1/2 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">OTP verification.</h1>
          <p className="mb-8">valid upto 1 minute</p>
          <div className="flex justify-center mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                // maxLength="1"
                className="w-12 h-12 mx-1 text-center border border-gray-300 rounded"
                value={data}
                // onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>
          <div className="mb-8">
            <span>00 : {timer < 10 ? `0${timer}` : timer}</span>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
        </div>
      </div>
      <div className="w-80 bg-green-600 flex items-center justify-center ">
        <img src="illustration.png" alt="Illustration" className="max-w-full h-auto" />
      </div>
    </div>
        </div>
    );
}

export default OtpForm;
