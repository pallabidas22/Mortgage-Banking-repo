import { render, screen, userEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransferForm from "./TransferForm";

describe("TransferForm", () => {
  it("renders input fields and submit button", () => {
    render(
      <TransferForm savingAccountNum="12345" mortgageAccountNum="67890" />
    );

    const savingAccountInput = screen.getByLabelText("Saving Account Number");
    const mortgageAccountInput = screen.getByLabelText(
      "Mortgage Account Number"
    );
    const amountInput = screen.getByLabelText("Mortgage Amount");
    const remarksInput = screen.getByLabelText("Remarks");
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    expect(savingAccountInput).toHaveValue("12345");
    expect(mortgageAccountInput).toHaveValue("67890");
    expect(amountInput).toBeInTheDocument();
    expect(remarksInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
