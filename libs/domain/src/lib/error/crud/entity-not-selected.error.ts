import { UseCaseError } from '../../base/use-case-error';

export class EntityNotSelected extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} not selected in the system`);
    this.name = 'EntityNotSelected';
  }
}
