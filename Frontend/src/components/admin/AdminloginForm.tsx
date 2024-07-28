import React from "react";
import UserButton from "../common/user/UserButton";

const AdminloginForm = () => {
  return (
    <>
      <div className="flex min-h-screen bg-spotify-white">
        <div>
          <img
            className="min-h-screen"
            src="https://images.pexels.com/photos/3585001/pexels-photo-3585001.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="banner"
          />
        </div>

        <div className=" justify-center items-center min-h-screen bg-spotify-white">
            <h2 className="text-3xl font-extrabold font-poppins ml-72 mt-36"> Admin Login</h2>
          <div className="flex flex-wrap bg-spotify-grey p-8 rounded-md shadow-md w-auto ml-60 mx-auto mt-10 mb-64">
            <div className="w-full md:w-1/2 p-4 mt-5 mb-0">
              <h2 className="text-white text-3xl mb-4 font-semibold"></h2>
              <p className="text-spotify-white font-poppins mb-3">Email</p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-72 p-2 rounded bg-spotify-black text-white"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-spotify-white font-poppins mb-3">Password</p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-72 p-2 rounded bg-spotify-black text-white"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-between items-center mt-10">
                  <UserButton name={"Login"} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminloginForm;
