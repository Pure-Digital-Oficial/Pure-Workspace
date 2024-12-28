import { UseCaseError } from '../../base/use-case-error';

export class EntityNotMoved extends Error implements UseCaseError {
  constructor(entity: string) {
    super(`The ${entity} not moved in database.`);
    this.name = 'EntityNotMoved';
  }
}
