import { ConvertStringInTimeRepository } from '@pure-workspace/domain';

export class ConvertStringInTimeRepositoryImpl
  implements ConvertStringInTimeRepository
{
  async convert(input: string): Promise<Date> {
    const [hour, minute] = input.split(':').map(Number);

    const now = new Date();

    const dateTimeLocal = new Date(now);
    dateTimeLocal.setHours(hour, minute, 0, 0);

    return dateTimeLocal;
  }
}
