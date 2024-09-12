import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Base_URL } from "../../credentials";
import Navbar from "../../components/UserComponent/Navbar";
import { MdOutlineSettings } from "react-icons/md";
import { toast, Toaster } from "sonner";
import BlockChecker from "../../services/BlockChecker";

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
  _id: string;
  title: string;
  sectionTitle: string;
  videos: Ivideo[];
}

const CoursePlayer: React.FC = () => {
  BlockChecker()
  const { courseId } = useParams<{ courseId: string }>();
  const [courseData, setCourseData] = useState<IcourseData | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Ivideo | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
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
  };

  const getThumbnailUrl = (videoUrl: string) => {
    return new Promise<string>((resolve, reject) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";

      video.addEventListener("loadedmetadata", () => {
        video.currentTime = 1;
      });

      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const thumbnailUrl = canvas.toDataURL("image/png");
        resolve(thumbnailUrl);
      });

      video.addEventListener("error", (error) => {
        reject("Failed to load video");
      });
    });
  };

  useEffect(() => {
    if (courseData) {
      courseData.sections.forEach((section) => {
        section.videos.forEach((video) => {
          if (!thumbnails[video._id]) {
            getThumbnailUrl(video.url)
              .then((url) => {
                setThumbnails((prev) => ({ ...prev, [video._id]: url }));
              })
              .catch((err) =>
                console.error("Error generating thumbnail:", err)
              );
          }
        });
      });
    }
  }, [courseData, thumbnails]);

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
      if(res.data === true) {
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
      <Toaster richColors position="top-center"/>
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
              <h3 className="text-[#111817] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                {currentVideo.title}
              </h3>
            )}

            <div className="flex gap-4 bg-white px-4 py-3 justify-between">
              <div className="flex items-start gap-4">
                <div className="text-[#111817] flex items-center justify-center rounded-lg bg-[#f0f5f4] shrink-0 size-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
                  </svg>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-[#111817] text-base font-medium leading-normal">
                    {currentVideo?.title}
                  </p>
                  <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                    {currentVideo?.description}
                  </p>
                </div>
              </div>
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Report Video</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Reason:
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select a reason</option>
                <option value="Promotes hate">Promotes hate</option>
                <option value="Sexual content">Sexual content</option>
                <option value="Inappropriate">Inappropriate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {reportReason === "Other" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Additional Information:
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="block w-full p-2 border rounded"
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowReportModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
