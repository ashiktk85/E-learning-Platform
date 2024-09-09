
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateUserBlockStatus } from "../../redux/actions/adminActions";

const url = "http://localhost:7000";

interface User {
  isBlocked: boolean;
  createdAt: string;
  profilePic: string;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionStatus: string;
  status: string;
  phone : string;
}


const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"block" | "unblock">("block");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(`${url}/admin/getusers`);
        setUsers(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBlockClick = (user: User) => {
    setSelectedUser(user);
    setModalAction("block");
    setShowModal(true);
  };

  const handleUnblockClick = (user: User) => {
    setSelectedUser(user);
    setModalAction("unblock");
    setShowModal(true);
  };

  const handleConfirmAction = async () => {
    if (selectedUser) {
      try {
        await dispatch(updateUserBlockStatus({ email: selectedUser.email, isBlocked: modalAction === "block" })).unwrap();
        
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === selectedUser.email
              ? { ...user, isBlocked: modalAction === "block" }
              : user
          )
        );
      } catch (error) {
        toast.error("Error updating user status");
      } finally {
        setShowModal(false);
        setSelectedUser(null);
      }
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
           
           
          </div>
         
        </header>
        <div className="px-0 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Users</p>
             
            </div>
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#637588] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      />
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
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">S.No</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">Username</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">Email</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">Joined At</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">Phone</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-bold leading-normal">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user , index) => (
                      <tr key={index} className="border-t border-[#dce0e5]">
                        <td className="px-4 py-3 text-[#111418] text-sm">{index + 1}</td>
                        <td className="px-4 py-3 text-[#111418] text-sm">{user.firstName + " " + user.lastName}</td>
                        <td className="px-4 py-3 text-[#111418] text-sm">{user.email}</td>
                        <td className="px-4 py-3 text-[#111418] text-sm">{user.createdAt}</td>
                        <td className="px-4 py-3 text-[#111418] text-sm">{user.isBlocked ? <p className="text-red-500 font-bold">
                          
                          Blocked</p> : 
                        
                        <p className="text-green-500 font-bold">Unblocked</p>
                        
                        }</td>
                        <td className="px-0 py-3 text-[#111418] text-sm">{user.phone}</td>
                        <td className="pr-12 text-[#111418] text-sm text-right">
                          <button className="bg-black text-white w-12 rounded-sm"
                           onClick={() =>
                                                  user.isBlocked
                                                    ? handleUnblockClick(user)
                                                    : handleBlockClick(user)
                                                }
                          >Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">
            Are you sure you want to {modalAction} this user?
          </h2>
          <p className="text-center mb-6 text-gray-600">
            {modalAction === "block"
              ? "Blocking this user will prevent them from accessing the website and all its features."
              : "Unblocking this user will allow them to access the website and all its features again."}
          </p>
          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-red-500 text-white rounded mr-4 hover:bg-red-600 transition duration-200"
              onClick={handleConfirmAction}
            >
              OK
            </button>
            <button
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default UsersPage;

