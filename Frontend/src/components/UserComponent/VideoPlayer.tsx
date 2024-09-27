import React, { useState } from "react";
import { defaultProfile } from "../../assets/svgs/icons";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const videoUrl =
  "https://videos.pexels.com/video-files/9968971/9968971-sd_640_360_25fps.mp4";
const title = "Homemade cooking";

interface Ivideo {
  _id: string;
  title: string;
  url: string;
  description: string;
}

interface VideoPlayerProps {
  video: Ivideo | null;
  tutorName: string | undefined;
  tutorBio: string | undefined;
  tutorProfile : string | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, tutorName, tutorBio , tutorProfile}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0); 
  const [review, setReview] = useState<string>("");

  // Open modal to add rating and review
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle review change
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value); 
  };

  // Submit review
  const handleSubmitReview = () => {
    console.log("Rating:", rating);
    alert(rating)
    console.log("Review:", review);
    setIsModalOpen(false);
    // Perform submission logic here (API call, etc.)
  };

  return (
    <div className="basis-8/12">
      <video
        src={video?.url}
        className="w-full rounded-lg"
        controls
        autoPlay
        muted
      ></video>
      <h3 className="mt-3 font-semibold text-xl">{video?.title}</h3>

      <div className="py-5">
        <p className="text-sm mb-1 text-gray-500">
         {video?.description}
        </p>
      </div>
      <hr className="border-0 h-[1px] bg-[#ccc] my-3" />

      <div className="flex items-center mt-5 pb-10">
        <img
          src={tutorProfile || defaultProfile}
          className="h-24 w-24 rounded-full mr-4 object-cover"
          alt="Tutor Profile"
        />
        <div className="leading-4 w-full flex justify-between px-5">
          <div>
            <p className="text-green-500 font-semibold text-lg">
              {tutorName}
            </p>
            <p className="text-sm text-gray-500">200 followers</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded cursor-pointer">
            View Tutor
          </button>
        </div>
      </div>

      <hr />

      {/* Ratings and Reviews Section */}
      <div className="pl-14 mx-4">
        <h4 className="text-sm text-gray-500 mt-4">Ratings and Reviews</h4>

        {/* Button to open the modal */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded my-4"
          onClick={handleOpenModal}
        >
          Add Rating & Review
        </button>

        {/* Modal for adding rating and review */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-96">
              <h2 className="text-xl font-bold mb-4">Rate & Review</h2>

              {/* Rating */}
             
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating} // Bind rating state
                  onChange={(event, newValue) => {
                    setRating(newValue); // Set the rating
                  }}
                />
              </Box>

              {/* Review */}
              <label className="block mb-2">Review:</label>
              <textarea
                value={review}
                onChange={handleReviewChange} // Handle review change
                className="border rounded p-2 w-full mb-4 outline-none"
                rows={4}
              ></textarea>

              {/* Modal action buttons */}
              <div className="flex justify-end">
                <button
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSubmitReview}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;