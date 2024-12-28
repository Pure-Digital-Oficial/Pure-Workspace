import { UseCaseError } from '../base/use-case-error';

export class EntityNotActive extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} is not active in the system`);
    this.name = 'EntityNotActive';
  }
}
