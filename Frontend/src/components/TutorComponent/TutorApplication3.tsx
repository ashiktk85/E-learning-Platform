import React from 'react';

interface FormData {
    tutorRole: string;
    age: string;
    address: string;
    phone: string;
}

interface TutorApplicationSubmit {
    previousStep: () => void;
    formData: FormData;
}

const TutorApplicationSubmit: React.FC<TutorApplicationSubmit> = ({ previousStep, formData }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Final form data:', formData);
        // Submit the form data to the server or process it as needed
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Review Your Details</h2>
            <p className="mb-2">Name: {formData.tutorRole}</p>
            <p className="mb-2">Email: {formData.age}</p>
            <p className="mb-2">Address: {formData.address}</p>
            <p className="mb-4">Phone: {formData.phone}</p>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={previousStep}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default TutorApplicationSubmit;
