import { UseCaseError } from '../base/use-case-error';

export class EntityNotValid extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} is not valid`);
    this.name = 'EntityNotValid';
  }
}
