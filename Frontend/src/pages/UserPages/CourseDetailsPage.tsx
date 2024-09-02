import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Base_URL } from "../../credentials";
import axios from "axios";

interface IcourseData {
  name: string;
  description: string;
  Category: string;
  sections: [];
  tags: [];
  language: string;
  ratings: [];
  comments: [];
  thumbnailUrl: string;
  tutorName: string;
  tutorBio: string;
  education: string;
  certifications: [];
  email: string;
  courseId: string;
  price: string | number;
}

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [courseData, setCourseData] = useState<IcourseData>();
  console.log(courseData, "course datat");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${Base_URL}/getCourse/${id}`);
        // console.log(response.data);

        setCourseData(response.data);
      } catch (error) {}
    };
    fetchCourseData();
  }, [id]);

  return (
    <main className='text-neutral-200 antialiased relative"'>
      <div className="h-screen w-full bg-white">
        <div className="h-3/4 w-full bg-black flex">
          <div className="relative  ml-12  h-full w-1/2">
            <img
              src={courseData?.thumbnailUrl}
              className="w-[650px] mt-20 rounded-xl cursor-pointer"
              alt=""
            />
            <h1>
                {courseData?.tutorName}
            </h1>
          </div>

          <div className="bg-black mr-10 h-full w-1/2">
            <div className="w-full h-full p-20 flex flex-col gap-5">
              <h1 className='font-bold text-2xl'>{courseData?.name}</h1>
              <p>{courseData?.description}</p>
              <button className=" text-white font-bold h-10 w-20 bg-gradient-to-tr from-[#FF896D] to-[#D02020] mt-5 rounded-xl ">
                {courseData?.language}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetailsPage;
