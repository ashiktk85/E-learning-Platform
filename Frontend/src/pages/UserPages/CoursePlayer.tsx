import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Base_URL } from "../../credentials";
import Navbar from "../../components/UserComponent/Navbar";
import { MdOutlineSettings } from "react-icons/md";
import { toast, Toaster } from "sonner";
import BlockChecker from "../../services/BlockChecker";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import RatingModal from "../../components/UserComponent/RatingModal";
import ExistRating from "../../components/UserComponent/ExistRating";
import userAxiosInstance from "../../config/axiosInstance/userInstance";
import { user } from "@nextui-org/react";


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

const CoursePlayer: React.FC = () => {
  BlockChecker();
  const { courseId } = useParams<{ courseId: string }>();
  const [courseData, setCourseData] = useState<IcourseData | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Ivideo | null>(null);
  const [currentSection, setCurrentSection] = useState<Isection | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${Base_URL}/getCourse/${courseId}`);
        setCourseData(response.data);

        const savedVideoId = localStorage.getItem(`activeVideo_${courseId}`);
        const initialVideo = savedVideoId
          ? response.data.sections
              .flatMap((section: { videos: any }) => section.videos)
              .find((video: { _id: string }) => video._id === savedVideoId)
          : response.data.sections.length > 0 &&
            response.data.sections[0].videos.length > 0
          ? response.data.sections[0].videos[0]
          : null;

        setCurrentVideo(initialVideo);
        setActiveVideoId(initialVideo?._id || null);
        const currentSection = response.data.sections.find(
          (section: Isection) =>
            section.videos.some((video) => video._id === initialVideo?._id)
        );
        setCurrentSection(currentSection || null);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleVideoClick = (video: Ivideo) => {
    setCurrentVideo(video);
    setActiveVideoId(video._id);
    localStorage.setItem(`activeVideo_${courseId}`, video._id);

    const currentSection = courseData?.sections.find((section) =>
      section.videos.some((v) => v._id === video._id)
    );
    setCurrentSection(currentSection || null);
  };

  const handleReportClick = () => {
    setShowReportModal(true);
    setShowDropdown(false);
  };

  const handleReportSubmit = async () => {
    try {
      const res = await axios.post(`${Base_URL}/admin/report`, {
        courseId,
        videoId: activeVideoId,
        reason: reportReason,
        additionalInfo,
      });
      if (res.data === true) {
        toast.success("Report submitted successfully");
        setShowReportModal(false);
        setReportReason("");
        setAdditionalInfo("");
      }
    } catch (error) {
      toast.error("Failed to submit report");
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <Toaster richColors position="top-center" />
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5 mt-16">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
           
            <div className="relative flex items-center justify-center bg-[#111817] bg-cover bg-center aspect-video rounded-2xl">
              {currentVideo ? (
                <video
                  ref={videoPlayerRef}
                  controls
                  src={currentVideo.url}
                  className="w-full h-full object-cover rounded shadow"
                />
              ) : (
                <p className="text-gray-500">
                  Select a video from the playlist to start watching.
                </p>
              )}
            </div>

            {currentVideo && (
              <div className="bg-white px-4 py-3">
                <h4>Title</h4>
                <h3 className="text-lg font-bold"> {currentVideo.title}</h3>
                <p>Description</p>
                <p className="text-sm text-gray-600">
                  {currentVideo.description}
                </p>
              </div>
            )}

            {currentSection && (
              <div className="mt-4 bg-white px-4 py-3">
                <p>Section</p>
                <h2 className="text-lg font-bold">
                  
                  {currentSection.sectionTitle}
                </h2>
                <p>Description</p>
                <p className="text-sm text-gray-600">
                  {currentSection.description}
                </p>
              </div>
            )}

          
            {/* <div className=" py-10 cursor-pointer"
            onClick={() => setRatingModal(!ratingModal)}
            >
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
               
                
                <Button
                  disabled
                  color="success"
                  variant="outlined"
                  startDecorator={<Add />}
                >
                  Add Rating
                </Button>
              </Box>
            </div> */}
            <div className="flex-col h-20 py-10 ">
            <RatingModal courseId = {courseData?.courseId}/>
            <h1 className="py-5">Your Rating</h1>
            {/* <ExistRating /> */}
            </div>
           

           
          </div>

       
          <div className="h-full w-1/4 pl-5">
            <div className="flex justify-end pr-2 pb-2 relative">
              <MdOutlineSettings
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md w-48">
                  <button
                    onClick={handleReportClick}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Report Video
                  </button>
                </div>
              )}
            </div>
            <div className="rounded-lg h-auto w-full overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {courseData?.sections.map((section) => (
                <div key={section._id} className="mb-6">
                  <h2 className="text-gray-600 text-sm font-semibold mb-2">
                    {section.sectionTitle}
                  </h2>
                  {section.videos.map((video) => (
                    <div
                      key={video._id}
                      className={`flex items-center p-2 mb-2 cursor-pointer rounded-lg ${
                        activeVideoId === video._id
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleVideoClick(video)}
                    >
                      <img
                        src={courseData?.thumbnailUrl}
                        alt="thumbnail"
                        className="w-16 h-10 rounded mr-3 object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {video.title}
                        </span>
                        {/* <p className="text-xs text-gray-600">
                          {video.description}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Report Video</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Reason for report
              </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Additional Information
              </label>
              <textarea
                className="w-full border rounded p-2"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleReportSubmit}
              >
                Submit Report
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default CoursePlayer;
