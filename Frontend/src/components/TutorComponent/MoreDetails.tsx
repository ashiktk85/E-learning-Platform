import React, { useState } from "react";
import { useCourseContext } from "../../context/courseContext";
import axios from "axios";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";

const url = "http://localhost:7000";

const MoreDetails:React.FC<{ onNext: (itemName: string) => void }> = ({ onNext }) => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.userInfo;
  const navigate = useNavigate()

  const { courseData, setCourseData } = useCourseContext();
  const [additionalDetail1, setAdditionalDetail1] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null); // Store file object
  const [price, setPrice] = useState<number | "">("");
  const [isFree, setIsFree] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]); // Store the file object
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value <= 5000) {
      setPrice(value);
    }
  };

  const handleSaveDetails = async () => {
    if (price !== "" && price > 5000) {
      alert("Price cannot exceed 5000");
      return;
    }
  
    const updatedData = {
      ...courseData,
      additionalDetail1,
      thumbnail,
      price: isFree ? "Free" : price,
    };
    
    setCourseData(updatedData as any);
    console.log("More details added:", updatedData);
  
    try {
      const response = await axios.post(`${url}/tutor/create-course/${userInfo?.email}`, updatedData ,
         {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
            }
      );
      console.log('Course created successfully:', response.data);
      if(response) {
        toast.success("Course Added.")
       
        onNext("Courses")
      }
     
    } catch (error: any) {
      console.error('Error creating course:', error.message);
    }
  };
  return (
    <div className="font-poppins">
        <Toaster richColors position="top-center" />
      <div className="w-full flex">
        <h2 className="mb-2">Basic details {">"}</h2>
        <p className="ml-2">Add sections {">"}</p>
        <p className="ml-2 font-bold">More details</p>
      </div>
      <div className="bg-[#fafbfe] p-4 rounded-lg shadow-lg w-full mt-10 mb-5 pl-10 pr-10">
        <div className="mb-4">
          <h3 className="font-bold">Thumbnail Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)} 
              alt="Thumbnail Preview"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-bold">Course Price</h3>
          <div>
            <label>
              <input
                type="radio"
                checked={isFree}
                onChange={() => setIsFree(true)}
              />
              Free
            </label>
            <label className="ml-4">
              <input
                type="radio"
                checked={!isFree}
                onChange={() => setIsFree(false)}
              />
              Paid
            </label>
          </div>
          {!isFree && (
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              min="0"
              max="5000"
              className="w-1/2 mt-2 border border-gray-300 rounded p-2"
            />
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-bold">Additional Info about your course</h3>
          <textarea
            value={additionalDetail1}
            onChange={(e) => setAdditionalDetail1(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSaveDetails}
        >
          Save Details
        </button>
      </div>
    </div>
  );
};

export default MoreDetails;
