import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    address: string;
    phone: string;
}

interface StepTwoFormProps {
    nextStep: (data: FormData) => void;
    previousStep: () => void;
    formData: FormData;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({ nextStep, previousStep, formData }) => {
    const [formDetails, setFormDetails] = useState<FormData>({
        address: formData.address || '',
        phone: formData.phone || '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        nextStep(formDetails);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formDetails.address}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={formDetails.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
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
                    Next
                </button>
            </div>
        </form>
    );
};

export default StepTwoForm;
