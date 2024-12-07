import { Outlet } from "react-router-dom";

import { PageHeader } from "../../ui/PageHeader";
import AccountList from "./AccountList/AccountList";

const AccountHistoryLayout = () => {
    return (
        <div>
            {/* Page header for navigation and title */}
            <PageHeader />

            {/* Main content area */}
            <main>
                {/* Renders nested routes */}
                <Outlet />
                <AccountList />
            </main>
        </div>
    );
};

export default AccountHistoryLayout;
