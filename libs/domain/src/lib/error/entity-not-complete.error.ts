import { UseCaseError } from '../base/use-case-error';

export class EntityNotComplete extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} is not complete action in system`);
    this.name = 'EntityNotComplete';
  }
}
