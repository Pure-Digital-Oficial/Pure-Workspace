import { MaskType } from '@pure-workspace/domain';

export const formatValueMask = (value: string, maskType: MaskType) => {
  const cleanedValue = value.replace(/\D/g, '');

  switch (maskType) {
    case 'phone':
      return cleanedValue
        .slice(0, 11)
        .replace(/^(\d{2})(\d{5})?(\d{4})?$/, (_, p1, p2, p3) => {
          return `(${p1}) ${p2 || ''}${p3 ? `-${p3}` : ''}`;
        });

    case 'cpf':
      return cleanedValue
        .slice(0, 11)
        .replace(/^(\d{3})(\d{3})?(\d{3})?(\d{2})?$/, (_, p1, p2, p3, p4) => {
          return [p1, p2, p3].filter(Boolean).join('.') + (p4 ? `-${p4}` : '');
        });

    case 'cnpj':
      return cleanedValue
        .slice(0, 14)
        .replace(
          /^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?$/,
          (_, p1, p2, p3, p4, p5) => {
            return (
              [p1, p2, p3].filter(Boolean).join('.') +
              (p4 ? `/${p4}` : '') +
              (p5 ? `-${p5}` : '')
            );
          }
        );

    default:
      return value;
  }
};
