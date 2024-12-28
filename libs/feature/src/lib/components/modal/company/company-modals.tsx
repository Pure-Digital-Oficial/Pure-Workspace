import { FC } from 'react';
import { CompanyPopUp, CompanyPopupType } from '@pure-workspace/domain';
import {
  CreateCompanyModal,
  DeleteCompanyModal,
  DetailsCompanyModal,
  EditCompanyModal,
  ListUsersByCompanyIdModal,
  RemoveUserAccessToTheCompanyModal,
} from '.';

interface CompanyModalsProps {
  selectedId: string;
  userId?: string;
  openModal: CompanyPopUp;
  handlePopUpClose: (type: CompanyPopupType) => void;
  showAlert: (message: string, success: boolean) => void;
  removeUserAccessToTheCompanyTitle?: string;
  removeUserAccessToTheCompanySubTitle?: string;
  createCompanyTitle?: string;
  deleteCompanyTitle?: string;
  editCompanyTitle?: string;
  detailsCompanyTitle?: string;
  listUsersByCompanyIdTitle?: string;
}

export const CompanyModals: FC<CompanyModalsProps> = ({
  selectedId,
  openModal,
  handlePopUpClose,
  showAlert,
  userId,
  createCompanyTitle = 'Cadastrar Empresa',
  deleteCompanyTitle = 'Deletar Empresa',
  editCompanyTitle = 'Editar Empresa',
  detailsCompanyTitle = 'Detalhes da Empresa',
  listUsersByCompanyIdTitle = 'Listagem de Usuários',
  removeUserAccessToTheCompanyTitle = 'Remover Acesso',
  removeUserAccessToTheCompanySubTitle = 'Realmente deseja remover o acesso?',
}) => {
  return (
    <>
      <CreateCompanyModal
        open={openModal.create}
        title={createCompanyTitle}
        handlePopUpClose={() => handlePopUpClose('create')}
        showAlert={showAlert}
      />
      <DeleteCompanyModal
        open={openModal.delete}
        title={deleteCompanyTitle}
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
        idToDelete={selectedId}
      />
      <EditCompanyModal
        open={openModal.edit}
        title={editCompanyTitle}
        handlePopUpClose={() => handlePopUpClose('edit')}
        showAlert={showAlert}
        companyId={selectedId}
      />
      <DetailsCompanyModal
        open={openModal.details}
        title={detailsCompanyTitle}
        handlePopUpClose={() => handlePopUpClose('details')}
        showAlert={showAlert}
        companyId={selectedId}
      />
      <ListUsersByCompanyIdModal
        open={openModal['list-users']}
        title={listUsersByCompanyIdTitle}
        handlePopUpClose={() => handlePopUpClose('list-users')}
        showAlert={showAlert}
        companyId={selectedId}
      />
      <RemoveUserAccessToTheCompanyModal
        open={openModal['remove-access']}
        title={removeUserAccessToTheCompanyTitle}
        handlePopUpClose={() => handlePopUpClose('remove-access')}
        showAlert={showAlert}
        companyId={selectedId}
        userId={userId ?? ''}
        subTitle={removeUserAccessToTheCompanySubTitle}
      />
    </>
  );
};
