import {
  ListSimpleCountryRepository,
  ListSimpleCountryResponseDto,
} from '../../../../src';
import { listSimpleCountryMock } from '../../../entity';

export class ListSimpleCountryRepositoryMock
  implements ListSimpleCountryRepository
{
  async list(): Promise<ListSimpleCountryResponseDto[]> {
    return [listSimpleCountryMock];
  }
}
