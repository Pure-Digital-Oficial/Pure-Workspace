import { UseCaseError } from '../base/use-case-error';

export class EntityNotType extends Error implements UseCaseError {
  constructor(entitie: string, coEntity: string) {
    super(`The ${entitie} is not ${coEntity} type`);
    this.name = 'EntityNotType';
  }
}
