import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegClock, FaRegUser, FaRegFileAlt, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Base_URL } from "../../credentials";
import axios from "axios";
import { toast, Toaster } from "sonner";

interface IcourseData {
  courseName: string;
  thumbnail: string;
  courseId
: string;
  price: string | number;
  rating?: number;
  students?: number;
  duration?: string;
  lessons?: number;
}

const CourseCard: React.FC<IcourseData> = ({
  courseName,
  thumbnail,
  courseId
,
  price,
  rating = 5,
  students = 300,
  duration = "10 Hour",
  lessons = 30,
}) => {
  const {userInfo} = useSelector((state : RootState) => state.user)
  const email = userInfo?.email
  const navigate = useNavigate();

  const gotoCourseDetails = async() => {
    try {
      const response = await axios.get(`${Base_URL}/check-enrollment/${email}/${courseId}`)
      console.log(response.data,"rs");
      
      if (response.data) {
        
        navigate(`/coursePlayer/${courseId
        }`);
      } else {
        navigate(`/courseDetails/${courseId
        }`);
      }
    } catch (error : any) {
      console.error('Error checking enrollment:', error.response.data.message);
      toast.warning(error?.response?.data?.message)
    }

   
  };

  return (
    <div className="flex flex-col gap-3 pb-3">
     
      <div
        className="w-[280px] bg-center bg-no-repeat aspect-video bg-cover rounded-xl cursor-pointer "
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
        onClick={gotoCourseDetails}
      ></div>

      <div className="w-3/4">
        <p className="text-[#111418] text-base font-normal leading-normal">
          {courseName}
        </p>
       
        <div className="flex justify-between px-2">
        <p className="text-[#60758a] text-sm font-normal leading-normal">
          {price ? price : "Free"}
        </p>
        <div className="flex items-center gap-1">
        <FaRegClock className="w-3 h-3" />       
          <span className="text-[11px]">{duration}</span>
      </div>
        <div className="flex items-center ">
        <FaStar className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-medium text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseCard);

