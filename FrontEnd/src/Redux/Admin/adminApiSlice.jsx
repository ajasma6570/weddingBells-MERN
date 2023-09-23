import { apiSlice } from "./../apiSlice";

const ADMIN_URL = "/admin";

export const AdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    AdminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = AdminApiSlice;
