import { UseCaseError } from '../base/use-case-error';

export class EntityNotExists extends Error implements UseCaseError {
  constructor(entity: string) {
    super(`The ${entity} not exists in system.`);
    this.name = 'EntityNotExists';
  }
}
