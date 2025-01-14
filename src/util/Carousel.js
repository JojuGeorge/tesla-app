import React, { useState } from "react";
import teslaImage from "../assets/tesla_car.png";

const Carousel = ({ urls, defaultImage }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className="carousel w-full rounded-box h-[420px]">
      {urls?.map((url, index) => (
        <div
          key={index}
          id={`slide${index}`}
          className="carousel-item relative w-full"
        >
          <img
            src={!imageErrors[index] && url ? url : defaultImage}
            alt={`Tesla Image ${index + 1}`}
            className="w-full h-full object-cover"
            onError={() => handleImageError(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
