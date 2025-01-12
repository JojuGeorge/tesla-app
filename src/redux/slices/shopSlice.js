import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  imgUrl: [],
  error: "",
};

export const fetchVehicleShopImages = createAsyncThunk(
  "vehicleImg/fetchVehicleShopImages",
  async () => {
    const response = await axios.get("");
    return response.data;
  }
);

const shopSlice = createSlice({
  name: "vehicleImg",
  initialState,
  extraReducers: (builder) => {
    // Implementation missing
  },
});

export default shopSlice.reducer;
