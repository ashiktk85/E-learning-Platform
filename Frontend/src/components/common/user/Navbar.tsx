import React from "react";

const UserHeader = () => {
  return (
    <>
      <header className="bg-spotify-black text-white p-4 flex justify-between items-center sticky top-0 z-50 ">
        <div className="text-spotify-green text-lg font-bold">Learn Sphere</div>
        <div className="space-x-4">
          <a href="" className="hover:underline font-poppins font-bold"></a>
          <a href="" className="hover:underline font-poppins font-bold"></a>
          <a href="" className="hover:underline font-poppins font-bold text-sm">About Us</a>
          <a href="" className="hover:underline font-poppins font-bold">Home</a>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
