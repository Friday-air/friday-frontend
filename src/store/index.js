import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api-slice";
import authReducer from "./auth-slice";
import appReducer from "./app-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
