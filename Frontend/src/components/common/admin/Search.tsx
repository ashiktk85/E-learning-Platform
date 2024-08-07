import React from 'react';

const Search = () => {
  return (
    <div className="flex  items-center h-9 mt-0 justify-end">
      <input
        type="text"
        name="text"
        className="max-w-xs h-full outline-none text-sm font-medium bg-gray-700 caret-white text-white px-2.5 py-1.5 border-2 border-transparent rounded-l-lg mr-px transition-all duration-200 ease-in-out hover:border-white hover:border-opacity-20 focus:border-purple-500 focus:bg-black"
        placeholder="Search"
      />
      <button className="border-none cursor-pointer bg-gray-900 rounded-r-lg h-full w-7 flex justify-center items-center hover:bg-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
          <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#efeff1"></path>
        </svg>
      </button>
    </div>
  );
}

export default Search;

