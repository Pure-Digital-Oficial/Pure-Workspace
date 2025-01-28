import { contactUsBodyDto } from './contact-us-body.dto';

export interface CreateContactUsDto {
  appId: string;
  body: contactUsBodyDto;
}
