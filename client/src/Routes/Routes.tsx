import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePage/Home";
import SearchPage from "../Pages/SearchPage/SearchPage";
import App from "../App";
import CityPage from "../Pages/CityPage/CityPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "../ProtectedRoute";
import EditCityPage from "../Pages/EditCityPage/EditCityPage";
import AdminPage from "../Pages/AdminPage/AdminPage";
import AddCityPage from "../Pages/AddCityPage/AddCityPage";
import CitiesMapPage from "../Pages/MapPage/MapPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "search", element: <SearchPage /> },
      { path: "city/:id", element: <CityPage /> },
      { path: "map", element: <CitiesMapPage /> },
      {
        path: "city/:id/edit",
        element: (
          <ProtectedRoute>
            <EditCityPage />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <LoginPage /> },
      {
        path: "adminpanel",
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "add",
        element: (
          <ProtectedRoute>
            <AddCityPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
