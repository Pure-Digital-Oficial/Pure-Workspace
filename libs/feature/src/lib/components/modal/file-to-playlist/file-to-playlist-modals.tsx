import { FC } from 'react';
import { MoveFileToAnotherPlaylistModal, DeletePlaylistFilesModal } from '.';

interface FileToPlaylistModalsProps {
  selectedIds: Record<string, boolean>;
  oldPlaylist: string;
  getSelectedFilesIds: () => string[];
  openModal: {
    move: boolean;
    delete: boolean;
  };
  handlePopUpClose: (type: 'move' | 'delete') => void;
  showAlert: (message: string, success: boolean) => void;
  moveFileToPlaylistTitle?: string;
  deletePlaylistFilesTitle?: string;
  deletePlaylistFilesSubTitle?: string;
}

export const FileToPlaylistModals: FC<FileToPlaylistModalsProps> = ({
  selectedIds,
  openModal,
  handlePopUpClose,
  showAlert,
  getSelectedFilesIds,
  oldPlaylist,
  moveFileToPlaylistTitle = 'Mover Arquivos para Playlist',
  deletePlaylistFilesTitle = 'Deletar Playlist?',
  deletePlaylistFilesSubTitle = 'Por favor, selecione alguma das alternativas',
}) => {
  return (
    <>
      <MoveFileToAnotherPlaylistModal
        handlePopUpClose={() => handlePopUpClose('move')}
        showAlert={showAlert}
        open={openModal.move}
        title={moveFileToPlaylistTitle}
        selectedFiles={selectedIds}
        oldPlaylist={oldPlaylist}
      />

      <DeletePlaylistFilesModal
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
        open={openModal.delete}
        idPlaylist={oldPlaylist}
        idsToDelete={getSelectedFilesIds()}
        title={deletePlaylistFilesTitle}
        subTitle={deletePlaylistFilesSubTitle}
      />
    </>
  );
};
