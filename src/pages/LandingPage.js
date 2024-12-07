import { useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { ConfigProvider, Flex, Layout, Menu, Popconfirm, theme } from "antd";
import {
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleMenuClick = useCallback(
    (e) => {
      switch (e.key) {
        case "UserProfile":
          navigate("profile");
          break;
        case "AccountSummary":
          navigate("/accounts");
          break;
        case "AccountHistory":
          navigate("/accounts/history");
          break;
        case "Transfer":
          navigate("/transfer");
          break;
        case "TransferHistory":
          navigate("/transfer/history");
          break;
        case "Logout":
          //   LOGOUT
          break;
      }
    },
    [navigate]
  );

  const {
    token: { colorBgContainer, borderRadiusLG, colorTextHeading }, // Extract theme tokens
  } = theme.useToken();

  const menuItems = [
    { key: "UserProfile", icon: <UserOutlined />, label: "Profile" },
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
      key: "Transfer",
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

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      {/* Main layout container */}
      <Layout className="landing-layout" data-testid="landing-layout">
        {/* Sidebar */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" data-testid="sidebar-logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["Restaurants"]}
            items={menuItems}
            onClick={handleMenuClick}
            data-testid="sidebar-menu"
          />
        </Sider>
        {/* Main content area */}
        <Layout>
          <Header
            className="logo-header"
            style={{ background: colorBgContainer }}
            data-testid="header"
          >
            <Flex justify="space-between">
              <Flex>
                {/* LOGO */}
                <h1
                  className="logo-header-h1"
                  style={{ color: colorTextHeading }}
                  data-testid="header-title"
                >
                  UOB Baning - <span>Mortgate</span>
                </h1>
              </Flex>
              {/* USER */}
            </Flex>
          </Header>
          <Content
            className="content-container"
            data-testid="content-container"
          >
            <div
              style={{
                padding: 24,
                height: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              data-testid="content-wrapper"
            >
              <Outlet />
            </div>
          </Content>
          <Footer className="copy-right" data-testid="footer">
            UOB Banking - Mortgate ©{new Date().getFullYear()} Created by UI
            Squad 3
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;
