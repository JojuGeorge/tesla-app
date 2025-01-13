import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectVehicles, fetchVehicleDetails } from "../redux/slices/vehicleDetailsSlice";
import teslaImage from "../assets/tesla_car.png";
import "../styles/css/LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const vehicles = useSelector(state => selectVehicles(state).vehicles);

  useEffect(() => {
    dispatch(fetchVehicleDetails());
  }, [dispatch]);

  // Transform vehicles data to models array
  const models = vehicles.map(vehicle => {
    // Get a random feature title as tagline
    const randomFeature = vehicle.key_features?.[
      Math.floor(Math.random() * (vehicle.key_features?.length || 1))
    ];

    return {
      name: `${vehicle.make} ${vehicle.model}`,
      image: teslaImage,
      tagline: randomFeature?.title || vehicle.description,
    };
  });

  return (
    <div className="snap-y snap-mandatory h-[100dvh] overflow-y-scroll">
      {/* Hero Section */}
      <section className="h-[100dvh] w-full snap-start relative">
        <div className="absolute inset-0">
          <img
            src={teslaImage}
            alt="Tesla Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-between pb-20 pt-32">
          <div className="text-center">
            <h1 className="text-5xl font-medium mb-2">Experience Tesla</h1>
            <p className="text-sm">Schedule a Demo Drive Today</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/shop"
              className="bg-white/80 backdrop-blur-sm text-gray-900 px-20 py-2 rounded hover:bg-white/90 transition"
            >
              Shop Now
            </Link>
            <button className="bg-gray-900/80 backdrop-blur-sm text-white px-20 py-2 rounded hover:bg-gray-900/90 transition">
              Demo Drive
            </button>
          </div>
        </div>
      </section>

      {/* Model Sections */}
      {models.map((model, index) => (
        <section
          key={model.name}
          className="h-[100dvh] w-full snap-start relative"
        >
          <div className="absolute inset-0">
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-between pb-20 pt-32">
            <div className="text-center">
              <h2 className="text-4xl font-medium mb-2">{model.name}</h2>
              <p className="text-sm">{model.tagline}</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="bg-white/80 backdrop-blur-sm text-gray-900 px-12 py-2 rounded hover:bg-white/90 transition"
              >
                Custom Order
              </Link>
              <button className="bg-gray-900/80 backdrop-blur-sm text-white px-12 py-2 rounded hover:bg-gray-900/90 transition">
                View Inventory
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-2 px-4">
          <a href="#" className="text-tesla-gray hover:text-black transition-colors">
            Tesla © 2024
          </a>
          <a href="#" className="text-tesla-gray hover:text-black transition-colors">
            Privacy & Legal
          </a>
          <a href="#" className="text-tesla-gray hover:text-black transition-colors">
            Vehicle Recalls
          </a>
          <a href="#" className="text-tesla-gray hover:text-black transition-colors">
            Contact
          </a>
          <a href="#" className="text-tesla-gray hover:text-black transition-colors">
            News
          </a>
          <a href="#" className="text-tesla-gray hover:text-black transition-colors">
            Get Updates
          </a>
          <a href="#" className="text-tesla-gray hover:text-black transition-colors">
            Locations
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
