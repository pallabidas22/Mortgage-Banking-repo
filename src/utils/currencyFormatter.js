export const currencyFormatter = (cur) => {
    return cur ? `S$${Intl.NumberFormat({ style: 'currency', currency: 'sgd', minimumFractionDigits: 2 }).format(cur)}` : '-';
}