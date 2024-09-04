import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        className="w-full text-left p-4 flex items-center justify-between focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className='font-medium'>{title}</span>
        <span
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <FaPlus />
        </span>
      </button>
      <div
        className={`transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
