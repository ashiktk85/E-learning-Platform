import React from "react";
import { useLocation } from "react-router-dom";
import AdminAside from "./AdminAside";

const ApplicantDetails = () => {
  const location = useLocation();
  const { applicationData } = location.state;

  return (
    <div className="grid grid-cols-12  mb-32 font-poppins">
      <AdminAside />
      <div className="col-span-8 p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Application Details
        </h1>
        
        <div className="grid grid-cols-2 gap-4">
         
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Personal Details
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li><strong>Name:</strong> {applicationData.name}</li>
              <li><strong>Email:</strong> {applicationData.email}</li>
              <li><strong>Age:</strong> {applicationData.age}</li>
              <li><strong>Gender:</strong> {applicationData.gender}</li>
              <li><strong>Phone:</strong> {applicationData.phone}</li>
            </ul>
          </section>

          
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Educational Background
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li><strong>Degree:</strong> {applicationData.degree}</li>
              <li><strong>Field of Study:</strong> {applicationData.fieldOfStudy}</li>
              <li><strong>Institution:</strong> {applicationData.institution}</li>
              <li><strong>Graduation Year:</strong> {applicationData.graduationYear}</li>
            </ul>
          </section>
        </div>

       
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Professional Background
          </h3>
          <p className="text-gray-600">{applicationData.teachingExperience}</p>
          <p className="text-gray-600 mt-4">
            <strong>Subjects of Expertise:</strong> {applicationData.subjectsOfExpertise}
          </p>
        </section>

        
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Relevant Documents
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {applicationData.files.map((file: {
              signedUrl: string | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; url: string | undefined; 
}, index: React.Key | null | undefined) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-200"
              >
                <p className="text-gray-600 mb-2">
                  <strong>Type:</strong> {file.type}
                </p>
                <a
                  href={file.signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View Document
                </a>
                <iframe src={file.signedUrl} width="100px" height="100px"></iframe>

              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplicantDetails;
