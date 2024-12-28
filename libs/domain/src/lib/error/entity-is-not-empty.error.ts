import { UseCaseError } from '../base/use-case-error';

export class EntityIsNotEmpty extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`the ${entitie} is not empty`);
    this.name = 'EntityIsNotEmpty';
  }
}
