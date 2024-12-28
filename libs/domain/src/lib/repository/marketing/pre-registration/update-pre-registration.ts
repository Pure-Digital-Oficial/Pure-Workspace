import { UpdatePreRegistrationDto } from '../../../dto';

export interface UpdatePreRegistrationRepository {
  update(input: UpdatePreRegistrationDto): Promise<string>;
}
