import { UseCaseError } from '../base/use-case-error';
import { EntityMinValueDto } from '../dto';

export class EntityMinValue extends Error implements UseCaseError {
  constructor(input: EntityMinValueDto) {
    super(
      `The ${input.entitie} must have at least ${input.quantity} associated ${input.destiny}`
    );
    this.name = 'EntityMinValue';
  }
}
