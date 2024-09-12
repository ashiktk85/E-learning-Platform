import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegHeart, FaBook } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import Navbar from "../../components/UserComponent/Navbar";
import Footer from "../../components/common/UserCommon/Footer";
import { Base_URL } from "../../credentials";
import { useNavigate } from "react-router-dom"; 
import AccordionItem from "../../components/UserComponent/Accordian";
import { MdOndemandVideo } from "react-icons/md";
import BlockChecker from "../../services/BlockChecker";

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
  users?: number
}

const CourseDetailsPage = () => {
  BlockChecker()
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<IcourseData | null>(null);
  const navigate = useNavigate(); 
console.log("courese id", id);

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

  const handleEnroll = () => {
    const userToken = localStorage.getItem('accessToken');
    if(!userToken) return navigate('/login')
    navigate(`/checkout/${courseData?.courseId}`)
  };
  const totalSections = courseData?.sections.length || 0;
  const totalVideos = courseData?.sections.reduce(
    (total, section) => total + section.videos.length,
    0
  );

  return (
    <>
      <Navbar />
      <main className="relative max-h-min">
        <div className="flex">
          <div className="w-3/4 mt-10">
            <section className="h-1/2 py-20 pl-20 pr-10 text-black flex flex-col gap-5">
              <h1 className="text-xl font-bold">{courseData?.name}</h1>
              <div className="w-full flex gap-20">
                <p>Ratings: {courseData?.ratings.length}</p>
                <div className="flex gap-5">

                <HiMiniUsers size={20} /> 
                {courseData?.users}
                </div>
               
                <div className="flex gap-5 ">
                <FaBook size={20}/>
                {totalVideos}
                </div>
               
              </div>
              <p className="font-normal text-gray-500">
                {courseData?.description}
              </p>
            </section>
            <section className="w-full max-w-2xl mx-auto px-4">
              <h1 className="text-lg font-bold mb-4">Course Content</h1>
              <div>
                {(courseData?.sections &&
                  courseData.sections.map((section, index) => (
                    <AccordionItem key={section.title} title={section.title}>
                      {section.videos.length > 0 ? (
                        section.videos.map((video, videoIndex) => (
                          <div
                            className="flex items-center gap-2 p-2 "
                            key={videoIndex}
                          >
                            <MdOndemandVideo className="text-xl" />
                            <span className="flex-1">{video.title}</span>
                          </div>
                        ))
                      ) : (
                        <div>No videos available</div>
                      )}
                    </AccordionItem>
                  ))) || <div>No sections available</div>}
              </div>
            </section>
          </div>

          <div className="h-1/2 w-1/2 py-20 mt-10">
            <section className="h-auto w-[450px] border-[1.5px] border-gray-300 rounded-md p-3">
              <img
                src={courseData?.thumbnailUrl}
                className="w-full h-60 rounded-md"
                alt={`${courseData?.name} Thumbnail`}
              />
              <h1 className="text-lg font-medium">
                {courseData?.price ? (
                  <p className="px-5 py-3"> {"price : "+courseData.price}</p>
                ) : (
                  <p className="text-green-500 px-5 py-3">Free</p>
                )}
              </h1>

              <div className="w-full px-3 flex gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-rose-400 to-red-500 h-10 w-full rounded-md text-md font-semibold text-white"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </button>
                <div className="h-10 border-[1px] border-black w-[50px] rounded-md flex justify-center py-2 cursor-pointer">
                  <FaRegHeart size={20} />
                </div>
              </div>
              <div className="w-full px-3 py-5">
                <h1 className="font-medium py-2">This course includes</h1>
                <p className="text-sm text-gray-400">
                  {totalSections} sections
                </p>
                <p className="text-sm text-gray-400">{totalVideos} videos</p>
              </div>
            </section>
          </div>
        </div>
    
        {/* <section className="w-full mx-auto px-4 pb-10">
          <h1 className="text-lg font-bold mb-4">About the Tutor</h1>
          <div className="border border-gray-300 rounded-md p-6 flex flex-col md:flex-row items-center gap-10 bg-black shadow-sm text-white">
            <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-gray-400">
              <img
                src="https://via.placeholder.com/150" 
                alt={`${courseData?.tutorName} Profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{courseData?.tutorName}</h2>
              <p className="text-gray-300 mt-2">{courseData?.tutorBio}</p>
              <div className="mt-4">
                <h3 className="font-medium text-md mb-1">Education:</h3>
                <p className="text-gray-300">{courseData?.education}</p>
                {courseData?.certifications &&
                  courseData.certifications.length > 0 && (
                    <>
                      <h3 className="mt-4 font-medium text-md mb-1">
                        Certifications:
                      </h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {courseData.certifications.map(
                          (certification, index) => (
                            <li key={index}>{certification}</li>
                          )
                        )}
                      </ul>
                    </>
                  )}
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </>
  );
};

export default CourseDetailsPage;
