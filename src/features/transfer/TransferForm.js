/**
 *
 * Component : TransferForm
 * Can handle transfer amount from 1 account to another account
 *
 */
import React from "react";
import { Form, Input, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import "../../styles/TransferForm.css";
import { useTranferForm } from "../../hooks/useTranferForm";
import { initialTransferForm, LIMITS } from "../../utils/utils";
import { handleFormValidation } from "../../utils/validations";
import { PageHeader } from "../../ui/PageHeader";
import axios from "axios";

const TransferForm = ({
  savingAccountNum = "1234567890",
  mortgageAccountNum = "0987654321",
  savingsAmount = 1000000,
}) => {
  const { formData, handleChange, resetForm } =
    useTranferForm(initialTransferForm);
  formData.fromSavingsAccountNumber = savingAccountNum;
  formData.toMortgageAccountNumber = mortgageAccountNum;

  /**
   * @function handleSubmit
   * @param {*} e
   *
   * calling while submitting the form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const msg = handleFormValidation(formData);
    if (msg) {
      message.error(msg);
    } else {
      console.log("Validation success");
      console.log(formData);

      try {
        const response = await axios.post(
          "http://localhost:3000/transfer-history",
          {
            transactionDate: new Date().toISOString(),
            amount: formData?.mortgageAmount,
            remainingBalance: savingsAmount - formData?.mortgageAmount,
            mortgageAccount: {
              accountNumber: formData?.toMortgageAccountNumber,
              accountType: "MORTGAGE",
              accountName: "Housing",
            },
            savingsAccount: {
              accountNumber: formData?.fromSavingsAccountNumber,
              accountType: "SAVINGS",
              accountName: "Surendra",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Transfer failed. Please try again.");
        }

        message.success("Transfer successful!");
        resetForm();
      } catch (error) {
        message.error("Transfer failed. Please try again.");
      }
    }
  };

  /**
   * @function onReset
   * This func can do reset the form
   */
  const onReset = () => {
    resetForm();
  };

  return (
    <div className="form-container ">
      {/* <PageHeader /> */}
      <Form
        layout="vertical"
        className="transfer-form"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Saving Account Number">
          <Input
            name="savingAccountNumber"
            value={formData?.fromSavingsAccountNumber}
            disabled
          />
        </Form.Item>

        <Form.Item label="Mortgage Account Number">
          <Input
            name="Mortgage Account Number"
            value={formData?.toMortgageAccountNumber}
            disabled
          />
        </Form.Item>

        <Form.Item label="Mortgage Amount">
          <Input
            name="mortgageAmount"
            placeholder="Enter Amount"
            value={formData?.mortgageAmount?.Input}
            onChange={handleChange}
            type="number"
          />
        </Form.Item>

        <Form.Item label="Remarks">
          <TextArea
            name="remarks"
            value={formData?.remarks}
            placeholder="Enter Remarks"
            onChange={handleChange}
            maxLength={LIMITS.REMARKS_LIMIT}
          />
        </Form.Item>

        <Form.Item className="form-button-container">
          <Button className="btn-submit" htmlType="submit">
            Submit
          </Button>
          <Button className="btn-reset" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TransferForm;
