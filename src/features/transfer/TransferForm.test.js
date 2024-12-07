import { render, screen, userEvent } from "@testing-library/react";
import TransferForm from "./TransferForm";

describe("TransferForm", () => {
  it("renders input fields and submit button", () => {
    render(
      <TransferForm
        savingAccountNum="1234567890"
        mortgageAccountNum="9876543210"
      />
    );

    const savingAccountInput = screen.getByLabelText("Saving Account Number");
    const mortgageAccountInput = screen.getByLabelText(
      "Mortgage Account Number"
    );
    const mortgageAmountInput = screen.getByLabelText("Mortgage Amount");
    const remarksInput = screen.getByLabelText("Remarks");
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    const resetButton = screen.getByRole("button", { name: /Reset/i });

    expect(savingAccountInput).toHaveValue("12345");
    expect(mortgageAccountInput).toHaveValue("67890");
    expect(savingAccountInput).toBeInTheDocument();
    expect(mortgageAccountInput).toBeInTheDocument();
    expect(mortgageAmountInput).toBeInTheDocument();
    expect(remarksInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("disables saving and mortgage account input fields", () => {
    render(
      <TransferForm
        savingAccountNum="1234567890"
        mortgageAccountNum="9876543210"
      />
    );

    const savingAccountInput = screen.getByLabelText("Saving Account Number");
    const mortgageAccountInput = screen.getByLabelText(
      "Mortgage Account Number"
    );

    expect(savingAccountInput).toBeDisabled();
    expect(mortgageAccountInput).toBeDisabled();
  });

  it("updates form values on input change", () => {
    render(
      <TransferForm
        savingAccountNum="1234567890"
        mortgageAccountNum="9876543210"
      />
    );

    const mortgageAmountInput = screen.getByLabelText("Mortgage Amount");
    const remarksInput = screen.getByLabelText("Remarks");

    userEvent.type(mortgageAmountInput, "1000");
    userEvent.type(remarksInput, "Transfer for mortgage");

    expect(mortgageAmountInput).toHaveValue("1000");
    expect(remarksInput).toHaveValue("Transfer for mortgage");
  });

  it("resets form on reset button click", () => {
    render(
      <TransferForm
        savingAccountNum="1234567890"
        mortgageAccountNum="9876543210"
      />
    );

    const mortgageAmountInput = screen.getByLabelText("Mortgage Amount");
    const remarksInput = screen.getByLabelText("Remarks");
    const resetButton = screen.getByRole("button", { name: /Reset/i });

    userEvent.type(mortgageAmountInput, "100");
    userEvent.type(remarksInput, "Test reset Remarks");

    userEvent.click(resetButton);

    expect(mortgageAmountInput).toHaveValue("");
    expect(remarksInput).toHaveValue("");
  });

  it("handles form submission", () => {
    const handleSubmitMock = jest.fn();
    render(
      <TransferForm
        savingAccountNum="1234567890"
        mortgageAccountNum="9876543210"
        onSubmit={handleSubmitMock}
      />
    );

    const mortgageAmountInput = screen.getByLabelText("Mortgage Amount");
    const remarksInput = screen.getByLabelText("Remarks");
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    userEvent.type(mortgageAmountInput, "100");
    userEvent.type(remarksInput, "Test Remarks");

    userEvent.click(submitButton);

    expect(handleSubmitMock).toHaveBeenCalledWith({
      amount: "100",
      remarks: "Test Remarks",
    });
  });
});
