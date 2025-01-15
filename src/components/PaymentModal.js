import React from "react";
import { colorName } from "../util/Config";

function PaymentModal({
  isOpen,
  onClose,
  variant,
  color,
  price,
  vehicleDetails,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg max-w-2xl w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
        >
          ✕
        </button>

        {/* Order Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {/* Vehicle Info */}
            <div className="bg-base-200 p-4 rounded-lg">
              <p className=" text-sm mb-2">Vehicle Details</p>
              <p className="font-semibold text-2xl mb-2">
                {vehicleDetails?.make} {vehicleDetails?.model}
              </p>
              <p className="text-base-content/70">{variant}</p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/70">Selected Color</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-base-content/20"
                    style={{ backgroundColor: colorName[color] }}
                    title={color}
                  />
                  <span>{color}</span>
                </div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/70">Price</p>
                <p className="text-xl font-bold">{price}</p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Estimated Delivery</h3>
              <p>Your vehicle will be ready for delivery in 2-3 weeks.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button className="btn btn-primary flex-1" onClick={onClose}>
              Go to Payment Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
