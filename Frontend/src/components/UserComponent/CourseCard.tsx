import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegClock, FaRegUser, FaRegFileAlt, FaStar } from "react-icons/fa";

interface IcourseData {
  name: string;
  thumbnail: string;
  id: string;
  price: string | number;
  rating?: number;
  students?: number;
  duration?: string;
  lessons?: number;
}

const CourseCard: React.FC<IcourseData> = ({
  name,
  thumbnail,
  id,
  price,
  rating = 5,
  students = 300,
  duration = "10 Hour",
  lessons = 30,
}) => {
  const navigate = useNavigate();

  const gotoCourseDetails = () => {
    navigate(`/courseDetails/${id}`);
  };

  return (
    <div
      onClick={gotoCourseDetails}
      className="cursor-pointer border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 scale-100"
    >
      <img
        src={thumbnail}
        className="h-40 w-full object-cover"
        alt={`Thumbnail of ${name}`}
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
          <div className="flex items-center ml-auto">
            <FaStar className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600 ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Course Details */}
        <div className="flex items-center justify-between text-gray-600 mb-2 text-sm">
          <div className="flex items-center gap-1">
            <FaRegUser className="w-4 h-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegClock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegFileAlt className="w-4 h-4" />
            <span>{lessons} Lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
