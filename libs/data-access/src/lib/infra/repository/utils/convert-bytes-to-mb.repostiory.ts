import { ConvertBytesToMbRepository } from '@pure-workspace/domain';

export class ConvertBytesToMbRepositoryImpl
  implements ConvertBytesToMbRepository
{
  convert(bytes: number): number {
    const milEVinteQuatro = 1024;
    return bytes / (milEVinteQuatro * milEVinteQuatro);
  }
}
