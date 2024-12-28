import { UseCaseError } from '../base/use-case-error';

export class EntityAlreadyExists extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} already exists in the system`);
    this.name = 'EntityAlreadyExists';
  }
}
