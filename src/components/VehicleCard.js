import React from "react";

function VehicleCard({
  make,
  model,
  desc,
  year,
  drive,
  topSpeed,
  range,
  teslaImage,
}) {
  return (
    <div className="card bg-base-100 shadow-xl w-full sm:w-80 md:w-96 lg:w-[700px] mx-auto">
      <figure>
        <img
          src={teslaImage}
          alt="Vehicle"
          className="w-full h-auto object-cover"
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
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
