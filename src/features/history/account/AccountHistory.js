import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext";

import { PageHeader } from "../../../ui/PageHeader";

const AccountHistory = () => {
  const { authData } = useAuthContext();
  console.log("authData", authData);
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
