import { apiSlice } from "./api-slice";

const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET /search
    globalSearch: builder.query({
      query: (query) => ({
        url: "/user/global/search",
        method: "GET",
        params: { query },
      }),
    }),
  }),
});

export const { useGlobalSearchQuery } = searchApiSlice;
