import { apiSlice } from "./api-slice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
      }),
      keepUnusedDataFor: 5,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
