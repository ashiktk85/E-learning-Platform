import React from 'react';
import blog from '../../assets/userbanner/blog-3_1296x.webp';
import overlayImage1 from '../../assets/userbanner/Web_Photo_Editor.jpg';
import overlayImage2 from '../../assets/userbanner/Web_Photo_Editor.jpg'; 
import { useNavigate } from 'react-router-dom';
import photography from '../../assets/userbanner/photography.webp'



const HeroSection = () => {

  const navigate = useNavigate()

  const goToCommunity = () => {
    navigate('/community')
  }
  return (
    <section className="relative flex h-screen items-center justify-center bg-[#f5f5f7] px-4">
      <div className="grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* <Reveal > */}
        <div className="flex flex-col justify-center text-center md:text-left gap-8">
          <h1 className="text-5xl font-extrabold text-[#7BC74D] md:text-6xl">
            Empower Your Learning Journey
          </h1>
          <p className=" text-lg text-[#393E46] md:text-xl">
            Access hundreds of courses and learn at your own pace. Start your journey with us today!
          </p>
          <div className=" flex justify-center gap-4 md:justify-start">
            <button className="rounded-full h-11 bg-[#17171a] px-6 py-2 text-white shadow-lg   focus:outline-none focus:ring-4 focus:ring-blue-300">
              Get Started
            </button>
            <button className="rounded-full border h-11 bg-[#EEEEEE] border-black px-6 py-2 text-gray-800   focus:outline-none focus:ring-4 focus:ring-gray-200 cursor-pointer
            text-center
            "
            onClick={goToCommunity}>
              Community
            </button>
          </div>
        </div>
        {/* </Reveal> */}

        {/* <Reveal > */}
        <div className="relative flex items-center justify-center ">
          
          <div className="relative w-[550px] h-[450px] transition-transform duration-500 transform hover:scale-110 hover:translate-y-[-10px] z-10">
            <img
              src={blog}
              alt="E-Learning Illustration"
              className="w-full h-full object-cover rounded-xl shadow-lg" 
            />
            <div className="absolute bottom-4 left-4 bg-white/75 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
              <p className="text-sm font-semibold text-[#17171a]">Explore Our Courses</p>
            </div>
          </div>

          
          <div className="relative w-[550px] h-[450px] ml-[-50px] transition-transform duration-500 transform hover:scale-110 hover:translate-y-[-20px] z-20">
            <img
              src={photography}
              alt="Overlay Image 1"
              className="w-full h-full object-cover rounded-xl shadow-xl" 
            />
            <div className="absolute bottom-4 left-4 bg-white/75 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
              <p className="text-sm font-semibold text-[#17171a]"
              onClick={() => navigate('/tutors')}
              >Meet Our Tutors</p>
            </div>
          </div>

          
          <div className="relative w-[550px] h-[450px] ml-[-50px] transition-transform duration-500 transform hover:scale-110 hover:translate-y-[-30px] z-30">
            <img
              src={overlayImage2}
              alt="Overlay Image 2"
              className="w-full h-full object-cover rounded-xl shadow-xl" 
            />
            <div className="absolute bottom-4 left-4 bg-white/75 backdrop-blur-sm px-3 py-2 rounded-md shadow-md cursor-pointer">
              <p className="text-sm font-semibold text-[#17171a] "
          
              >Join Our Community</p>
            </div>
          </div>
        </div>
        {/* </Reveal> */}
      </div>
    </section>
  );
};

export default HeroSection;

// import freelance from '../../assets/userbanner/freelance.webp'
// import fineart from '../../assets/userbanner/fine_art.webp'
// import graphicDesign from '../../assets/userbanner/graphic_design.webp'
// import illustration from '../../assets/userbanner/illustration.webp'
// import marketing from '../../assets/userbanner/marketing.webp'
// import productivity from '../../assets/userbanner/productivity.webp'

// import { useNavigate } from 'react-router-dom'

// export default function Example() {

//   const navigate = useNavigate()
//   return (
//     <div className="relative overflow-hidden bg-white mt-20">
//       <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
//         <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
//           <div className="sm:max-w-lg">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//             Empower Your Learning Journey
//             </h1>
//             <p className="mt-4 text-xl text-gray-500">
//             Access hundreds of courses and learn at your own pace. Start your journey with us today!
//             </p>
//           </div>
//           <div>
//             <div className="mt-10">
//               {/* Decorative image grid */}
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
//               >
//                 <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
//                   <div className="flex items-center space-x-6 lg:space-x-8">
//                     <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
//                         <img
//                           alt=""
//                           src={illustration}
//                           className="h-full w-full object-cover object-center"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src={freelance}
//                           className="h-full w-full object-cover object-center"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src={photography}
//                           className="h-full w-full object-cover object-center"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src={fineart}
//                           className="h-full w-full object-cover object-center"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src={graphicDesign}
//                           className="h-full w-full object-cover object-center"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src={productivity}
//                           className="h-full w-full object-cover object-center"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src={marketing}
//                           className="h-full w-full object-cover object-center"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <a
//                     onClick={() => navigate('/community')}
//                 className="inline-block rounded-md border border-transparent bg-green-500 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
//               >

//               Community
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
