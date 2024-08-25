import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layouts/layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(Layout as React.ComponentType),
    children: [
      {
        index: true,
        element: React.createElement(Home as React.ComponentType),
      },
      {
        path: "/view",
        async lazy() {
          let { Viewer } = await import("../pages/Viewer");
          return {
            Component: Viewer,
          };
        },
      },
    ],
  },
]);
