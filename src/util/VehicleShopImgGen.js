import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { selectVehicles } from "../redux/slices/vehicleDetailsSlice";
import { vehicleModels, commonViews, modelColors } from "./Config";
import PropTypes from "prop-types";
import RenderData from "./RenderData";

function VehicleShopImgGen({ onGenerateUrl }) {
  const { vehicle } = useSelector((state) => ({
    vehicle: selectVehicles(state).vehicles,
  }));

  const previousUrls = useRef({}); // Store previously generated URLs
  const renderData = RenderData();

  // Function to generate URL parameters
  const parameterGen = useCallback((modelCode, view, color) => {
    let mc = "3a1d1c6cdccb462405eee5db90fcbd39";
    if (modelCode === "my") modelCode = mc;
    return `model=${modelCode}&options=${color}&view=${view}&size=1691`;
  }, []);

  // Function to generate the URL object
  const generateUrlObject = useCallback(
    (vehicleData) => {
      if (!vehicleData?.length) return {};

      const urlObj = {};
      vehicleData.forEach((vh) => {
        const modelCode = vehicleModels[vh.model];
        if (!modelCode || !modelColors[modelCode]) return;

        const color = modelColors[modelCode][0] || [];
        // const view = commonViews[0];
        const view = renderData[modelCode]["view_value"][0];
        const site = modelCode === "rd" ? "www" : "static-assets";
        const params = parameterGen(modelCode, view, color);
        const url = `https://${site}.tesla.com/configurator/compositor/?${params}`;

        urlObj[modelCode] = { url: url };
      });
      return urlObj;
    },
    [parameterGen]
  );

  // Effect to update URLs only if they change
  useEffect(() => {
    const urlObj = generateUrlObject(vehicle);

    // Check if the new URL object is different from the previous one
    const hasChanged =
      JSON.stringify(previousUrls.current) !== JSON.stringify(urlObj);

    if (hasChanged && Object.keys(urlObj).length > 0) {
      onGenerateUrl?.(urlObj);
      previousUrls.current = urlObj; // Update the reference to the new URLs
    }
  }, [vehicle, generateUrlObject, onGenerateUrl]);

  return null;
}

VehicleShopImgGen.propTypes = {
  onGenerateUrl: PropTypes.func,
};

export default React.memo(VehicleShopImgGen);
