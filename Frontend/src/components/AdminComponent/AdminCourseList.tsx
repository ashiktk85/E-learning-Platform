import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from '../../credentials';
import { FaEye } from "react-icons/fa";

interface Icourse {
    price: string | number;
    thumbnail: string | undefined;
    name : string;
    tutorName : string;
    email : string;
    coursePrice : number;
    status : boolean;
    courseId : string;
    createdAt : string;
}

const AdminCourseList = () => {

    const navigate = useNavigate()

    const [courses , setCourses] = useState<Icourse[]>([])

  useEffect(() => {
    const fetchCourse = async () => {
        try {
            const response = await axios.get(`${Base_URL}/admin/getcourses`)
            setCourses(response.data)
            console.log(response.data);
            
        } catch (error) {
            
        }
    }

    fetchCourse()
  },[])
    return (
       
       <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sans">
            <div className="layout-container flex h-full grow flex-col">
            <div className="px-2 pt-10 pb-5">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#637588] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                    </svg>
                  </div>
                  <input
                    placeholder="Search by username, email, role"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637588] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  />
                </div>
                </label>
            </div>
            <div className="px-4 py-3">
            <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white">
            <table className="flex-1">
            <thead>
                    <tr className="bg-white">
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        Course
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        Status
                      </th>

                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        View
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {courses.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-gray-500"
                        >
                          No reports...
                        </td>
                      </tr>
                    ) : (
                        courses.map((course, index) => (
                        <tr key={index} className="border-t border-[#dce0e5]">
                            <td className="pl-4 py-3 text-[#111418] text-sm">
                            <img src={course?.thumbnail} 
                            className='w-16 h-10 object-cover rounded-sm'
                            alt="" />
                          </td>
                          <td className="pl-4 py-3 text-[#111418] text-sm">
                            {course.email}
                          </td>
                          <td className="px-4 py-3 text-[#111418] text-sm">
                            {course.name}
                          </td>
                          <td className="px-4 py-3 text-[#111418] text-sm">
                            {course.price}
                          </td>
                         
                       
                          <td className="px-4 py-3 text-[#111418] text-sm">
                            {new Date(course.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-[#111418] text-sm">
                            {course.status ? (
                              <p className="text-orange-400 font-bold">
                                Blocked
                              </p>
                            ) : (
                              <p className="text-green-500 font-bold">
                                Active
                              </p>
                            )}
                          </td>
                          <td className="pr-12 text-[#111418] text-sm text-right">
                            <button className="  w-12 rounded-sm"
                            onClick={() => navigate(`/admin/CourseDetail/${course.courseId}`)}
                            >
                              <FaEye size={22}/>
                            </button>
                          </td>
                          <td className="pr-12 text-[#111418] text-sm text-right">
                            <button className="bg-black text-white w-12 rounded-sm"
                            onClick={() => navigate(`/admin/CourseDetail/${course.courseId}`)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

            </table>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AdminCourseList;
