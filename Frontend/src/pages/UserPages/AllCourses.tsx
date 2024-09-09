import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Base_URL } from "../../credentials";
import CourseCard from "../../components/UserComponent/CourseCard";
import Navbar from "../../components/UserComponent/Navbar";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();
 



  const fetchCourses = useCallback(async () => {
    try {
      const categoryQuery = selectedCategory === "all" ? "" : `?category=${selectedCategory}`;
      const response = await axios.get(`${Base_URL}/get-courses${categoryQuery}`);
      setCourses(response.data);
    } catch (error: any) {
      console.error("Error fetching courses:", error.message);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${Base_URL}/admin/categories`);
        setCategories([{ _id: "all", name: "All", description: "", isActive: true, createdAt: "", updatedAt: "" }, ...response.data]);
      } catch (error: any) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);


  const handleCategoryChange = (catName: string) => {
    setSelectedCategory(catName);
  };

  useEffect(() => {
    const storedCategory = sessionStorage.getItem("selectedCategory") || "all";
    setSelectedCategory(storedCategory);
  }, []);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'poppins, "Noto Sans", sans-serif' }}
    >
      <Navbar />
      <div className="layout-container flex h-full grow flex-row mt-12">
        <div
          className="w-[200px] h-full py-20 pl-14 bg-white"
          style={{
            boxShadow:
              "10px 0 15px -3px rgba(0, 0, 0, 0.1), 10px 0 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h1 className="text-xl font-bold">Category</h1>
          {categories.map((val: Category) => (
            <p
              className={`pt-4 cursor-pointer hover:text-green-500 hover:font-semibold ${
                selectedCategory === val.name ? "text-green-500 font-semibold" : ""
              }`}
              key={val._id}
              onClick={() => handleCategoryChange(val.name)}
            >
              {val.name}
            </p>
          ))}
        </div>

        <div className="px-10 flex flex-1 justify-center py-5 bg-[#fefefe]">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            <div className="p-4 mb-6">
              <div
                className="flex min-h-[280px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                }}
              >
                <div className="flex flex-col gap-2 text-left">
                  <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                    Welcome back!
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal">
                    Find the courses that best suit your needs
                  </h2>
                </div>
                <label className="flex flex-col min-w-40 h-12 w-full max-w-[480px]">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                    <div className="text-[#647987] flex border border-[#dce1e5] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                    <input
                      placeholder="Search for courses, bootcamps, and events"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111517] focus:outline-0 focus:ring-0 border border-[#dce1e5] bg-white focus:border-[#dce1e5] h-full placeholder:text-[#647987] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    />
                    <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#dce1e5] bg-white pr-[7px]">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1d8cd7] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Search</span>
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] text-2xl font-black leading-tight tracking-[-0.033em] min-w-72">
                All courses
              </p>
              <button
                onClick={() => navigate("/mycourses")}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">My Courses</span>
              </button>
            </div>

            {courses.length === 0 ? (
              <p className="text-center text-xl font-normal py-20">No courses available for this category.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
