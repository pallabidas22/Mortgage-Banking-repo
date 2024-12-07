import { Outlet } from "react-router-dom";

import { PageHeader } from "../../../ui/PageHeader";
import { HistoryList } from "./HistoryList";

const AccountHistoryLayout = () => {
  return (
    <div>
      {/* Page header for navigation and title */}
      <PageHeader />

      {/* Main content area */}
      <main>
        {/* Renders nested routes */}
        <Outlet />
        <HistoryList />
      </main>
    </div>
  );
};

export default AccountHistoryLayout;
