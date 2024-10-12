import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photographers: [],
  selectedPhotographer: null,
  isFetching: false,
  error: false,
};

const photographerSlice = createSlice({
  name: "photographer",
  initialState,
  reducers: {
    fetchPhotographersStart: (state) => {
      state.isFetching = true;
    },
    fetchPhotographersSuccess: (state, action) => {
      state.isFetching = false;
      state.photographers = action.payload;
    },
    fetchPhotographersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    selectPhotographer: (state, action) => {
      state.selectedPhotographer = action.payload;
    },
  },
});

export const {
  fetchPhotographersStart,
  fetchPhotographersSuccess,
  fetchPhotographersFailure,
  selectPhotographer,
} = photographerSlice.actions;

export const selectAllPhotographers = (state) => state.photographer.photographers;
export const selectSelectedPhotographer = (state) => state.photographer.selectedPhotographer;

export default photographerSlice.reducer;