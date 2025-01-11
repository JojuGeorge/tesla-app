import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { vehicleDetailsApi } from "../../util/Config";
import axios from "axios";

const initialState = {
  loading: false,
  vehicles: [],
  error: "",
};

export const fetchVehicleDetails = createAsyncThunk(
  "vehicles/fetchVehicleDetails",
  async () => {
    const response = await axios.get(vehicleDetailsApi);
    return response.data.vehicles;
  }
);

const vehicleDetailsSlice = createSlice({
  name: "vehicles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
        state.error = "";
      })
      .addCase(fetchVehicleDetails.rejected, (state, action) => {
        state.loading = false;
        state.vehicles = [];
        state.error = action.error.message;
      });
  },
});

export default vehicleDetailsSlice.reducer;
