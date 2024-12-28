import { UseCaseError } from '../base/use-case-error';

export class EntityNotLoaded extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} was not loaded`);
    this.name = 'EntityNotLoaded';
  }
}
