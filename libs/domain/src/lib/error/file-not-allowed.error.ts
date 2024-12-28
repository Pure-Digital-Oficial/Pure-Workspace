import { UseCaseError } from '../base/use-case-error';

export class FileNotAllowed extends Error implements UseCaseError {
  constructor() {
    super(`The file not allowed in system.`);
    this.name = 'FileNotAllowed';
  }
}
