import { UseCaseError } from '../base/use-case-error';

export class EntityNotFound extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} was not found in system`);
    this.name = 'EntityNotFound';
  }
}
