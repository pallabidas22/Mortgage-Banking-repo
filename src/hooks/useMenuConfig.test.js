import { renderHook } from "@testing-library/react-hooks";
import { useMenuConfig } from "./useMenuConfig";
import { theme } from "antd";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("antd", () => ({
  theme: {
    useToken: () => ({
      token: {
        colorBgContainer: "#ffffff",
        borderRadiusLG: 8,
        colorTextHeading: "#000000",
      },
    }),
  },
}));

describe("useMenuConfig", () => {
  it("should return theme tokens and menu items", () => {
    // Act
    const { result } = renderHook(() => useMenuConfig());

    // Assert
    expect(result.current).toEqual({
      themeTokens: {
        colorBgContainer: "#ffffff",
        borderRadiusLG: 8,
        colorTextHeading: "#000000",
      },
      menuItems: expect.arrayContaining([
        expect.objectContaining({
          key: "UserProfile",
          label: "Profile",
        }),
        expect.objectContaining({
          key: "AccountSummary",
          label: "Account Summary",
        }),
        expect.objectContaining({
          key: "AccountHistory",
          label: "Account History",
        }),
        expect.objectContaining({
          key: "Transfer",
          label: "Fund Transfer",
        }),
        expect.objectContaining({
          key: "TransferHistory",
          label: "Transfer History",
        }),
        expect.objectContaining({
          key: "Logout",
        }),
      ]),
    });
  });

  it("should have correct number of menu items", () => {
    // Act
    const { result } = renderHook(() => useMenuConfig());

    // Assert
    expect(result.current.menuItems).toHaveLength(6);
  });

  it("should have Logout as last menu item", () => {
    // Act
    const { result } = renderHook(() => useMenuConfig());

    // Assert
    const lastItem =
      result.current.menuItems[result.current.menuItems.length - 1];
    expect(lastItem.key).toBe("Logout");
  });

  it("should include all required theme tokens", () => {
    // Act
    const { result } = renderHook(() => useMenuConfig());

    // Assert
    expect(result.current.themeTokens).toHaveProperty("colorBgContainer");
    expect(result.current.themeTokens).toHaveProperty("borderRadiusLG");
    expect(result.current.themeTokens).toHaveProperty("colorTextHeading");
  });
});
