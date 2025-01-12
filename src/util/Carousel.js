import React from "react";

const Carousel = ({ urls }) => {
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
                src={url}
                alt="Tesla Image"
                className="w-full h-full object-cover" // Ensure the image fits
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Carousel;
