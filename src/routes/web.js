import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import RequireAuth from "../pages/auth/RequireAuth";
import App from "../App";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/user/Dashboard";
import Apps from "../pages/user/Apps";
import AppsList from "../pages/user/add_app/AppsList";
import AppDetails from "../pages/user/add_app/AppDetails";
import QuickBooksSuccess from "../pages/user/add_app/QuickBooksSuccess";
import Search from "../pages/user/Search";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Register from "../pages/auth/Register";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "user/",
    element: <RequireAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "search",
        element: <Search />,
        errorElement: <ErrorPage />,
      },
      {
        path: "apps",
        element: <Apps />,
        errorElement: <ErrorPage />,
      },
      {
        path: "apps/new-list",
        element: <AppsList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "apps/new-list/:app_id",
        element: <AppDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "apps/quickbooks/success",
        element: <QuickBooksSuccess />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
