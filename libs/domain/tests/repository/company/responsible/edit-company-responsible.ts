import {
  EditCompanyResponsibleRepository,
  EditCompanyResponsibleDto,
} from '../../../../src';
import { CompanyResponsibleMock } from '../../../entity';

export class EditCompanyResponsibleRespositoryMock
  implements EditCompanyResponsibleRepository
{
  inputMock = {} as EditCompanyResponsibleDto;
  async edit(input: EditCompanyResponsibleDto) {
    this.inputMock = input;
    return CompanyResponsibleMock.id;
  }
}
