import { LIMITS } from "./utils";

/**
 * @function handleFormValidation
 * @param {*} formData
 * @returns message or empty string
 *
 * This func use for the transfer form validation
 */
export const handleFormValidation = (formData) => {
  if (
    formData?.fromSavingsAccountNumber?.length !==
    LIMITS.SAVINGS_ACCOUNT_NUMBER_LENGTH
  ) {
    return "Invalid Savings Account Number";
  }
  if (
    formData?.toMortgageAccountNumber?.length !==
    LIMITS.MORTAGE_ACCOUNT_NUMBER_LENGTH
  ) {
    return "Invalid Mortgage Account Number";
  }
  if (!formData?.mortgageAmount) {
    return "Please enter amount";
  }
  if (formData?.mortgageAmount <= 0) {
    return "Amount must be greater than 0";
  }

  if (formData?.remarks.length === 0) {
    return "Remarks must be filled";
  }
  if (formData?.remarks.length <= LIMITS.REMARKS_MIN_LENGTH) {
    return "Remarks must be more than 10 characters";
  }
  if (formData?.remarks.length >= LIMITS.REMARKS_MAX_LENGTH) {
    return "Remarks cannot exceed 100 characters";
  }

  return "";
};
