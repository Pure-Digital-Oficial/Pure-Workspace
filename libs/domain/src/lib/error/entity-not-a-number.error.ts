import { UseCaseError } from '../base/use-case-error';

export class EntityNotaNumber extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`It's ${entitie} not a number`);
    this.name = 'EntityNotaNumber';
  }
}
