import { apiSlice } from "./api-slice";

const appApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET /user/apps
    getApps: builder.query({
      query: () => "/app/getApps",
    }),
    //GET  /user/connected-apps
    getConnectedApps: builder.query({
      query: () => "/connect/getConnectedUser",
    }),
    //POST /user/apps
    createApp: builder.mutation({
      query: (app) => ({
        url: "/user/apps",
        method: "POST",
        body: { ...app },
      }),
    }),
    //GET /user/apps/:app_id
    getApp: builder.query({
      query: (app_id) => `/connect/getApp/${app_id}`,
    }),
    //POST /user/apps/quickbooks/connection/success
    connectQuickbooksSuccess: builder.mutation({
      query: (app) => ({
        url: "/user/apps/quickbooks/connection/success",
        method: "POST",
        body: { ...app },
      }),
    }),
    //PUT /user/apps/:app_id
    updateApp: builder.mutation({
      query: (app) => ({
        url: `/user/apps/${app.app_id}`,
        method: "PUT",
        body: { ...app },
      }),
    }),
    //DELETE /user/apps/:app_id
    deleteApp: builder.mutation({
      query: (app_id) => ({
        url: `/user/apps/${app_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAppsQuery,
  useGetConnectedAppsQuery,
  useCreateAppMutation,
  useGetAppQuery,
  useUpdateAppMutation,
  useDeleteAppMutation,
  useConnectQuickbooksSuccessMutation,
} = appApiSlice;
