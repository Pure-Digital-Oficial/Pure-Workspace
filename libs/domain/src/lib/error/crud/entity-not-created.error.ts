import { UseCaseError } from '../../base/use-case-error';

export class EntityNotCreated extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} was not created in the database`);
    this.name = 'EntityNotCreated';
  }
}
