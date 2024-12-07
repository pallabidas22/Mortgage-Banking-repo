import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import './index.css';
const TransferHistory = lazy(() => import('./pages/TransferHistory'));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AccountList = lazy(() => import("./features/accounts/AccountList/AccountList"));
const AccountDetail = lazy(() => import("./features/accounts/AccountDetail/AccountDetail"));

const Loading = () => <Spin size="default" fullscreen />;
const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage /> {/* SignIn Component : */}
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
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage /> {/* SignIn Component : */}
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
    path: "/accounts",
    element: (
      <Suspense fallback={<Loading />}>
        <AccountList /> {/* AccountList Component : */}
      </Suspense>
    ),
  },
  {
    path: "/accounts/:accountNumber",
    element: (
      <Suspense fallback={<Loading />}>
        <AccountDetail /> {/* AccountDetail Component : */}
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage />  {/* SignIn Component : */}
      </Suspense>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
