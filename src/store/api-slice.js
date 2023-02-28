import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log("result == ", result);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    // if (refreshResult?.data) {
    //   const user = api.getState().auth.user;
    //   // store the new token
    //   api.dispatch(setCredentials({ ...refreshResult.data, user }));
    //   // retry the original query with new access token
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(logOut());
    // }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  // global configuration for the api
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({}),
});
