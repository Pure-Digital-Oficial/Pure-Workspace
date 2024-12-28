import { UseCaseError } from '../base/use-case-error';

export class EntityNotPermissions extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} does not have permission on the system!`);
    this.name = 'EntityNotPermissions';
  }
}
