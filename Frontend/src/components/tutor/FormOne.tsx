import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
}

interface StepOneFormProps {
    nextStep: (data: FormData) => void;
    formData: FormData;
}

const StepOneForm: React.FC<StepOneFormProps> = ({ nextStep, formData }) => {
    const [formDetails, setFormDetails] = useState<FormData>({
        name: formData.name || '',
        email: formData.email || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep(formDetails);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formDetails.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formDetails.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
                Next
            </button>
        </form>
    );
};

export default StepOneForm;
