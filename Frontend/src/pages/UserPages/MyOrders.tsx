import React, { useEffect, useState } from "react";
import Footer from "../../components/common/UserCommon/Footer";
import Navbar from "../../components/UserComponent/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userAxiosInstance from "../../config/axiosInstance/userInstance";
import { Base_URL } from "../../credentials";
import CourseCard from "../../components/UserComponent/CourseCard";
import BlockChecker from "../../services/BlockChecker";
import { useNavigate, useParams } from "react-router-dom";

interface IOrders {
    courseName: string;
    Category: string;
    totalAmount: number;
    createdAt: string;
    thumbnail: string | undefined;
    orderId: string;
    courseId: string;

}

const MyOrders: React.FC = () => {
  BlockChecker();
  const {userId} = useParams()
  const navigate = useNavigate( )
  const [orders , setOrders] = useState<IOrders[] | null>(null)
  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const {data} = await userAxiosInstance.get(`/get-orders/${userId}`)
            setOrders(data)
            console.log(data);
            
        } catch (error) {
            
        }
    }

    fetchOrders()
  },[userId])

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden font-sans mt-16">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-10 flex flex-1 justify-center py-5 pb-40 ">
            <div className="layout-content-container flex flex-col w-full flex-1">
              <div className="container">
                <div className="p-4">
                  <div
                    className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                    }}
                  >
                    <div className="flex flex-col gap-2 text-left">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                        Welcome back,
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
              <h2 className="text-[#111517] text-[22px] font-bold leading-tight tracking-[-0.015em] px-16 pb-3 pt-5">
                My orders
              </h2>
              <hr className="py-5 h-[2px]" />
              <div className="pb-3  h-1/2 w-full border border-gray-200 rounded-md px-20 py-5 overflow-y-scroll">
                <table className="min-w-full text-left table-auto ">
                  <thead className="border-b border-gray-400">
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Course </th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Purchased Date</th>
                      <th className="px-4 py-2">View</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                        orders && orders.length > 0 ? 
                            orders.map((order , index) => (
                                <tr className="border-b border-gray-200">
                                <td className="text-sm text-gray-500 px-4 py-10">{order?.orderId}</td>
                                <td className=" px-4 py-5">
                                  <img src={order?.thumbnail} 
                                  className="w-40 h-20 rounded-md"
                                  alt="course img" />
                                  <p>{order?.courseName}</p>
                                  </td>
                                <td className=" px-4 py-10">{order?.Category}</td>
                                <td className=" px-4 py-10">{order?.totalAmount}</td>
                                <td className=" px-4 py-10">{order?.createdAt}</td>
                                <td className=" px-4 py-10">
                                    <button className="w-14 h-8 rounded-md bg-black text-white"
                                    onClick={() => navigate(`/coursePlayer/${order?.courseId}`)}
                                    >
                                        View
                                    </button>

                                </td>
                              </tr>
                            )) : <p>No orders</p>
                    }
                   
               
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
