import { FC } from 'react';
import { UserPopupType } from '@pure-workspace/domain';
import {
  AddUserToAnotherCompanyModal,
  ChangeUserTypeModal,
  DeleteUserModal,
  EditUserModal,
  ListCompanyByUserIdModal,
} from '.';

interface UserModalsProps {
  selectedId: string;
  openModal: {
    delete: boolean;
    edit: boolean;
    'add-company': boolean;
    'list-company': boolean;
    'change-type': boolean;
  };
  handlePopUpClose: (type: UserPopupType) => void;
  showAlert: (message: string, success: boolean) => void;
  deleteUserTitle?: string;
  deleteUserSubTitle?: string;
  editUserTitle?: string;
  addUserToAnotherCompanyTitle?: string;
  listCompanyByUserIdTitle?: string;
  changeUserTypeTitle?: string;
}

export const UserModals: FC<UserModalsProps> = ({
  selectedId,
  openModal,
  handlePopUpClose,
  showAlert,
  deleteUserTitle = 'Deletar Usuário?',
  deleteUserSubTitle = 'Por favor, selecione alguma das alternativas',
  editUserTitle = 'Editar Usuário',
  addUserToAnotherCompanyTitle = 'Adionar Empresa',
  listCompanyByUserIdTitle = 'Empresas',
  changeUserTypeTitle = 'Alterar Tipo de Usuário',
}) => {
  return (
    <>
      <EditUserModal
        idToEdit={selectedId}
        handlePopUpClose={() => handlePopUpClose('edit')}
        showAlert={showAlert}
        open={openModal.edit}
        title={editUserTitle}
      />
      <DeleteUserModal
        idToDelete={selectedId}
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
        open={openModal.delete}
        title={deleteUserTitle}
        subTitle={deleteUserSubTitle}
      />

      <AddUserToAnotherCompanyModal
        userId={selectedId}
        handlePopUpClose={() => handlePopUpClose('add-company')}
        showAlert={showAlert}
        open={openModal['add-company']}
        title={addUserToAnotherCompanyTitle}
      />

      <ListCompanyByUserIdModal
        userId={selectedId}
        handlePopUpClose={() => handlePopUpClose('list-company')}
        showAlert={showAlert}
        open={openModal['list-company']}
        title={listCompanyByUserIdTitle}
      />

      <ChangeUserTypeModal
        idToChange={selectedId}
        handlePopUpClose={() => handlePopUpClose('change-type')}
        showAlert={showAlert}
        open={openModal['change-type']}
        title={changeUserTypeTitle}
      />
    </>
  );
};
