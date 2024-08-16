import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminAside from "./AdminAside";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import axios from "axios";
const url = 'http://localhost:7000';

const ApplicantDetails = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmationModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { applicationData } = location.state;
  console.log(applicationData);
  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const openModal = (fileUrl: string) => {
    setSelectedFile(fileUrl);
    setIsModalOpen(true);
  };

  const openConfirmationModal = () => {
    setConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModal(false);
  };

  const acceptApplication = async () => {
        try {
          alert("dd")
          const applicationId = applicationData.applicationId;
          const response = axios.post(`${url}/admin/acceptapplication/${applicationId}`)
        } catch (error : any) {
          console.log(error);
          
        }
  }

  return (
    <div className="grid grid-cols-12 mb-32 font-poppins">
      <AdminAside />
      <div className="col-span-8 p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Application Details
        </h1>

        {/* Personal Details */}
        <div className="grid grid-cols-2 gap-4">
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Personal Details
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Name:</strong> {applicationData.name}
              </li>
              <li>
                <strong>Email:</strong> {applicationData.email}
              </li>
              <li>
                <strong>Age:</strong> {applicationData.age}
              </li>
              <li>
                <strong>Gender:</strong> {applicationData.gender}
              </li>
              <li>
                <strong>Phone:</strong> {applicationData.phone}
              </li>
            </ul>
          </section>

          {/* Educational Background */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Educational Background
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Degree:</strong> {applicationData.degree}
              </li>
              <li>
                <strong>Field of Study:</strong> {applicationData.fieldOfStudy}
              </li>
              <li>
                <strong>Institution:</strong> {applicationData.institution}
              </li>
              <li>
                <strong>Graduation Year:</strong>{" "}
                {applicationData.graduationYear}
              </li>
            </ul>
          </section>
        </div>

        {/* Professional Background */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Professional Background
          </h3>
          <p className="text-gray-600">{applicationData.teachingExperience}</p>
          <p className="text-gray-600 mt-4">
            <strong>Subjects of Expertise:</strong>{" "}
            {applicationData.subjectsOfExpertise}
          </p>
        </section>

        {/* Relevant Documents */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Relevant Documents
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {applicationData.files.map((file: { type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; signedUrl: string | undefined; }, index: React.Key | null | undefined) => (
              <Card key={index} className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">
                    {file.type} Document
                  </h4>
                  <Button onClick={() => openModal(file.signedUrl as any)} className="mt-2">
                    View
                  </Button>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <iframe
                    className="object-cover rounded-xl"
                    src={file.signedUrl}
                    width="200"
                    height="150"
                    title="Embedded Content"
                  >
                    Your browser does not support iframes.
                  </iframe>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button
            className="h-12 w-24 bg-green-500 mt-10 rounded-md hover:bg-green-700 mr-10 text-white font-semibold"
            onClick={openConfirmationModal}
          >
            Accept
          </button>
          <button className="h-12 w-24 bg-red-500 mt-10 rounded-md hover:bg-red-700 mr-10 text-white font-semibold">
            Reject
          </button>
        </div>
      </div>

      {/* Document Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="xl"
        className="bg-white rounded-lg"
      >
        <ModalContent>
          <ModalBody>
            {selectedFile && (
              <iframe
                className="w-full h-96 rounded-lg"
                src={selectedFile}
                title="Document Preview"
              >
                Your browser does not support iframes.
              </iframe>
            )}
          </ModalBody>
          <Button onClick={closeModal} className="ml-auto mr-6 mb-4">
            Close
          </Button>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal}
        onClose={closeConfirmationModal}
        className="bg-white rounded-lg mb-96 "
        aria-labelledby="confirmation-modal"
      >
        <ModalContent>
          <ModalHeader className="text-center font-bold justify-center">Confirm Action</ModalHeader>
          <ModalBody>
            <p className="text-gray-700">Are you sure you want to accept this application?</p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            
          <button
            className="h-12 w-24 bg-green-500 mt-10 rounded-md hover:bg-green-700 mr-10 text-white font-semibold"
            onClick={acceptApplication}
          >
            Confirm
          </button>

          <button className="h-12 w-24 bg-gray-400 mt-10 rounded-md hover:bg-red-700 mr-10 text-white font-semibold"
        onClick={closeConfirmationModal}
        >
            Close
          </button>


          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ApplicantDetails;
