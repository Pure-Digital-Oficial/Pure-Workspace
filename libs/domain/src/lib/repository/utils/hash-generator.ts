export interface HashGeneratorRepository {
  hash(input: string): Promise<string>;
}
