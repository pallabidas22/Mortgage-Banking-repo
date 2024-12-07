export const dateFormatter = (date) => {
    return` ${new Date(date).toLocaleDateString('en-SG')} ${new Date(date).toLocaleTimeString('en-SG')}`;
}