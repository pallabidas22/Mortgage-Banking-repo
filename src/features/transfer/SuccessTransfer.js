import { green } from "@mui/material/colors";
import { Button, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/TransferForm.css";

const { Text } = Typography;

function SuccessTransfer() {
  const navigate = useNavigate();
  return (
    <div className="success-container">
      <Text className="success-text" type="secondary">
        Your transaction is successful.
      </Text>
      <Button className="btn-goback" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
}

export default SuccessTransfer;
