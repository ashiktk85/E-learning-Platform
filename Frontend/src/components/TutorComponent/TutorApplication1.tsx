import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormData {
    tutorRole: string;
    age: string;
    resume: File | null;
}

interface TutorApplicationPage1Props {
    nextStep: (data: Partial<FormData>) => void;
    formData: FormData;
}

const validationSchema = Yup.object({
    tutorRole: Yup.string().required('Tutor role is required'),
    age: Yup.string().required('Age is required'),
    resume: Yup.mixed().required('Resume is required'),
});

const TutorApplicationPage1: React.FC<TutorApplicationPage1Props> = ({ nextStep, formData }) => {
    const [resumePreviewUrl, setResumePreviewUrl] = React.useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const handleResumeUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setResumePreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    nextStep(values);
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Tutor Role</label>
                            <Field
                                type="text"
                                name="tutorRole"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <ErrorMessage name="tutorRole" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <Field
                                type="text"
                                name="age"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Resume</label>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files?.[0];
                                        setFieldValue('resume', file);
                                        if (file) handleResumeUpload(file);
                                    }}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="resume"
                                    className="bg-green-100 text-green-800 py-2 px-4 rounded-md cursor-pointer hover:bg-green-200 transition duration-300"
                                >
                                    Choose File
                                </label>
                                <span className="ml-2">{formData.resume?.name || 'No file chosen'}</span>
                                {resumePreviewUrl && (
                                    <button
                                        type="button"
                                        onClick={openModal}
                                        className="ml-4 text-green-600 underline hover:text-green-800 transition duration-300"
                                    >
                                        View Resume
                                    </button>
                                )}
                            </div>
                            <ErrorMessage name="resume" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                        >
                            Next
                        </button>
                    </Form>
                )}
            </Formik>

            {isModalOpen && resumePreviewUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative bg-white  rounded-md w-11/12 max-w-4xl h-5/6">
                        <button
                            className="absolute top-2 right-2 text-white hover:text-gray-900"
                            onClick={closeModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <iframe
                            src={resumePreviewUrl}
                            title="Resume Full View"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default TutorApplicationPage1;
