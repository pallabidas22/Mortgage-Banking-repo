/**
 * Custom Hook: useForm
 * using to handle form inputs
 * returning formData and method
 */

import { useState } from "react";

export const useTranferForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    resetForm,
    handleChange,
  };
};
