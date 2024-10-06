import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Base_URL } from "../../credentials";
import CourseCard from "../../components/UserComponent/CourseCard";
import Navbar from "../../components/UserComponent/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BlockChecker from "../../services/BlockChecker";
import Footer from "../../components/common/UserCommon/Footer";

interface Category {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AllCourses: React.FC = () => {
  BlockChecker();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const coursesPerPage = 8;
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("All"); // Add sort option state

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get(`${Base_URL}/get-courses`);
      setCourses(response.data.courses);
      setFilteredCourses(response.data.courses);
      setTotalPages(Math.ceil(response.data.courses.length / coursesPerPage));
    } catch (error: any) {
      console.error("Error fetching courses:", error.message);
    }
  }, []);

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
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    let filtered = courses;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(course => course.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sorting logic
    if (sortOption === 'price +') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price -') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Aa-Zz') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'Zz-Aa') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredCourses(filtered);
    setTotalPages(Math.ceil(filtered.length / coursesPerPage));
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, searchQuery, courses, sortOption]); // Add sortOption to dependencies

  const displayedCourses = filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleFilterClick = (option: string) => {
    setSortOption(option); // Set the selected sorting option
    setIsDropdownOpen(false);
    setCurrentPage(1); // Reset to the first page when sorting
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'poppins, "Noto Sans", sans-serif' }}>
      <Navbar />
      <div className="layout-container flex h-full grow flex-row mt-12">
        <div className="w-[200px] h-full py-20 pl-14 bg-white" style={{ boxShadow: "10px 0 15px -3px rgba(0, 0, 0, 0.1), 10px 0 6px -2px rgba(0, 0, 0, 0.05)" }}>
          <h1 className="text-xl font-bold">Category</h1>
          {categories.map((val: Category) => (
            <p
              className={`pt-4 cursor-pointer hover:text-green-500 hover:font-semibold ${selectedCategory === val.name ? "text-green-500 font-semibold" : ""}`}
              key={val._id}
              onClick={() => handleCategoryChange(val.name)}
            >
              {val.name}
            </p>
          ))}
        </div>

        <div className="pl-10 flex flex-1 justify-center py-5 bg-[#fefefe]">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="p-4 mb-6">
              <div
                className="flex min-h-[280px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10"
                style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}
              >
                <div className="flex flex-col gap-2 text-left">
                  <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">Welcome back!</h1>
                  <h2 className="text-white text-sm font-normal leading-normal">Find the courses that best suit your needs</h2>
                </div>
                <label className="flex flex-col min-w-40 h-12 w-full max-w-[480px]">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                    <div className="text-[#647987] flex border border-[#dce1e5] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                    <input
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search for courses, bootcamps, and events"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111517] focus:outline-0 focus:ring-0 border border-[#dce1e5] bg-white focus:border-[#dce1e5] h-full placeholder:text-[#647987] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    />
                    <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#dce1e5] bg-white pr-[7px]">
                      <button
                        onClick={applyFilters}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3f7fff] text-white text-sm font-medium tracking-tight transition duration-200 hover:bg-[#006aff] focus:bg-[#006aff]"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </label>
                <div className="flex items-center">
                 
                </div>
              </div>
              <div className="flex justify-between pt-10">
              <h1 className="text-3xl font-bold text-[#2a2a2a]">All Courses</h1>

              <div className="flex gap-3">
         
              <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  "
                        onClick={toggleDropdown}
                      >
                        Sort By
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={() => handleFilterClick('price +')}>Price: Low to High</p>
                          <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={() => handleFilterClick('price -')}>Price: High to Low</p>
                          <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={() => handleFilterClick('Aa-Zz')}>Alphabetically: A-Z</p>
                          <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={() => handleFilterClick('Zz-Aa')}>Alphabetically: Z-A</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                onClick={() => navigate("/mycourses")}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">My Courses</span>
              </button>

              </div>

          
              </div>

            </div>

            {displayedCourses.length === 0 ? (
              <div className="mt-5 text-lg">No courses available</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedCourses.map(course => (
                   <CourseCard
                   key={course._id}
                   courseName={course.name}
                   thumbnail={course.thumbnail}
                   courseId={course.courseId}
                   price={course.price}
                 />
                ))}
              </div>
            )}
            
            <div className="flex justify-center py-4">
              <button
                onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-black text-white rounded disabled:opacity-50"
              >
                {'<'}
              </button>
              <span className="px-4 py-2">
               {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 bg-black text-white rounded disabled:opacity-50"
              >
               {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCourses;
