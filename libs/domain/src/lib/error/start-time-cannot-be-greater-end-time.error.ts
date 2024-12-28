import { UseCaseError } from '../base/use-case-error';

export class StartTimeCannotBeGreaterEndTime
  extends Error
  implements UseCaseError
{
  constructor(entitie: string) {
    super(`The ${entitie} cannot be greater end Time!`);
    this.name = 'StartTimeCannotBeGreaterEndTime';
  }
}
