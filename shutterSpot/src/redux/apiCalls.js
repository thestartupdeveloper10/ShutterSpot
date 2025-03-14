import { loginFailure, loginStart, loginSuccess,resetError, registerStart, registerSuccess, registerFailure } from "./features/user/userSlice";
import { publicRequest } from "../service/requestMethods";
import { createBookingStart, createBookingSuccess, createBookingFailure } from "./features/booking/bookingSlice";

export const login = async (dispatch, user) => {
  dispatch(resetError());
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
}

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const createBooking = async (dispatch, bookingData) => {
  dispatch(createBookingStart());
  try {
    const res = await publicRequest.post("/book", bookingData);
    dispatch(createBookingSuccess(res.data));
    
    // Update the user's bookings in the current user state
    dispatch({
      type: "user/updateUserBookings",
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch(createBookingFailure());
    throw err;
  }
};

