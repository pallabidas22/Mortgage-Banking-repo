import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./index.css";
import AccountHistory from "./features/history/account/AccountHistory";
import { AuthProvider }  from "./contexts/authContext";

import "./index.css";
const TransferHistory = lazy(() => import("./pages/TransferHistory"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./features/login/signIn"));

const Loading = () => <Spin size="default" fullscreen />;
const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login /> {/* SignIn Component : */}
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Login /> {/* SignIn Component : */}
      </Suspense>
    ),
  },
  {
    path: "/accounts",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    ),
    children: [
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>{/* UserProfile  */}</Suspense>
        ),
      },
      {
        path: "history",
        element: (
          <Suspense fallback={<Loading />}>
            <AccountHistory />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/transfer",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    ),
    children: [
      {
        path: "history",
        element: (
          <Suspense fallback={<Loading />}>
            <TransferHistory />
          </Suspense>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </React.StrictMode>
);
