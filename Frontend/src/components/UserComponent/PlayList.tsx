import React from "react";


interface Ivideo {
  _id: string;
  title: string;
  url: string;
  description: string;
}

interface Isection {
  _id: string;
  title: string;
  videos: Ivideo[];
}

interface PlayListProps {
  sections: Isection[] | undefined;
  setActiveVideo: (video: Ivideo) => void;
  thumbnail : string | undefined;
}

const PlayList: React.FC<PlayListProps> = ({ sections, setActiveVideo ,thumbnail}) => {
  return (
    <div className="basis-1/3 pl-10 h-full overflow-y-auto">
      {sections && sections.length > 0 ? (
        sections.map((section) => (
          <div key={section._id}>
            {/* Section title */}
            <h4 className="text-lg font-semibold mb-2">{section.title}</h4>

            {section.videos.map((video) => (
              <div
                key={video._id}
                className="flex gap-3 mt-2 cursor-pointer"
                onClick={() => setActiveVideo(video)} // Set the active video when clicked
              >
                <img
                  src={thumbnail}
                  className="h-20 w-[150px] rounded-md"
                  alt="thumbnail"
                />
                <div>
                  <h4 className="text-sm mb-1">{video.title}</h4>
                  <p>{section.title}</p> {/* Show section name */}
                  <p>199k views</p>
                </div>
              </div>
            ))}

            <hr className="my-4" /> {/* Separate each section */}
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default PlayList;
