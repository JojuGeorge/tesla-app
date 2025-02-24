import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVehicleDetails,
  selectVehicles,
  selectLoading,
  selectError,
} from "../redux/slices/vehicleDetailsSlice";
import VehicleCard from "../components/VehicleCard";
import teslaImage from "../assets/tesla_car.png";
import VehicleShopImgGen from "../util/VehicleShopImgGen";
import { POST_PER_PAGE, vehicleModels } from "../util/Config";
import Pagination from "../components/Pagination";

function Shop() {
  const { vehicle, loading, error } = useSelector((state) => ({
    vehicle: selectVehicles(state).vehicles,
    loading: selectLoading(state),
    error: selectError(state),
  }));
  const dispatch = useDispatch();
  const [urls, setUrls] = useState({}); // Image URL
  const [currentPage, setCurrentPage] = useState(1); // Pagination - current page
  const [postsPerPage, setPostsPerPage] = useState(POST_PER_PAGE); // Pagination - posts per page
  const [currentPost, setCurrentPost] = useState([]); // Contains vechile data for current page based on postsPerPage

  // Calculating the last and first post index for current page
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    dispatch(fetchVehicleDetails());
  }, []);

  useEffect(() => {
    // Get list of vehicles for current page
    if (vehicle?.length) {
      setCurrentPost(vehicle.slice(firstPostIndex, lastPostIndex));
    }
  }, [vehicle, currentPage, firstPostIndex, lastPostIndex]);

  // Generate Image URL from VehicleShopImgGen
  const handleGenerateUrl = (generatedUrls) => {
    setUrls(generatedUrls || {});
  };

  //On Loading show spinner
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  // On Error show error message and try again button
  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => dispatch(fetchVehicleDetails())}
          className="btn btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="mt-20 mx-auto max-w-[1440px] px-4 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicle &&
          currentPost?.map((motoV, index) => (
            <div className="flex justify-center" key={index}>
              <VehicleCard
                key={motoV.id}
                id={motoV.id}
                make={motoV.make}
                model={motoV.model}
                desc={motoV.description}
                year={motoV.year}
                topSpeed={motoV.top_speed}
                range={motoV.range}
                teslaImage={teslaImage}
                drive={motoV.drive}
                imgUrl={urls[vehicleModels[motoV.model]] || { url: teslaImage }}
              />
            </div>
          ))}
      </div>
      {/* Generate Image URL */}
      {<VehicleShopImgGen onGenerateUrl={handleGenerateUrl} />}
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          totalPosts={vehicle?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Shop;
