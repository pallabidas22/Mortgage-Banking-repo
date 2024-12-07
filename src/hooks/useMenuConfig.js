import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Popconfirm, theme } from "antd";
import { useNavigate } from "react-router-dom";

export const useMenuConfig = () => {
  const navigate = useNavigate();

  // Extract theme tokens
  const {
    token: { colorBgContainer, borderRadiusLG, colorTextHeading },
  } = theme.useToken();

  const menuItems = [
    {
      key: "UserProfile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "AccountSummary",
      icon: <ProfileOutlined />,
      label: "Account Summary",
    },
    {
      key: "AccountHistory",
      icon: <ProfileOutlined />,
      label: "Account History",
    },
    {
      key: "MortgageTransfer",
      icon: <ProfileOutlined />,
      label: "Fund Transfer",
    },
    {
      key: "TransferHistory",
      icon: <ProfileOutlined />,
      label: "Transfer History",
    },
    {
      key: "Logout",
      icon: <LogoutOutlined />,
      label: (
        <Popconfirm
          placement="bottom"
          title="Are you sure to logout ?"
          description="Logout"
          okText="Yes"
          cancelText="No"
          onConfirm={() => navigate("/login")}
        >
          Logout
        </Popconfirm>
      ),
    },
  ];

  return {
    themeTokens: {
      colorBgContainer,
      borderRadiusLG,
      colorTextHeading,
    },
    menuItems,
  };
};
