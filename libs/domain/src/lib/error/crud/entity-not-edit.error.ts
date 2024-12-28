import { UseCaseError } from '../../base/use-case-error';

export class EntityNotEdit extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} not edited in the system`);
    this.name = 'EntityNotEdit';
  }
}
