import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./index.css";

const LandingPage = lazy(() => import("./pages/LandingPage"));

const Loading = () => <Spin size="default" fullscreen />;
const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage /> {/* SignIn Component : */}
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage /> {/* SignIn Component : */}
      </Suspense>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
