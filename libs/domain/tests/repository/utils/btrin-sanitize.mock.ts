import { BtrinSanitizeRepository } from '../../../src';

export class BtrinSanitizeRepositoryMock implements BtrinSanitizeRepository {
  async btrin(input: string): Promise<string> {
    const output = input.replace(/^\s+|\s+$/g, '');
    return output;
  }
}
