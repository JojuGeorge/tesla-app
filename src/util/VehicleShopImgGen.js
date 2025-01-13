import React, { useEffect, useCallback, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectVehicles } from "../redux/slices/vehicleDetailsSlice";
import { vehicleModels, modelColors, commonViews } from "./Config";
import PropTypes from "prop-types";

function VehicleShopImgGen({ onGenerateUrl }) {
  const vehicle = useSelector(state => selectVehicles(state).vehicles);
  const previousUrls = useRef({});

  const parameterGen = useCallback((modelCode, view, color) => {
    const modelMap = { my: "3a1d1c6cdccb462405eee5db90fcbd39" };
    const adjustedModelCode = modelMap[modelCode] || modelCode;
    return `model=${adjustedModelCode}&options=${color}&view=${view}&size=1691`;
  }, []);

  const generateUrlObject = useCallback((vehicleData) => {
    if (!vehicleData?.length) return {};

    return vehicleData.reduce((acc, vh) => {
      const modelCode = vehicleModels[vh.model];
      if (!modelCode || !modelColors[modelCode]) return acc;

      const color = modelColors[modelCode][4] || [];
      const view = commonViews[0] || 'STUD_3QTR';
      const site = modelCode === "rd" ? "www" : "static-assets";
      const params = parameterGen(modelCode, view, color);
      
      acc[modelCode] = {
        url: `https://${site}.tesla.com/configurator/compositor/?${params}`
      };
      return acc;
    }, {});
  }, [parameterGen]);

  useEffect(() => {
    if (!vehicle?.length) return;

    const urlObj = generateUrlObject(vehicle);
    const hasChanged = Object.keys(urlObj).some(
      (key) => urlObj[key]?.url !== previousUrls.current[key]?.url
    );

    if (hasChanged) {
      previousUrls.current = urlObj;
      onGenerateUrl?.(urlObj);
    }
  }, [vehicle, generateUrlObject, onGenerateUrl]);

  return null;
}

VehicleShopImgGen.propTypes = {
  onGenerateUrl: PropTypes.func
};

export default React.memo(VehicleShopImgGen);
