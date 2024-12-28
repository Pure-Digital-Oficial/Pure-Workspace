import { UseCaseError } from '../base/use-case-error';

export class EntityNotNegativeNumber extends Error implements UseCaseError {
  constructor(entity: string) {
    super(`The ${entity} cannot have negative numbers`);
    this.name = 'EntityNotNegativeNumber';
  }
}
