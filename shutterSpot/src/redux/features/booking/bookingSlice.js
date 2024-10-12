import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  currentBooking: null,
  isFetching: false,
  error: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    createBookingStart: (state) => {
      state.isFetching = true;
    },
    createBookingSuccess: (state, action) => {
      state.isFetching = false;
      state.bookings.push(action.payload);
      state.currentBooking = action.payload;
    },
    createBookingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    fetchBookingsStart: (state) => {
      state.isFetching = true;
    },
    fetchBookingsSuccess: (state, action) => {
      state.isFetching = false;
      state.bookings = action.payload;
    },
    fetchBookingsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  createBookingStart,
  createBookingSuccess,
  createBookingFailure,
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
} = bookingSlice.actions;

export const selectAllBookings = (state) => state.booking.bookings;
export const selectCurrentBooking = (state) => state.booking.currentBooking;

export default bookingSlice.reducer;