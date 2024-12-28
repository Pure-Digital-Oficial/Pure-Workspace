import { FC } from 'react';
import { CrudType } from '@pure-workspace/domain';
import {
  CreateDirectoryModal,
  DeleteDirectoryModal,
  EditDirectoryModal,
} from '.';

interface DeviceModalsProps {
  selectedId: string;
  openModal: {
    create: boolean;
    delete: boolean;
    edit: boolean;
    details: boolean;
  };
  handlePopUpClose: (type: CrudType) => void;
  showAlert: (message: string, success: boolean) => void;
  createDirectoryTitle?: string;
  deleteDirectoryTitle?: string;
  editDirectoryTitle?: string;
  editDirectoryName?: string;
}

export const DirectoryModals: FC<DeviceModalsProps> = ({
  selectedId,
  openModal,
  handlePopUpClose,
  showAlert,
  createDirectoryTitle = 'Cadastrar Diretório',
  deleteDirectoryTitle = 'Deletar Diretório',
  editDirectoryTitle = 'Editar Diretório',
  editDirectoryName = '',
}) => {
  return (
    <>
      <CreateDirectoryModal
        open={openModal.create}
        title={createDirectoryTitle}
        handlePopUpClose={() => handlePopUpClose('create')}
        showAlert={showAlert}
      />
      <DeleteDirectoryModal
        open={openModal.delete}
        title={deleteDirectoryTitle}
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
        idToDelete={selectedId}
      />
      <EditDirectoryModal
        open={openModal.edit}
        title={editDirectoryTitle}
        handlePopUpClose={() => handlePopUpClose('edit')}
        showAlert={showAlert}
        idToEdit={selectedId}
        nameDirectory={editDirectoryName}
      />
    </>
  );
};
