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
}

const UserTable: React.FC = () => {
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

  if (loading) {
    return (
      <div className="mt-20 col-span-12 w-full">
        <Toaster position="top-center" richColors />
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-400">
                <th className="px-4 py-2 text-left">Profile</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Subscription Status</th>
                <th className="px-4 py-2 text-left">Joined Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 col-span-12 w-full">
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="px-4 py-2 text-left">Profile</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Subscription Status</th>
                <th className="px-4 py-2 text-left">Joined Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center">
                  Error: {error.message}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 col-span-12 w-full">
    <div className="overflow-hidden rounded-lg shadow-md">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-black text-gray-400">
            <th className="px-4 py-2 text-left">Profile</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Subscription Status</th>
            <th className="px-4 py-2 text-left">Joined Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                No user data available
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition duration-200"
              >
                <td className="px-4 py-2">
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">
                  {`${user.firstName} ${user.lastName}`}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.subscriptionStatus}</td>
                <td className="px-4 py-2">{user.createdAt}</td>
                <td className="px-4 py-2">
                  {user.isBlocked ? (
                    <span className="bg-red-300 text-red-800 px-3 py-1 rounded-full">
                      Blocked
                    </span>
                  ) : (
                    <span className="bg-green-300 text-green-800 px-3 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`w-24 px-3 py-1 rounded text-center ${
                      user.isBlocked ? "bg-green-500" : "bg-red-500"
                    } text-white hover:bg-opacity-80 transition duration-200`}
                    onClick={() =>
                      user.isBlocked
                        ? handleUnblockClick(user)
                        : handleBlockClick(user)
                    }
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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

export default UserTable;
