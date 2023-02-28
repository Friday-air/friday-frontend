import { apiSlice } from "./api-slice";

const optionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET /user/apps
    getOptions: builder.query({
      query: () => "/options",
    }),
  }),
});

export const { useGetOptionsQuery } = optionsApiSlice;
