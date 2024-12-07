import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./index.css";
import AccountHistory from "./features/history/account/AccountHistory";
const AccountList = lazy(() => import("./features/accounts/AccountList/AccountList"));
const AccountDetail = lazy(() => import("./features/accounts/AccountDetail/AccountDetail"));

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
    path: "/accounts/:accountNumber",
    element: (
      <Suspense fallback={<Loading />}>
        <AccountDetail /> {/* AccountDetail Component : */}
      </Suspense>
    ),
  },
  {
    path: "/accounts",
    element: (
      <Suspense fallback={<Loading />}>
        <AccountList />
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
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
