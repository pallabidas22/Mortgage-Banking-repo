import { useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { ConfigProvider, Flex, Layout, Menu, theme } from "antd";
import { useMenuConfig } from "../hooks/useMenuConfig";

const { Header, Content, Footer, Sider } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();
  const { menuItems, themeTokens } = useMenuConfig();

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
        case "MortgageTransfer":
          navigate("/mortgage-transfer");
          break;
        case "TransferHistory":
          navigate("/transfer/history");
          break;
        case "TransferSuccess":
          navigate("/success-transfer");
          break;
        case "Logout":
          //   LOGOUT
          break;
      }
    },
    [navigate]
  );

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
            style={{ background: themeTokens.colorBgContainer }}
            data-testid="header"
          >
            <Flex justify="space-between">
              <Flex>
                {/* LOGO */}
                <h1
                  className="logo-header-h1"
                  style={{
                    color: themeTokens.colorTextHeading,
                    margin: "8px;",
                  }}
                  data-testid="header-title"
                >
                  UOB Banking - <span>Mortgage</span>
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
                background: themeTokens.colorBgContainer,
                borderRadius: themeTokens.borderRadiusLG,
              }}
              data-testid="content-wrapper"
            >
              <Outlet />
            </div>
          </Content>
          <Footer className="copy-right" data-testid="footer">
            UOB Banking - Mortgage ©{new Date().getFullYear()} Created by UI
            Squad 3
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;
