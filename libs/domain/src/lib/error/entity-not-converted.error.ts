import { UseCaseError } from '../base/use-case-error';

export class EntityNotConverted extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} was not converted in system`);
    this.name = 'EntityNotConverted';
  }
}
