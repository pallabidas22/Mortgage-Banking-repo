import { currencyFormatter } from "../../../utils/currencyFormatter";
import { dateFormatter } from "../../../utils/dateFormatter";

export const columns = [
    {
        title: 'Transaction Date',
        dataIndex: 'transactionDate',
        key: 'transactionDate',
        render: (date) => <span>{dateFormatter(date)}</span>
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => <span>{currencyFormatter(amount)}</span>
    },
    {
        title: 'Remaining Balance',
        dataIndex: 'remainingBalance',
        key: 'remainingBalance',
        render: (balance) => <span>{currencyFormatter(balance)}</span>
    },
    {
        title: 'Mortgage Account',
        dataIndex: 'mortgageAccount',
        key: 'mortgageAccount',
        render: (mortgageAccount) => <span>{mortgageAccount.accountName} - {mortgageAccount.accountNumber}</span>
    },
    {
        title: 'Savings Account',
        dataIndex: 'savingsAccount',
        key: 'savingsAccount',
        render: (savingsAccount) => <span>{savingsAccount.accountNumber}</span>
    },
  ];