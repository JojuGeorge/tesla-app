import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectVehicles,
  fetchVehicleDetails,
} from "../redux/slices/vehicleDetailsSlice";
import { colorName } from "../util/Config";
import PaymentModal from "../components/PaymentModal";

function CustomizationPage() {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const dispatch = useDispatch();
  const { vehicles } = useSelector((state) => ({
    vehicles: selectVehicles(state).vehicles,
  }));
  const [price, setPrice] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchVehicleDetails());
  }, [dispatch]);

  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Vehicle not found</p>
      </div>
    );
  }

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant.name);
    setPrice(variant.price);
  };

  // if both variant and color are selected, open the order summary modal
  const handlePayment = () => {
    if (selectedVariant && selectedColor) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col">
          <button
            onClick={() => navigate(`/VehicleDetails/${vehicleId}`)}
            className="btn btn-ghost gap-2 mb-6 self-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Details
          </button>

          <h1 className="text-3xl font-bold mb-8">
            Customize Your {vehicle.make} {vehicle.model}
          </h1>
        </div>

        {/* Variants Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Select Variant</h2>
          <div className="grid gap-4">
            {vehicle.variants?.map((variant) => (
              <div
                key={variant.name}
                className={`p-6 border rounded-lg cursor-pointer transition-all duration-200
                  ${
                    selectedVariant === variant.name
                      ? "border-primary border-2 bg-base-200"
                      : "hover:border-primary border-base-content/20"
                  }`}
                onClick={() => handleVariantSelect(variant)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{variant.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-base-content/80">
                      <p>Range: {variant.range} miles</p>
                      <p>Top Speed: {variant.top_speed} mph</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{variant.price}</p>
                    {selectedVariant === variant.name ? (
                      <span className="inline-flex items-center px-3 py-1 mt-2 text-sm font-medium text-primary">
                        Selected
                      </span>
                    ) : (
                      <button
                        className="btn btn-primary mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVariantSelect(variant);
                        }}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paint Color Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Exterior Paint</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {vehicle.available_colors?.map((color, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors bg-gray-200 
                  ${selectedColor === color ? "border-primary border-2" : ""}`}
                onClick={() => setSelectedColor(color)}
              >
                <div
                  className="w-full h-32 rounded-lg mb-2"
                  style={{ backgroundColor: colorName[color] }}
                ></div>
                <p className="text-center font-semibold">{color}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm md:text-base lg:text-lg font-semibold">
                  Total Price
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold">
                  {price}
                </p>
              </div>
              {selectedColor && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-300 md:mx-6 lg:mx-10"
                    style={{ backgroundColor: colorName[selectedColor] }}
                    title={selectedColor}
                  />
                  <span className="text-xs md:text-sm font-medium">
                    {selectedColor}
                  </span>
                </div>
              )}
            </div>
            {/* Button is enable only after selecting both vehicle variant and color and on clicking it opens up a summary modal */}
            <button
              className="btn btn-primary text-sm md:text-base"
              onClick={handlePayment}
              disabled={!selectedVariant || !selectedColor}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Order summary Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant={selectedVariant}
        color={selectedColor}
        price={price}
        vehicleDetails={vehicle}
      />
    </>
  );
}

export default CustomizationPage;
