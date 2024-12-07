import { Outlet } from "react-router-dom";

import { PageHeader } from "../../../ui/PageHeader";

const AccountHistory = () => {
  return (
    <div>
      {/* Page header for navigation and title */}
      <PageHeader />

      {/* Main content area */}
      <main>
        {/* Renders nested routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default AccountHistory;
