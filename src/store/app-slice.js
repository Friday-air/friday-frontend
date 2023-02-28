import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
  name: "app",
  initialState: {
    apps: [],
    connectedApps: [],
    app: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setApps(state, action) {
      console.log("action.payload", action.payload);
      state.apps = action.payload;
    },
    filterApps(state, action) {
      console.log("action.payload", action.payload);
      state.apps = state.apps.filter((app) => app.app_id !== action.payload);
    },
  },
});

export const { setApps, filterApps } = appSlice.actions;

export default appSlice.reducer;
