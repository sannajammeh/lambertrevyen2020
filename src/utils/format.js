export const formatToNOK = number =>
  new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(number);
