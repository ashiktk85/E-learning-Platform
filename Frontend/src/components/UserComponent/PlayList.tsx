import React from 'react';

const thumbnail = "https://images.pexels.com/photos/28451423/pexels-photo-28451423.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load";
const title = "Introduction to cooking";

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
}

const PlayList: React.FC<PlayListProps> = ({ sections, setActiveVideo }) => {
  return (
    <div className="basis-1/3 pl-10 h-full overflow-y-auto">
      {/* Playlist items */}
      {/* The scroll will still be active with a fixed height */}
      
      <div className="flex justify-between mt-2">
        <img
          src={thumbnail}
          className="h-20 w-1/4 rounded-md"
          alt="thumbnail"
        />
        <div className="basis-3/5">
          <h4 className="text-sm mb-1">{title}</h4>
          <p>Course name</p>
          <p>199k views</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <img
          src={thumbnail}
          className="h-20 w-1/4 rounded-md"
          alt="thumbnail"
        />
        <div className="basis-3/5">
          <h4 className="text-sm mb-1">{title}</h4>
          <p>Course name</p>
          <p>199k views</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <img
          src={thumbnail}
          className="h-20 w-1/4 rounded-md"
          alt="thumbnail"
        />
        <div className="basis-3/5">
          <h4 className="text-sm mb-1">{title}</h4>
          <p>Course name</p>
          <p>199k views</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <img
          src={thumbnail}
          className="h-20 w-1/4 rounded-md"
          alt="thumbnail"
        />
        <div className="basis-3/5">
          <h4 className="text-sm mb-1">{title}</h4>
          <p>Course name</p>
          <p>199k views</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <img
          src={thumbnail}
          className="h-20 w-1/4 rounded-md"
          alt="thumbnail"
        />
        <div className="basis-3/5">
          <h4 className="text-sm mb-1">{title}</h4>
          <p>Course name</p>
          <p>199k views</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <img
          src={thumbnail}
          className="h-20 w-1/4 rounded-md"
          alt="thumbnail"
        />
        <div className="basis-3/5">
          <h4 className="text-sm mb-1">{title}</h4>
          <p>Course name</p>
          <p>199k views</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <img
          src={thumbnail}
          className="h-20 w-1/4 rounded-md"
          alt="thumbnail"
        />
        <div className="basis-3/5">
          <h4 className="text-sm mb-1">{title}</h4>
          <p>Course name</p>
          <p>199k views</p>
        </div>
      </div>
      
     
         </div>
  );
};

export default PlayList;
