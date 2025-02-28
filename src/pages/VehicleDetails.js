import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVehicleDetails,
  selectVehicles,
  selectLoading,
  selectError,
} from "../redux/slices/vehicleDetailsSlice";
import { VehicleImgGen } from "../util/VehicleImgGen";
import Carousel from "../util/Carousel";
import { colorName } from "../util/Config";
import { StorageManager } from "../util/StorageManager";

function VehicleDetails() {
  let params = useParams();
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [urls, setUrls] = useState([]);
  const [cachedUrls, setCachedUrls] = useState([]);
  const [selectedColor, setSelectedColor] = useState("white");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const { vehicle, loading, error } = useSelector((state) => ({
    vehicle: selectVehicles(state).vehicles,
    loading: selectLoading(state),
    error: selectError(state),
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchVehicleDetails());
  }, [dispatch]);

  // Cache images
  const cacheImages = async (urlList) => {
    setIsImageLoading(true);
    try {
      const cachedImages = await Promise.all(
        urlList.map(async (url) => {
          const cachedImage = localStorage.getItem(`image_${url}`);
          if (cachedImage) return cachedImage;

          try {
            const response = await fetch(url, {
              method: "GET",
              headers: {
                Accept: "image/*",
              },
              mode: "cors",
              cache: "force-cache",
            });

            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);

            const blob = await response.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64data = reader.result;
                StorageManager.saveImage(`image_${url}`, base64data);
                resolve(base64data);
              };
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.error("Error caching image:", error);
            return url;
          }
        })
      );
      setCachedUrls(cachedImages);
    } finally {
      setIsImageLoading(false);
    }
  };

  // Initial vehicle info loading
  useEffect(() => {
    if (params.vehicleId) {
      const vehicleInfo = vehicle?.find((vh) => vh.id === params.vehicleId);
      if (vehicleInfo) {
        setVehicleDetails(vehicleInfo);
        setSelectedColor(colorName[vehicleInfo.available_colors[0]]); // Set first available color
      }
    }
  }, [params.vehicleId, vehicle]);

  // Image loading effect
  useEffect(() => {
    const loadImages = async () => {
      if (!vehicleDetails?.model) return;

      // Generate image URLs based on different views
      const urlList = VehicleImgGen(
        vehicleDetails.model,
        vehicleDetails.available_colors[0]
      );
      setUrls(urlList);

      // Check cache first
      const cachedImages = urlList.map((url) => {
        const cached = localStorage.getItem(`image_${url}`);
        return cached;
      });

      if (cachedImages.every((img) => img)) {
        // If all images are cached, use them
        setCachedUrls(cachedImages);
      } else {
        // If any image is not cached, fetch and cache all
        await cacheImages(urlList);
      }
    };

    loadImages();
  }, [vehicleDetails]);

  // Paint selection handler
  const handlePaintSelection = async (colorCode, colorName) => {
    setSelectedColor(colorName);
    // Get url based on color for different views
    const urlList = VehicleImgGen(vehicleDetails?.model, colorCode);
    setUrls(urlList);

    // Check cache first
    const cachedImages = urlList.map((url) => {
      const cached = localStorage.getItem(`image_${url}`);
      return cached;
    });

    if (cachedImages.every((img) => img)) {
      // If all images are cached, use them
      setCachedUrls(cachedImages);
    } else {
      // If any image is not cached, fetch and cache all
      await cacheImages(urlList);
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error handling
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
    <div className="my-1 mx-1 py-10">
      <div className="container mx-auto px-4 py-1 mt-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            {isImageLoading && (
              <div className="absolute inset-0 bg-base-100/50 backdrop-blur-sm flex justify-center items-center z-10">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
            <Carousel urls={cachedUrls.length > 0 ? cachedUrls : urls} />

            {/* Color Selector */}
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-sm font-semibold mb-2">Paint Color</h3>
              <div className="flex gap-2">
                {vehicleDetails?.available_colors?.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handlePaintSelection(color, colorName[color]);
                    }}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === colorName[color]
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: colorName[color] }}
                    title={color}
                    disabled={isImageLoading}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">
              {vehicleDetails.make} {vehicleDetails.model}
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-2xl font-bold">
                  {vehicleDetails?.acceleration?.value}
                </p>
                <p className="text-sm text-gray-600">
                  {vehicleDetails?.acceleration?.unit}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-2xl font-bold">{vehicleDetails.range}</p>
                <p className="text-sm text-gray-600">Range</p>
              </div>
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-2xl font-bold">{vehicleDetails.top_speed}</p>
                <p className="text-sm text-gray-600">Top Speed</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="my-10">{vehicleDetails.description}</p>
            </div>

            {/* Variants */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Available Variants</h2>
              {vehicleDetails?.variants?.map((variant) => (
                <div
                  key={variant.name}
                  className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{variant.name}</h3>
                    <p className="font-bold">{variant.price}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                    <p>Range: {variant.range} miles</p>
                    <p>Top Speed: {variant.top_speed} mph</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Go to customization page on button click */}
            <div className="flex gap-4">
              <button
                className="btn btn-primary flex-1"
                onClick={() => navigate(`/customize/${params.vehicleId}`)}
              >
                Build and Price
              </button>
              <button className="btn btn-outline flex-1">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {vehicleDetails?.key_features?.map((feature) => (
              <div key={feature.title} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
