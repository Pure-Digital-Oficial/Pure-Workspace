export const formatNumberToBRL = (value: string): string => {
  const number = parseFloat(value);
  if (isNaN(number)) return 'value invalid';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};
