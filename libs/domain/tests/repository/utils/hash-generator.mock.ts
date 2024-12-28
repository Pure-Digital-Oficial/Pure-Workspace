import { HashGeneratorRepository } from '../../../src';

export class HashGeneratorRepositoryMock implements HashGeneratorRepository {
  input = '';
  async hash(input: string): Promise<string> {
    this.input = input;
    return 'hash';
  }
}
