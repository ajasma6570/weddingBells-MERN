import { apiSlice } from "../apiSlice";

const BUSINESS_URL = "/business";

export const businessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    BusinessSignup: builder.mutation({
      query: (data) => ({
        url: `${BUSINESS_URL}/BusinessSignUp`,
        method: "post",
        body: data,
      }),
    }),
    BusinessLogin: builder.mutation({
      query: (data) => ({
        url: `${BUSINESS_URL}/BusinessLogin`,
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useBusinessSignupMutation, useBusinessLoginMutation } =
  businessApiSlice;
