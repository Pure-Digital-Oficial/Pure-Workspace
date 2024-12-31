import { ExternalAuthBodyDto } from './external-auth-body.dto';

export interface ExternalAuthDto {
  appId: string;
  body: ExternalAuthBodyDto;
}
