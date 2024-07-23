import React from 'react';
import graphics from '../../../assets/userbanner/graphic_design.webp'
import film from '../../../assets/userbanner/film_video.webp'
import fine from '../../../assets/userbanner/fine_art.webp'
import freelance from '../../../assets/userbanner/freelance.webp'
import illustration from '../../../assets/userbanner/illustration.webp'
import marketing from '../../../assets/userbanner/marketing.webp'
import photography from '../../../assets/userbanner/photography.webp'

import '../../../index.css'

const images = [
  graphics,
  film,
  fine,
  freelance,
  illustration,
  marketing,
  photography

]

const Banner: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-full h-64 bg-black mt-10">
      <div className="flex absolute top-0 left-0 animate-scrollLeft whitespace-nowrap">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`image-${index}`}
            className="w-72 h-full object-cover rounded-md "
          />
        ))}
        {images.map((src, index) => (
          <img
            key={index + images.length}
            src={src}
            alt={`image-${index + images.length}`}
            className="w-72 h-full object-cover rounded-md "
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
