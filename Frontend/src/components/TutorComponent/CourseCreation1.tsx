import React from "react";

const CourseCreation1 = () => {
  return (
    <div>
      <h2 className="font-bold  mb-2">Basic details</h2>
      <div>
        <form className="bg-[#fafbfe] p-4 rounded-lg shadow-lg w-full mt-10 mb-5 pl-10 pr-10">
          <div className="mb-3 w-1/2">
            <h2 className="pb-1 font-bold">Name of your course</h2>
            <input
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg bg-[#ffffff] p-2 outline-none"
              name="courseName"
            />
          </div>

          <div className="mb-3">
            <h2 className="pb-1 font-bold">Descrpiption.</h2>
            <p className="text-gray-400 text-[12px] pb-1">Max 50 words.</p>
            <textarea
              className="w-full h-16 border border-gray-300 rounded-lg shadow-sm bg-[#ffffff] p-2 outline-none"
              name="bio"
            />
          </div>
          <div className="mb-3">
            <h2 className="pb-1 font-bold">Language</h2>
            <select
              className="w-1/2 h-10 border border-gray-300 rounded-lg bg-[#ffffff] p-2"
              name="language"
            >
              <option value="">Select your language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Mandarin">Mandarin</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

         
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded mr-2 font-semibold"
            >
              Next
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreation1;
