import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Base_URL } from '../../credentials';
import CourseCard from '../../components/UserComponent/CourseCard';

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get(`${Base_URL}/get-courses`);

      setCourses((prevCourses) => {
        if (JSON.stringify(prevCourses) !== JSON.stringify(response.data)) {
          return response.data;
        }
        return prevCourses;
      });
    } catch (error: any) {
      console.error('Error fetching courses:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    // Uncomment if you need polling
    // const intervalId = setInterval(fetchCourses, pollingInterval);
    // return () => clearInterval(intervalId);
  }, [fetchCourses]);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
              Academic Pro
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                Home
              </a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                Library
              </a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                Bootcamps
              </a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                Events
              </a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                For Business
              </a>
            </div>
            <div className="flex gap-2">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0b6fda] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Create</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log in</span>
              </button>
            </div>
          </div>
        </header>
        <div>
          
        </div>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                All courses
              </p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Explore</span>
              </button>
            </div>
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search for courses, bootcamps, and events"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value=""
                  />
                </div>
              </label>
            </div>
            <div className="grid grid-cols-3 gap-4 px-4 py-3"> {/* Adjust the grid layout */}
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  name={course._doc.name as string}
                  thumbnail={course.thumbnail as string}
                  id={course._doc.courseId}
                  price={course._doc.price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
