import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Base_URL } from "../../credentials";
import axios from "axios";
import { FaRegStar, FaGraduationCap } from "react-icons/fa";
import Navbar from "../../components/UserComponent/Navbar";
import Footer from "../../components/common/UserCommon/Footer";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBook } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

interface Ivideo {
  title: string;
  videoUrl: string;
}

interface Isection {
  title: string;
  sectionTitle: string;
  videos: Ivideo[];
}

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
  price: string | number;
}

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<IcourseData | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

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

  const handleMouseEnter = (videoUrl: string) => {
    setPreviewVideo(videoUrl);
  };

  const handleMouseLeave = () => {
    setPreviewVideo(null);
  };

  const toggleSection = (index: number) => {
    setActiveSectionIndex(activeSectionIndex === index ? null : index);
  };

  return (
    <>
   <Navbar />
    <main className="relative h-screen flex">
    
      <div className="w-3/4 mt-10">
      <section className="h-1/2  py-20 pl-20 pr-10 text-black flex flex-col gap-5 ">
      <h1 className="text-xl font-bold">{courseData?.name}</h1>
      <div className="w-full  flex gap-20 ">
      <p>ratings</p>
      <HiMiniUsers size={20}/>
      <FaBook />
      </div>
      <p className="font-normal text-gray-500">{courseData?.description}</p>
     </section>
     <section className="h-auto px-20">
      <h1 className="text-lg font-bold">Course content</h1>
     </section>
      </div>

      <div className="h-1/2 w-1/2  py-20 mt-10">

      <section className="h-[400px] w-[450px]  border-[1.5px] border-gray-300 rounded-md p-3">
      <img src={courseData?.thumbnailUrl} 
      className="w-full h-60 rounded-md"
      alt="" />
      <h1 className="text-xl font-semibold">
        {
          courseData?.price ? <p className="px-5 py-3"> $ {courseData?.price}</p> : 
          <p className="text-green-500 px-5 py-3">Free</p>
        }
        </h1>

        <div className="w-full px-3 flex gap-4 justify-center">
          <button className="bg-[#7BC74D] h-10 w-full rounded-md text-lg font-bold text-white">
          Enroll now
          </button>
          <div className="h-10 border-[1px] border-black w-[50px] rounded-md flex justify-center py-2 cursor-pointer">
          <FaRegHeart size={20} />
          </div>
          
        </div>
      </section>
      </div>
     
      
    </main>
    <Footer />
    </>
  );
};

export default CourseDetailsPage;
