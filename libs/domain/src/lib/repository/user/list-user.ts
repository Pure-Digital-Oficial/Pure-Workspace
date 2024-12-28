import { ListUserDto, ListUserResponseDto } from '../../dto';

export interface ListUserRepository {
  list(input: ListUserDto): Promise<ListUserResponseDto>;
}
