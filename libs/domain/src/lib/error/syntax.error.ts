import { UseCaseError } from '../base/use-case-error';

export class SyntaxError extends Error implements UseCaseError {
  constructor() {
    super('Syntax Error');
    this.name = 'SyntaxError';
  }
}
