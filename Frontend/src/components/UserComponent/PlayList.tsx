import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import axios from "axios"; 
import { toast } from "sonner";
import { Base_URL } from "../../credentials";


interface Ivideo {
  _id: string;
  title: string;
  url: string;
  description: string;
}

interface Isection {
  _id: string;
  title: string;
  videos: Ivideo[];
}

interface PlayListProps {
  sections: Isection[] | undefined;
  setActiveVideo: (video: Ivideo) => void;
  thumbnail: string | undefined;
  courseId: string | undefined; 
}

const PlayList: React.FC<PlayListProps> = ({
  sections,
  setActiveVideo,
  thumbnail,
  courseId, 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null); 

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleReportClick = (videoId: string) => {
    setActiveVideoId(videoId);
    setShowReportModal(true);
    setShowSettings(false);
  };

  const handleReportSubmit = async () => {
    try {
      const res = await axios.post(`${Base_URL}/admin/report`, {
        courseId,
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
    <div className="basis-1/3 pl-10 h-full overflow-y-auto relative">
      <div className="flex justify-end">
        <IoSettings className="cursor-pointer" size={20} onClick={toggleSettings} />
        {showSettings && (
          <div className="absolute right-10 top-8 bg-white shadow-md rounded-md">
            <ul className="p-2">
              <li
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleReportClick(activeVideoId!)}
              >
                Report
              </li>
            </ul>
          </div>
        )}
      </div>

      {sections && sections.length > 0 ? (
        sections.map((section) => (
          <div key={section._id}>
            <h4 className="text-lg font-semibold mb-2">{section.title}</h4>

            {section.videos.map((video) => (
              <div
                key={video._id}
                className="flex gap-3 mt-2 cursor-pointer"
                onClick={() => {
                  setActiveVideo(video);
                  setActiveVideoId(video._id); 
                }}
              >
                <img
                  src={thumbnail}
                  className="h-20 w-[150px] rounded-md"
                  alt="thumbnail"
                />
                <div>
                  <h4 className="text-sm mb-1">{video.title}</h4>
                  <p>{section.title}</p>
                  <p>199k views</p>
                </div>
              </div>
            ))}

            <hr className="my-4" />
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}

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

export default PlayList;
