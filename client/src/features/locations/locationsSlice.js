import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    locations: [],
    activeLocation: "all"
};

export const fetchLocations = createAsyncThunk(
    "locations/fetchLocations", 
    async () => {
        const response = await axios.get("/locations");
        return response.data;
    }
);

export const addLocation = createAsyncThunk(
    "locations/addLocation",
    async (values) => {
        const response = await axios.post("/locations", values);
        return response.data;
    }
);

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        setActiveLocation(state, action) {
            state.activeLocation = action.payload;
        },        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.locations = action.payload;
            })
            .addCase(addLocation.fulfilled, (state, action) => {
                state.locations.push(action.payload);
            })
    }
});

export const selectAllLocations = state => state.locations.locations;

export const selectLocation = (state, id) => state.locations.find(location => location.id === id);

export const { setActiveLocation } = locationsSlice.actions;

export default locationsSlice.reducer;