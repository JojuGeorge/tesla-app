import vehicleReducer from "./slices/vehicleDetailsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
  },
});

export default store;
