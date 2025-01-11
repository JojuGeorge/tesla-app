import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVehicleDetails } from "../redux/slices/vehicleDetailsSlice";

function Shop() {
  const vehicle = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicleDetails());
  }, []);

  return <div>Shop{console.log(vehicle)}</div>;
}

export default Shop;
