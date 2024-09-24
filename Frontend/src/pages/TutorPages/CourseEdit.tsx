import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Base_URL } from "../../credentials";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "@nextui-org/react";
import { toast } from "sonner";

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

const CourseEdit: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<IcourseData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openedSection, setOpenedSection] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Ivideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${Base_URL}/getCourse/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const fileInputRef = useRef<HTMLInputElement>(null);
const [selectedFile, setSelectedFile] = useState<File | null>(null);

const handleThumbnailChangeClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click(); 
  }
};

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedFile(file);
  }
};

const handleThumbnailUpload = async () => {
  if (!selectedFile) return;

  

  try {
    const formData = new FormData()
    formData.append("thumbnail", selectedFile)
    formData.append("courseId", courseId as string)
    const response = await axios.post(
      `${Base_URL}/tutor/editThumbnail/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    toast.success("Thumbnail uploaded successfully");
    setCourseData((prevData) => {
      if (!prevData) return null;
    
      return {
        ...prevData,
        thumbnailUrl: response.data.newThumbnailUrl, 
      };
    });
    
  } catch (error) {
    toast.error("Error uploading thumbnail");
  }
};


  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    Category: Yup.string().required("Category is required"),
    language: Yup.string().required("Language is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const toggleSection = (sectionId: string) => {
    setOpenedSection(openedSection === sectionId ? null : sectionId);
  };

  const handleVideoEditClick = (video: Ivideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-h-screen bg-gray-50">
      <nav className="w-full h-20 flex justify-between items-center px-6 bg-white shadow">
        <h1 className="text-3xl font-bold text-green-500">Learn Sphere</h1>
        <div>
          <button className="bg-gradient-to-r from-lime-400 to-lime-500 text-white px-4 py-2 ml-4 rounded-md hover:bg-green-600">
            Back
          </button>
        </div>
      </nav>

      <div className="w-full h-[450px] flex gap-5 px-10">
      <section className="h-full w-1/2 bg-gray-100 py-5 px-12">
          <img
            src={courseData.thumbnailUrl}
            className="object-cover rounded-md h-3/4"
            alt="Course Thumbnail"
          />
          <button
            className="w-20 h-10 bg-green-500 rounded-sm text-white mt-10 font-medium"
            onClick={handleThumbnailChangeClick} // Trigger file input on click
          >
            Change
          </button>

          {/* Hidden file input for selecting the image */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange} // Handle file selection
          />

          {/* Show an upload button if a file is selected */}
          {selectedFile && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleThumbnailUpload}
            >
              Upload
            </button>
          )}
        </section>

        <section className="h-full w-1/2 bg-gray-100 py-5 px-10 border border-black rounded-md">
          <h1 className="font-bold text-xl">Course Details</h1>

          <Formik
            initialValues={{
              name: courseData.name,
              Category: courseData.Category,
              price: courseData.price,
              language: courseData.language,
              description: courseData.description,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios.put(
                  `${Base_URL}/tutor/updateCourse/${courseId}`,
                  {
                    name: values.name,
                    category: values.Category,
                    language: values.language,
                    description: values.description,
                  }
                );

                setCourseData((prevData) => ({
                  ...prevData,
                  ...response.data,
                }));

                toast.success("Course updated");

                setIsEditing(false);
                console.log("Course updated successfully:", response.data);
              } catch (error) {
                console.error("Error updating course:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, isSubmitting, handleChange }) => (
              <Form className="py-3">
                <div className="flex gap-2 mb-5">
                  <div className="w-1/2">
                    <Field
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-3 h-10 outline-none rounded-md bg-white ${
                        !isEditing ? "bg-gray-100" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="w-1/2">
                    <Field
                      type="text"
                      name="Category"
                      value={values.Category}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-3 h-10 outline-none rounded-md bg-white ${
                        !isEditing ? "bg-gray-100" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="Category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mb-5">
                  <div className="w-1/2">
                    <Field
                      type="text"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      disabled={true}
                      className={`w-full px-3 h-10 outline-none rounded-md bg-gray-100`}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="w-1/2">
                    <Field
                      type="text"
                      name="language"
                      value={values.language}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-3 h-10 outline-none rounded-md bg-white ${
                        !isEditing ? "bg-gray-100" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="language"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="h-[180px] mb-5">
                  <Field
                    as="textarea"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full h-full px-3 py-2 outline-none rounded-md bg-white ${
                      !isEditing ? "bg-gray-100" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {isEditing ? (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="bg-gray-300 text-gray-700 px-4 py-2 mr-3 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md float-right"
                  >
                    Edit
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </section>
      </div>

      <div className="w-full px-24 py-5">
        <h2 className="text-xl font-bold">Sections</h2>
        {courseData.sections.map((section) => (
          <div key={section._id} className="mt-4">
            <div
              className="bg-gray-100 p-3 rounded-md h-20 cursor-pointer"
              onClick={() => toggleSection(section._id)}
            >
              <h3 className="font-semibold">{section.title}</h3>
            </div>
            {openedSection === section._id && (
              <div className="ml-4 mt-2">
                {section.videos.length > 0 ? (
                  section.videos.map((video) => (
                    <div
                      key={video._id}
                      className="flex justify-between items-center mt-2"
                    >
                      <span>{video.title}</span>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-md"
                        onClick={() => handleVideoEditClick(video)}
                      >
                        Edit
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No videos in this section.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedVideo && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/2 flex gap-5">
            <div>
              <h2 className="text-xl font-bold mb-4">Edit Video</h2>
              <video
                src={selectedVideo.url}
                controls
                className="w-full h-48 mb-4"
              />
            </div>
            <Formik
              initialValues={{
                title: selectedVideo.title,
                description: selectedVideo.description,
              }}
              onSubmit={(values) => {
                console.log("Updated video data:", values);
                closeModal();
              }}
            >
              <Form>
                <div className="mb-4">
                  <label className="block font-semibold">Video Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Description</label>
                  <Field
                    name="description"
                    as="textarea"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 mr-3 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEdit;
