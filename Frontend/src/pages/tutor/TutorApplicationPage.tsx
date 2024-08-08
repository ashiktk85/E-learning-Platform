import React, { useState } from 'react';
import Footer from '../../components/common/UserCommon/Footer';
import tutorApplicationBanner from '../../assets/userbanner/pexels-babybluecat-6843588.jpg';
import ProgressBar from '../../components/tutor/ProgressBar';
import StepOneForm from '../../components/tutor/FormOne';
import StepTwoForm from '../../components/tutor/FormTwo';
import StepThreeForm from '../../components/tutor/FormThree';

interface FormData {
    name: string;
    email: string;
    address: string;
    phone: string;
}

const TutorApplicationPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const handleNextStep = (newData: Partial<FormData>) => {
        setFormData({ ...formData, ...newData });
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <div
                    className="h-64 bg-cover bg-center m-8 rounded-lg"
                    style={{ backgroundImage: `url(${tutorApplicationBanner})` }}
                ></div>
               <h1 className='text-center mb-10 text-2xl font-bold font-poppins'>Application Form</h1>
                <div className="form-container mx-auto max-w-lg p-4 bg-white shadow-lg rounded-lg mb-20">
                    {currentStep === 1 && (
                        <StepOneForm nextStep={handleNextStep} formData={formData} />
                    )}
                    {currentStep === 2 && (
                        <StepTwoForm
                            nextStep={handleNextStep}
                            previousStep={handlePreviousStep}
                            formData={formData}
                        />
                    )}
                    {currentStep === 3 && (
                        <StepThreeForm
                            previousStep={handlePreviousStep}
                            formData={formData}
                        />
                    )}
                </div>
                <ProgressBar currentStep={currentStep} totalSteps={3} />
            </div>
            <Footer />
        </>
    );
};

export default TutorApplicationPage;
