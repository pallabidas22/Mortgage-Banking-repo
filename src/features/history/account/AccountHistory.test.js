import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountHistory from "./AccountHistory";

// Mock the PageHeader component
jest.mock("../../../ui/PageHeader", () => ({
  PageHeader: () => <div data-testid="mock-page-header">Page Header</div>,
}));

describe("AccountHistory", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <AccountHistory />
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

  it("renders the main content area", () => {
    renderComponent();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("contains an Outlet for nested routes", () => {
    const { container } = renderComponent();
    // Since Outlet is a React Router component, we can verify the main area exists
    // and is empty (when no child routes are rendered)
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main.children).toHaveLength(0);
  });
});
