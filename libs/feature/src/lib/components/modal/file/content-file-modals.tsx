import { FC } from 'react';
import { FileContentType } from '@pure-workspace/domain';
import { DeleteFileModal, DetailsFileModal, MoveFileToDirectoryModal } from '.';

interface ContentFileModalsProps {
  selectedId: string;
  companyId: string;
  loggedUserId: string;
  directoryId: string;
  openModal: {
    create: boolean;
    delete: boolean;
    edit: boolean;
    details: boolean;
    moveFile: boolean;
  };
  handlePopUpClose: (type: FileContentType) => void;
  showAlert: (message: string, success: boolean) => void;
  buttonMoveFileTitle?: string;
  moveFileTitle?: string;
  moveFileToDirectoryTitle?: string;
  buttonMoveFileToDirectoryTitle?: string;
}

export const ContentFileModals: FC<ContentFileModalsProps> = ({
  selectedId,
  companyId,
  loggedUserId,
  directoryId,
  openModal,
  handlePopUpClose,
  showAlert,
  moveFileTitle = 'Mover Arquivo para',
  buttonMoveFileTitle = 'Mover Arquivo',
  moveFileToDirectoryTitle = 'Mover Arquivo para',
  buttonMoveFileToDirectoryTitle = 'Mover Arquivo',
}) => {
  return (
    <>
      <MoveFileToDirectoryModal
        onClose={() => handlePopUpClose('create')}
        showAlert={showAlert}
        open={openModal.create}
        title={moveFileTitle}
        buttonTitle={buttonMoveFileTitle}
        companyId={companyId}
        loggedUserId={loggedUserId}
        idToMove={selectedId}
      />
      <DeleteFileModal
        open={openModal.delete}
        directoryId={directoryId}
        onClose={() => handlePopUpClose('delete')}
        idToDelete={selectedId}
        loggedUserId={loggedUserId}
        showAlert={showAlert}
      />
      <MoveFileToDirectoryModal
        open={openModal.moveFile}
        loggedUserId={loggedUserId}
        companyId={companyId}
        showAlert={showAlert}
        onClose={() => handlePopUpClose('moveFile')}
        idToMove={selectedId}
        title={moveFileToDirectoryTitle}
        buttonTitle={buttonMoveFileToDirectoryTitle}
      />
      <DetailsFileModal
        directoryId={directoryId}
        open={openModal.details}
        idDetails={selectedId}
        loggedUserId={loggedUserId}
        showAlert={showAlert}
        handlePopUpClose={() => handlePopUpClose('details')}
      />
    </>
  );
};
