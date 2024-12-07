export const getBaseUrl = () => {
  const { REACT_APP_API_BASE_URL } = process.env;
  return REACT_APP_API_BASE_URL;
};
