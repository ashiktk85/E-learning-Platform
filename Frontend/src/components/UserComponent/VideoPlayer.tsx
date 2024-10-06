import React, { useEffect, useState } from "react";
import { defaultProfile } from "../../assets/svgs/icons";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { Base_URL } from "../../credentials";
import { toast } from "sonner";
import axios from "axios";
import dayjs from "dayjs"; // For formatting dates

const socket = io(Base_URL);

interface Ivideo {
  _id: string;
  title: string;
  url: string;
  description: string;
}

interface IRating {
  _id: string;
  userId: string;
  courseId: string;
  ratingValue: number;
  review: string;
  createdAt: string; // Add timestamp for sorting
}

interface VideoPlayerProps {
  video: Ivideo | null;
  tutorName: string | undefined;
  tutorProfile: string | undefined;
  tutorId: string | undefined;
  tags: string[] | undefined;
  description: string | undefined;
  courseId: string | undefined;
  userId: string | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  tutorName,
  tutorId,
  tutorProfile,
  tags,
  userId,
  courseId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>("");
  const [ratings, setRatings] = useState<IRating[]>([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data } = await axios.get(`${Base_URL}/ratings/${courseId}`);
        setRatings(data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();

    socket.on("ratingAdded", (newRating: IRating) => {
      setRatings((prevRatings) => [newRating, ...prevRatings]);
    });

    return () => {
      socket.off("ratingAdded");
    };
  }, [courseId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  
  const handleSubmitReview = () => {
    if (!courseId || !userId || !rating || !review) {
      toast.error("All fields are required");
      return;
    }

    socket.emit("submitRating", {
      courseId,
      userId,
      ratingValue: rating,
      review,
    });

    handleCloseModal();
  };


  const currentUserRating = ratings.find((r) => r.userId === userId);
  const otherRatings = ratings.filter((r) => r.userId !== userId);

  return (
    <div className="basis-8/12">
      <video
        src={video?.url}
        className="w-full rounded-lg"
        controls
        autoPlay
        muted
      ></video>
      <div className="flex justify-between">
        <h3 className="mt-3 font-semibold text-xl">{video?.title}</h3>
        <div className="flex pt-5 gap-4">
          {tags &&
            tags.length > 0 &&
            tags.map((tag, index) => (
              <p className="bg-green-200 px-10 rounded-full text-green-500" key={index}>
                {tag}
              </p>
            ))}
        </div>
      </div>
        

      <div className="py-5">
        <p className="text-sm mb-1 text-gray-500">{video?.description}</p>
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
            <p className="text-green-500 font-semibold text-lg">{tutorName}</p>
            <p className="text-sm text-gray-500">ashiktk85@gmail.com</p>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => navigate(`/tutorDetails/${tutorId}`)}
          >
            View Tutor
          </button>
        </div>
      </div>

      <hr />

      <div className="mx-4 pb-10">
        <h4 className="text-lg text-gray-500 mt-4">Ratings and Reviews</h4>

        <button
          className="bg-gray-100 text-gray-500 px-4 py-2 rounded my-4"
          onClick={handleOpenModal}
        >
          Add Rating & Review
        </button>

       
        {currentUserRating && (
          <div className="bg-blue-100 p-4 mb-4 rounded-lg">
            <div className="flex items-center justify-between">
              <Rating value={currentUserRating.ratingValue} readOnly />
              <p className="text-sm text-gray-500">
                {dayjs(currentUserRating.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
            <p className="text-sm mt-2">{currentUserRating.review}</p>
          </div>
        )}

       
        {otherRatings.map((rating) => (
          <div className="bg-gray-100 p-4 mb-4 rounded-lg" key={rating._id}>
            <div className="flex items-center justify-between">
              <Rating value={rating.ratingValue} readOnly />
              <p className="text-sm text-gray-500">
                {dayjs(rating.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
            <p className="text-sm mt-2">{rating.review}</p>
          </div>
        ))}

        
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-96">
              <h2 className="text-xl font-bold mb-4">Rate & Review</h2>

              {/* Rating */}
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
              </Box>

              {/* Review */}
              <label className="block mb-2">Review:</label>
              <textarea
                value={review}
                onChange={handleReviewChange}
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
