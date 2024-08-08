import React from 'react';
import graphics from '../../../assets/userbanner/graphic_design.webp';
import film from '../../../assets/userbanner/film_video.webp';
import fine from '../../../assets/userbanner/fine_art.webp';
import freelance from '../../../assets/userbanner/freelance.webp';
import illustration from '../../../assets/userbanner/illustration.webp';
import marketing from '../../../assets/userbanner/marketing.webp';
import photography from '../../../assets/userbanner/photography.webp';

import '../../../index.css';

const images = [
  graphics,
  film,
  fine,
  freelance,
  illustration,
  marketing,
  photography,
];

const Banner: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-full h-48 bg-black mt-28 shadow-md">
    <div className="flex absolute top-0 left-0 animate-scrollLeft whitespace-nowrap">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`image-${index}`}
          className="w-36 h-full md:w-48 lg:w-72 object-cover rounded-md mx-1"
        />
      ))}
      {images.map((src, index) => (
        <img
          key={index + images.length}
          src={src}
          alt={`image-${index + images.length}`}
          className="w-36 h-full md:w-48 lg:w-72 object-cover rounded-md mx-1"
        />
      ))}
    </div>
    <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-black via-transparent to-transparent"></div>
    <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-black via-transparent to-transparent"></div>
  </div>
  
  );
};

export default Banner;
