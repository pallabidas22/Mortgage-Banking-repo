/**
 *
 * Component : TransferForm
 * Can handle transfer amount from 1 account to another account
 *
 */
import React from "react";
import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

import "../../styles/TransferForm.css";
import { useTranferForm } from "../../hooks/useTranferForm";
import { initialTransferForm, LIMITS } from "../../utils/utils";
import { handleFormValidation } from "../../utils/validations";

const TransferForm = ({ savingAccountNum, mortgageAccountNum }) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = handleFormValidation(formData);
    if (msg) {
      alert(msg);
    } else {
      alert("Validation success");
      resetForm();
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
