import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectVehicles } from "../redux/slices/vehicleDetailsSlice";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { vehicles } = useSelector((state) => ({
    vehicles: selectVehicles(state).vehicles,
  }));

  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // On entering search term, filter vehicles
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredVehicles([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = vehicles.filter((vehicle) => {
      const searchValue = value.toLowerCase();
      return (
        vehicle.make.toLowerCase().includes(searchValue) ||
        vehicle.model.toLowerCase().includes(searchValue) ||
        vehicle.year.toString().includes(searchValue) ||
        vehicle.description.toLowerCase().includes(searchValue)
      );
    });

    setFilteredVehicles(filtered);
    setShowSuggestions(true);
  };

  // On suggestion click, navigate to vehicle details page
  const handleSuggestionClick = (vehicleId) => {
    setSearchTerm("");
    setShowSuggestions(false);

    if (location.pathname.includes("/vehicleDetails")) {
      navigate("/", { replace: true });
      setTimeout(() => {
        navigate(`/vehicleDetails/${vehicleId}`);
      }, 0);
    } else {
      navigate(`/vehicleDetails/${vehicleId}`);
    }
  };

  return (
    <div className="form-control mx-8 relative" ref={searchRef}>
      <input
        type="text"
        placeholder="Search vehicles..."
        className="input input-bordered w-24 md:w-auto"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Suggestions dropdown */}
      {showSuggestions && filteredVehicles.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-base-100 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="p-2 hover:bg-base-200 cursor-pointer"
              onClick={() => handleSuggestionClick(vehicle.id)}
            >
              <div className="font-medium">
                {vehicle.make} {vehicle.model}
              </div>
              <div className="text-sm text-gray-500">
                {vehicle.year} - {vehicle.description.substring(0, 50)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
