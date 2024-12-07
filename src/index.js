import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./index.css";
import AccountHistoryLayout from "./features/history/account/AccountHistoryLayout";
import { AuthProvider } from "./contexts/authContext";

import "./index.css";
import TransferForm from "./features/transfer/TransferForm";
import SuccessTransfer from "./features/transfer/SuccessTransfer";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./features/login/signIn"));
const TransferHistory = lazy(() => import("./features/history/transfer/TransferHistory"));

const Loading = () => <Spin size="default" fullscreen />;
const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Login /> {/* SignIn Component : */}
      </Suspense>
    ),
  },
  {
    path: "/login",
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
        path: "history",
        element: (
          <Suspense fallback={<Loading />}>
            <AccountHistoryLayout />
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
  {
    path: "/mortgage-transfer",
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
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </React.StrictMode>
);
