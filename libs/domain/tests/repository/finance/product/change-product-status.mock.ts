import {
  ChangeProductStatusDto,
  ChangeProductStatusRepository,
} from '../../../../src';
import { ProductMock } from '../../../entity';

export class ChangeProductStatusRepositoryMock
  implements ChangeProductStatusRepository
{
  inputMock = {} as ChangeProductStatusDto;
  async change(input: ChangeProductStatusDto): Promise<string> {
    this.inputMock = input;
    return ProductMock.id;
  }
}
