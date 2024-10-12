import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getPhotographers: builder.query({
      query: () => 'photographers',
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: 'bookings',
        method: 'POST',
        body: bookingData,
      }),
    }),
    getBookings: builder.query({
      query: () => 'bookings',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetPhotographersQuery,
  useCreateBookingMutation,
  useGetBookingsQuery,
} = api;