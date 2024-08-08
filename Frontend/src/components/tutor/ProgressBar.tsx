import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex justify-between items-center w-full px-16 mt-4 mb-10">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index} className="relative flex-1 flex justify-center items-center">
                    {/* Circle for the step */}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            currentStep > index + 1
                                ? 'border-green-500 bg-green-500 text-white'
                                : currentStep === index + 1
                                ? 'border-green-500 bg-white text-green-500'
                                : 'border-gray-300 bg-white text-gray-300'
                        }`}
                    >
                        {currentStep > index + 1 ? (
                            <FaCheckCircle />
                        ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                        )}
                    </div>
                    {/* Connecting line */}
                    {index < totalSteps - 1 && (
                        <div
                            className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 ${
                                currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            style={{
                                width: 'calc(100% - 2rem)', // Adjust the width to create space for the circles
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
