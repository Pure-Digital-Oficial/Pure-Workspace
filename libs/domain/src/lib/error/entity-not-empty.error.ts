import { UseCaseError } from '../base/use-case-error';

export class EntityNotEmpty extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`the ${entitie} cannot be empty`);
    this.name = 'EntityNotEmpty';
  }
}
