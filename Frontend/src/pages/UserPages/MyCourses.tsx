
import React, { useEffect, useState } from "react";
import Footer from "../../components/common/UserCommon/Footer";
import Navbar from "../../components/UserComponent/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userAxiosInstance from "../../config/axiosInstance/userInstance";
import { Base_URL } from "../../credentials";
import CourseCard from "../../components/UserComponent/CourseCard";
import BlockChecker from "../../services/BlockChecker";

const MyCourses: React.FC = () => {
  BlockChecker()
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [courseData, setCourseData] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await userAxiosInstance.get(
          `${Base_URL}/mycourses/${userInfo?.userId}?type=${filterType}`
        );
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourseData();
  }, [userInfo?.userId, filterType]); 

  const handleFilterChange = (type: string) => {
    setFilterType(type); 
  };

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden font-sans mt-16">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-20 flex flex-1 justify-center py-5 pb-40 ">
            <div className="layout-content-container flex flex-col w-full flex-1">
              <div className="container">
                <div className="p-4">
                  <div
                    className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                    }}
                  >
                    <div className="flex flex-col gap-2 text-left">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                        Welcome back, {userInfo?.firstName}
                      </h1>
                      <h2 className="text-white text-sm font-normal leading-normal">
                        Continue learning with these courses
                      </h2>
                    </div>
                    <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px]">
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
                          placeholder="Search for anything"
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
              </div>
              <h2 className="text-[#111517] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Your courses
              </h2>
              <div className="pb-3">
                <div className="flex border-b border-[#dce1e5] px-4 gap-8">
                  <button
                    className={`flex flex-col items-center justify-center border-b-[3px] ${
                      filterType === "all"
                        ? "border-b-[#111517]"
                        : "border-b-transparent"
                    } text-[#111517] pb-[13px] pt-4`}
                    onClick={() => handleFilterChange("all")}
                    
                  >
                    <p className="text-[#111517] text-sm font-bold leading-normal tracking-[0.015em]">
                      All
                    </p>
                  </button>
                  <button
                    className={`flex flex-col items-center justify-center border-b-[3px] ${
                      filterType === "purchased"
                        ? "border-b-[#111517]"
                        : "border-b-transparent"
                    } text-[#647987] pb-[13px] pt-4`}
                    onClick={() => handleFilterChange("purchased")}
                    
                  >
                    <p className="text-[#647987] text-sm font-bold leading-normal tracking-[0.015em]">
                      Purchased
                    </p>
                  </button>
                  <button
                    className={`flex flex-col items-center justify-center border-b-[3px] ${
                      filterType === "free"
                        ? "border-b-[#111517]"
                        : "border-b-transparent"
                    } text-[#647987] pb-[13px] pt-4`}
                    onClick={() => handleFilterChange("free")}
                    
                  >
                    <p className="text-[#647987] text-sm font-bold leading-normal tracking-[0.015em]">
                      Free
                    </p>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 px-4 py-3">
                {" "}
                {courseData.map((course) => (
                  <CourseCard
                    key={course._id}
                    courseName={course._doc.name as string}
                    thumbnail={course.thumbnail as string}
                    courseId={course._doc.courseId}
                    price={course._doc.price}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCourses;
