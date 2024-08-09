import React, { useState } from 'react';
import TutorApplicationPage1 from '../../components/TutorComponent/TutorApplication1';
import TutorApplicationPage2 from './TutorApplication2';
import TutorApplicationPage3 from '../../components/TutorComponent/TutorApplication3';
import ProgressBar from './ProgressBar';

interface FormData {
    tutorRole: string;
    age: string;
    resume: File | null;
    address: string;
    phone: string;
}

const ApplicationParent: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        tutorRole: '',
        age: '',
        resume: null,
        address: '',
        phone: '',
    });

    const nextStep = (data: Partial<FormData>) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <TutorApplicationPage1 nextStep={nextStep} formData={formData} />;
            case 2:
                return (
                    <TutorApplicationPage2
                        nextStep={nextStep}
                        previousStep={previousStep}
                        formData={formData}
                    />
                );
            case 3:
                return <TutorApplicationPage3 previousStep={previousStep} formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md mb-20 pt-10">
                <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Fill your details</h1>
                {renderStep()}
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={3} />
        </>
    );
};

export default ApplicationParent;
