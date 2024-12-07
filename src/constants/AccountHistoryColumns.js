export const AccountHistoryColumns = [
  // Column for restaurant name
  {
    title: "Transaction Date",
    dataIndex: "date",
    key: "date",
    width: "25%",
    ellipsis: true, // Truncate text with ellipsis if it overflows
    fixed: true, // Fixed column to the left
    defaultSortOrder: "ascend", // Default sort order
    sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort by date
    render: (text) => new Date(text).toLocaleDateString(), // Format date for display
  },
  // Column for restaurant description
  {
    title: "Account #",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: "25%",
    ellipsis: true, // Truncate text with ellipsis if it overflows
    responsive: ["md", "lg"], // Show on medium and larger screens
    sorter: (a, b) => parseInt(a.accountNumber) - parseInt(b.accountNumber), // Sort by description length
  },
  // Column for restaurant location
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: "15%",
    ellipsis: true, // Truncate text with ellipsis if it overflows
    responsive: ["sm", "md", "lg"], // Show on small and larger screens
    sorter: (a, b) => a.type.length - b.type.length, // Sort by location length
  },
  // Column for restaurant category
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: "20%",
    responsive: ["sm", "md", "lg"], // Show on small and larger screens
    sorter: (a, b) => parseInt(a.amount) - parseInt(b.amount), // Sort by category length
  },
  {
    title: "Credit / Debit",
    dataIndex: "creditOrDebit",
    key: "creditOrDebit",
    width: "15%",
    responsive: ["sm", "md", "lg"], // Show on small and larger screens
    sorter: (a, b) => a.creditOrDebit.length - b.creditOrDebit.length, // Sort by category length
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "Remarks",
    width: "35%",
    responsive: ["sm", "md", "lg"], // Show on small and larger screens
    sorter: (a, b) => a.remarks.length - b.remarks.length, // Sort by category length
  },
];
