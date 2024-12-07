import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./index.css";
import AccountHistory from "./features/history/account/AccountHistory";

import "./index.css";
import TransferForm from "./features/transfer/TransferForm";
import SuccessTransfer from "./features/transfer/SuccessTransfer";
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
    path: "/transfer-history",
    element: (
      <Suspense fallback={<Loading />}>
        <TransferHistory />
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
        <TransferForm />
      </Suspense>
    ),
  },
  {
    path: "/success-transfer",
    element: (
      <Suspense fallback={<Loading />}>
        <SuccessTransfer />
      </Suspense>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
