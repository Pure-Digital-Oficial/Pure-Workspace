import { UseCaseError } from '../base/use-case-error';

export class EntityNotAssociate extends Error implements UseCaseError {
  constructor(entitie: string, destiny: string) {
    super(`The ${entitie} is not associated with the ${destiny}`);
    this.name = 'EntityNotAssociate';
  }
}
