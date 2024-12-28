import { EntityMinValueDto, Langue } from '@pure-workspace/domain';

export const EntityMinValue = (input: EntityMinValueDto, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input.entitie} must have at least ${input.quantity} associated ${input.destiny}`;
      break;
    default:
      message = `A(o)${input.entitie} deve ter no minimo ${input.quantity} de ${input.destiny} associadas(o)!`;
      break;
  }

  return message;
};
