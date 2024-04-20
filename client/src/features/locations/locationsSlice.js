import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []

export const fetchLocations = createAsyncThunk(
    "locations/fetchLocations", 
    async () => {
        const response = await axios.get("/locations")
        return response.data
    }
);

export const addLocation = createAsyncThunk(
    "locations/addLocation",
    async (values) => {
        const response = await axios.post("/locations", values)
        return response.data
    }
);

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchLocations.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addLocation.fulfilled, (state, action) => {
                state.push(action.payload)
            })
    }
});

export const selectAllLocations = state => state.locations

export const selectLocation = (state, id) => state.find(location => location.id === id);

export default locationsSlice.reducer;