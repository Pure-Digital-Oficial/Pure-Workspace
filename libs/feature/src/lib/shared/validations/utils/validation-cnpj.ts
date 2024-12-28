export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove all non-digits

  if (cnpj.length !== 14) return false;

  // Verify if all digits are the same
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Calculate the check digits
  const calcCheckDigit = (cnpj: string, factor: number[]): number => {
    const sum = cnpj
      .split('')
      .slice(0, factor.length)
      .reduce((acc, num, i) => acc + parseInt(num) * factor[i], 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const factors1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const factors2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstCheckDigit = calcCheckDigit(cnpj, factors1);
  const secondCheckDigit = calcCheckDigit(cnpj, factors2);

  return (
    firstCheckDigit === parseInt(cnpj[12]) &&
    secondCheckDigit === parseInt(cnpj[13])
  );
}
