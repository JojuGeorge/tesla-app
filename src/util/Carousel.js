import React, { useState } from "react";
import teslaImage from "../assets/tesla_car.png";

const Carousel = ({ urls }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <>
      <div className="carousel w-full rounded-box h-[420px]">
        {urls &&
          urls.map((url, index) => (
            <div
              key={index}
              id="slide"
              className="carousel-item relative w-full"
            >
              <img
                src={!imageErrors[index] && url ? url : teslaImage}
                alt={`Tesla Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Carousel;
