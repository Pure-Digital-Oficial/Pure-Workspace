import { CreatePreRegistrationDto } from '../../../dto';

export interface CreatePreRegistrationRepository {
  create(input: CreatePreRegistrationDto): Promise<string>;
}
