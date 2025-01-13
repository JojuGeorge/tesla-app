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
import { vehicleModels } from "../util/Config";
import Pagination from "../components/Pagination";

function Shop() {
  const { vehicle, loading, error } = useSelector((state) => ({
    vehicle: selectVehicles(state).vehicles,
    loading: selectLoading(state),
    error: selectError(state),
  }));
  const dispatch = useDispatch();
  const [urls, setUrls] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [currentPost, setCurrentPost] = useState([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    dispatch(fetchVehicleDetails());
  }, []);

  useEffect(() => {
    if (vehicle?.length) {
      setCurrentPost(vehicle.slice(firstPostIndex, lastPostIndex));
    }
  }, [vehicle, currentPage, firstPostIndex, lastPostIndex]);

  const handleGenerateUrl = (generatedUrls) => {
    setUrls(generatedUrls || {});
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-8">
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
    <div className="mt-20 mx-3 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-10 justify-items-center">
        {vehicle &&
          currentPost?.map((motoV) => (
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
          ))}
      </div>
      {<VehicleShopImgGen onGenerateUrl={handleGenerateUrl} />}
      <Pagination
        totalPosts={vehicle?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Shop;
