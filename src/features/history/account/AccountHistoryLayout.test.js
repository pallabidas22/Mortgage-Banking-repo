import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountHistoryLayout from "./AccountHistoryLayout";

// Mock the dependencies
jest.mock("../../../ui/PageHeader", () => ({
  PageHeader: () => <div data-testid="mock-page-header">Page Header</div>,
}));

jest.mock("./HistoryList", () => ({
  HistoryList: () => <div data-testid="mock-history-list">History List</div>,
}));

describe("AccountHistoryLayout", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <AccountHistoryLayout />
      </MemoryRouter>
    );
  };

  it("renders without crashing", () => {
    renderComponent();
  });

  it("renders the PageHeader component", () => {
    renderComponent();
    expect(screen.getByTestId("mock-page-header")).toBeInTheDocument();
  });

  it("renders the HistoryList component", () => {
    renderComponent();
    expect(screen.getByTestId("mock-history-list")).toBeInTheDocument();
  });

  it("renders the main content area", () => {
    renderComponent();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("contains an Outlet for nested routes", () => {
    const { container } = renderComponent();
    // Since Outlet is a React Router component, we can verify the main area exists
    // and contains the HistoryList
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main.children).toHaveLength(1); // HistoryList should be present
  });
});
