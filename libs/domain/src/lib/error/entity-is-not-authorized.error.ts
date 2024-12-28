import { UseCaseError } from '../base/use-case-error';

export class EntityIsNotAuthorized extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} is not authorized on the system!`);
    this.name = 'EntityIsNotAuthorized';
  }
}
