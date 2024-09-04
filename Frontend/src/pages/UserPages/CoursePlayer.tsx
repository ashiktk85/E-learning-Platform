import React from 'react';

const CoursePlayer: React.FC = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f5f4] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#111817]">
              <div className="size-4">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-[#111817] text-lg font-bold leading-tight tracking-[-0.015em]">
                Learnly
              </h2>
            </div>
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#5f8c85] flex border-none bg-[#f0f5f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111817] focus:outline-0 focus:ring-0 border-none bg-[#f0f5f4] focus:border-none h-full placeholder:text-[#5f8c85] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                />
              </div>
            </label>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/db0d02e0-65cb-4773-97df-b3ddb8a44b83.png")',
              }}
            ></div>
          </div>
        </header>
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            <div
              className="relative flex items-center justify-center bg-[#111817] bg-cover bg-center aspect-video"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/8e095af3-51a1-4be7-87d8-3e462e123651.png")',
              }}
            >
              <button className="flex shrink-0 items-center justify-center rounded-full size-16 bg-black/40 text-white">
                <div
                  className="text-inherit"
                  data-icon="Play"
                  data-size="24px"
                  data-weight="fill"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                  </svg>
                </div>
              </button>
            </div>
            <h3 className="text-[#111817] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Chapter 1: Introduction to the course
            </h3>
            <div className="flex gap-4 bg-white px-4 py-3">
              <div
                className="text-[#111817] flex items-center justify-center rounded-lg bg-[#f0f5f4] shrink-0 size-12"
                data-icon="Play"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
                </svg>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-[#111817] text-base font-medium leading-normal">
                  Introduction
                </p>
                <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                  Welcome to the course! In this video, you'll learn about the
                  course structure and what you can expect from each lesson.
                  You'll also get an overview of the topics that will be covered
                  in the course.
                </p>
                <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                  Video - 2 mins
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white px-4 py-3 justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="text-[#111817] flex items-center justify-center rounded-lg bg-[#f0f5f4] shrink-0 size-12"
                  data-icon="BookOpen"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h64a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM96,192H32V64H96a24,24,0,0,1,22.45,16.07A56,56,0,0,0,112,136v12.12A39.91,39.91,0,0,0,96,192Zm128,0H160a39.91,39.91,0,0,0-16-43.88V136a56,56,0,0,0-6.45-26A24,24,0,0,1,160,64h64Z"></path>
                  </svg>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-[#111817] text-base font-medium leading-normal">
                    Introduction
                  </p>
                  <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                    Welcome to the course! In this video, you'll learn about the
                    course structure and what you can expect from each lesson.
                    You'll also get an overview of the topics that will be
                    covered in the course.
                  </p>
                  <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                    Video - 2 mins
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 border border-[#e1e6e4] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/4945d62d-8e1d-4c01-b0f8-97a9429e6a5a.png")',
                }}
              >
                <span className="text-[#5f8c85]">✓</span>
              </button>
            </div>
            <div
              className="relative flex items-center justify-center bg-[#111817] bg-cover bg-center aspect-video"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/4fdd97cd-bbdb-4cc6-96b4-9a15390c64c0.png")',
              }}
            >
              <button className="flex shrink-0 items-center justify-center rounded-full size-16 bg-black/40 text-white">
                <div
                  className="text-inherit"
                  data-icon="Play"
                  data-size="24px"
                  data-weight="fill"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                  </svg>
                </div>
              </button>
            </div>
            <h3 className="text-[#111817] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Chapter 2: Understanding Cryptocurrency
            </h3>
            <div className="flex items-start gap-2 px-4 py-3">
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-[#111817] text-base font-medium leading-normal">
                  Introduction
                </p>
                <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                  Welcome to the course! In this video, you'll learn about the
                  course structure and what you can expect from each lesson.
                  You'll also get an overview of the topics that will be covered
                  in the course.
                </p>
                <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                  Video - 2 mins
                </p>
              </div>
            </div>
            <div className="flex gap-2 bg-white px-4 py-3 justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="text-[#111817] flex items-center justify-center rounded-lg bg-[#f0f5f4] shrink-0 size-12"
                  data-icon="Star"
                  data-size="24px"
                  data-weight="fill"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
                  </svg>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-[#111817] text-base font-medium leading-normal">
                    Introduction
                  </p>
                  <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                    Welcome to the course! In this video, you'll learn about the
                    course structure and what you can expect from each lesson.
                    You'll also get an overview of the topics that will be
                    covered in the course.
                  </p>
                  <p className="text-[#5f8c85] text-sm font-normal leading-normal">
                    Video - 2 mins
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 border border-[#e1e6e4] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/4945d62d-8e1d-4c01-b0f8-97a9429e6a5a.png")',
                }}
              >
                <span className="text-[#5f8c85]">✓</span>
              </button>
            </div>
            <div className="flex items-start gap-4 px-4 py-3 justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[#111817] flex items-center justify-center rounded-lg bg-[#f0f5f4] shrink-0 size-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </span>
                <p className="text-[#111817] text-base font-medium leading-normal">
                  4.8 (38 ratings)
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end px-4 py-4">
              <button
                type="button"
                className="rounded-lg bg-[#1f7a8c] px-6 py-2 text-white text-sm font-medium leading-normal"
              >
                Start Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
