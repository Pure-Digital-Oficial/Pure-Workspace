import { UseCaseError } from '../../base/use-case-error';

export class EntityNotDeleted extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} was not deleted in the database`);
    this.name = 'EntityNotDeleted';
  }
}
