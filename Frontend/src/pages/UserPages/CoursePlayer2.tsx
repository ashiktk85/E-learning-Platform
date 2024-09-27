import React, { useEffect, useState } from 'react';
import VideoPlayer from '../../components/UserComponent/VideoPlayer';
import PlayList from '../../components/UserComponent/PlayList';
import Navbar from '../../components/UserComponent/Navbar';
import userAxiosInstance from '../../config/axiosInstance/userInstance';
import { useParams } from 'react-router-dom';

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
  profileUrl : string;
}

interface Ivideo {
  _id: string;
  title: string;
  url: string;
  description: string;
}

interface Isection {
  description: string;
  _id: string;
  title: string;
  sectionTitle: string;
  videos: Ivideo[];
}

const CoursePlayer2 = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseData, setCourseData] = useState<IcourseData | null>(null);
  const [activeVideo, setActiveVideo] = useState<Ivideo | null>(null);
  console.log(courseData);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const {data} = await userAxiosInstance.get(`/getCourse/${courseId}`);
        setCourseData(data);
        // console.log(data);
        if (data.sections.length > 0 && data.sections[0].videos.length > 0) {
          setActiveVideo(data.sections[0].videos[0]); 
        }

       
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, [courseId]);



  return (
    <>
    <Navbar />
    <div className="bg-[#f9f9f9] pl-[2%] pr-[2%] py-5 flex justify-between h-[100vh] pt-20">
      <div className="flex-grow">
        <VideoPlayer
         video={activeVideo} 
         tutorName={courseData?.tutorName}
          tutorBio={courseData?.tutorBio}
          tutorProfile = {courseData?.profileUrl}
        />
      </div>
      <PlayList
      sections = {courseData?.sections}
      setActiveVideo = {setActiveVideo}
      />
    </div>
    </>
  );
};

export default CoursePlayer2;