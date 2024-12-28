import { MaskType } from '@pure-workspace/domain';

export const formatValueMask = (value: string, maskType: MaskType) => {
  const cleanedValue = value.replace(/\D/g, '');

  switch (maskType) {
    case 'phone':
      let phoneValue = cleanedValue;

      if (phoneValue.length === 8) {
        phoneValue = `${phoneValue.slice(0, 2)}9${phoneValue.slice(2)}`;
      }

      if (phoneValue.length <= 2) return phoneValue;

      if (phoneValue.length <= 7) {
        return `${phoneValue.slice(0, 2)} ${phoneValue.slice(2)}`;
      }

      if (phoneValue.length === 10) {
        phoneValue = `${phoneValue.slice(0, 2)}9${phoneValue.slice(2)}`;
      }

      if (phoneValue.length === 11) {
        return `(${phoneValue.slice(0, 2)}) ${phoneValue.slice(
          2,
          7
        )}-${phoneValue.slice(7, 11)}`;
      }
      return `${phoneValue.slice(0, 4)}-${phoneValue.slice(4, 8)}`;

    case 'cpf':
      if (cleanedValue.length <= 3) return cleanedValue;
      if (cleanedValue.length <= 6)
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}`;
      if (cleanedValue.length <= 9)
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(
          3,
          6
        )}.${cleanedValue.slice(6, 9)}`;
      return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(
        3,
        6
      )}.${cleanedValue.slice(6, 9)}-${cleanedValue.slice(9, 11)}`;

    case 'cnpj':
      if (cleanedValue.length <= 2) return cleanedValue;
      if (cleanedValue.length <= 5)
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2, 5)}`;
      if (cleanedValue.length <= 8)
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(
          2,
          5
        )}.${cleanedValue.slice(5, 8)}`;
      if (cleanedValue.length <= 12)
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(
          2,
          5
        )}.${cleanedValue.slice(5, 8)}/${cleanedValue.slice(8, 12)}`;
      return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(
        2,
        5
      )}.${cleanedValue.slice(5, 8)}/${cleanedValue.slice(
        8,
        12
      )}-${cleanedValue.slice(12, 14)}`;

    default:
      return value;
  }
};
