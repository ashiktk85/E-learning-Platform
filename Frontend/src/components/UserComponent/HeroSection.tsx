import heroSection_video from "../../assets/heroSection_video.mp4";

const HeroSection = () => {
  return (
    <section className="relative flex h-screen items-center">
      <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
        <video
          src={heroSection_video}
          className="h-full w-full object-cover"
          muted
          autoPlay
          loop
          playsInline
        ></video>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>

      <div className="flex justify-between w-full items-center">
        <div className="relative z-20 flex flex-col justify-center pl-20 pb-20">
          <h1 className="p-4 text-white font-extrabold text-[100px] font-sans">
            LEARN WITH US
          </h1>
          <p className="p-4 text-lg tracking-tighter text-white">
            Get access to 1000+ courses
          </p>
          <button className="p-5 text-white font-bold h-20 w-40 bg-gradient-to-tr from-[#FF896D] to-[#D02020] mt-5 rounded-xl ml-5">
            Browse courses
          </button>
        </div>

        <div className="relative z-20 p-4 pr-40 pt-60 rounded-lg">
          <div className="h-56 w-72 backdrop-blur-2xl flex  flex-col items-center  text-white text-lg font-bold ">
            <h2 className="pt-10">Join the community</h2>
            <p className="text-small font-normal p-5">
              see new blogs articles , 
              chat with tutors.
            </p>
            <button className="w-3/4 h-10 rounded-2xl bg-black mb-6">
              click here
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
