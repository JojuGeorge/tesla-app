import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StorageManager } from '../util/StorageManager';

function VehicleCard({
  id,
  make,
  model,
  desc,
  year,
  drive,
  topSpeed,
  range,
  teslaImage,
  imgUrl,
}) {
  const [imageError, setImageError] = useState(false);
  const [cachedImage, setCachedImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageUrl = imgUrl?.url;
        if (!imageUrl) {
          setImageError(true);
          return;
        }

        // Check if image is cached
        const cachedImageData = localStorage.getItem(`image_${imageUrl}`);
        if (cachedImageData) {
          setCachedImage(cachedImageData);
          return;
        }

        // If not cached, use the fallback image
        setImageError(true);

      } catch (error) {
        console.error('Error loading image:', error);
        setImageError(true);
      }
    };

    loadImage();
  }, [imgUrl]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="card bg-base-100 shadow-2xl w-full sm:w-80 md:w-96 lg:w-[700px] mx-auto my-2">
      <figure>
        <img
          src={!imageError ? (cachedImage || teslaImage) : teslaImage}
          alt={`${make} ${model}`}
          className="w-full h-auto object-cover"
          onError={handleImageError}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{`${make} ${model}`}</h2>
        <p className="text-sm text-gray-600">{desc}</p>

        {/* Vehicle details */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-4 text-sm text-gray-700">
          <p>
            <strong>Year:</strong> {year}
          </p>
          <p>
            <strong>Top Speed:</strong> {topSpeed}
          </p>
          <p>
            <strong>Range:</strong> {range}
          </p>
          <p>
            <strong>Drive:</strong> {drive}
          </p>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          <Link to={`/vehicleDetails/${id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
