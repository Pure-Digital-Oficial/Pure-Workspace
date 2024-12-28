import { FC } from 'react';
import { CrudType } from '@pure-workspace/domain';
import {
  CreatePlaylistModal,
  DeletePlaylistModal,
  DetailsPlaylistModal,
  EditPlaylistModal,
} from '.';
import { AddFileToPlaylistModal } from '..';

interface PlaylistModalsProps {
  selectedId: string;
  companyId: string;
  openModal: {
    create: boolean;
    delete: boolean;
    edit: boolean;
    details: boolean;
    add: boolean;
  };
  handlePopUpClose: (type: CrudType | 'add') => void;
  showAlert: (message: string, success: boolean) => void;
  createPlaylistTitle?: string;
  deletePlaylistTitle?: string;
  deletePlaylistSubTitle?: string;
  editPlaylistTitle?: string;
  detailsPlaylistTitle?: string;
  addFileTitle?: string;
  detailsTitle?: string;
}

export const PlaylistModals: FC<PlaylistModalsProps> = ({
  selectedId,
  companyId,
  openModal,
  handlePopUpClose,
  showAlert,
  createPlaylistTitle = 'Criar Playlist',
  deletePlaylistTitle = 'Deletar Playlist?',
  deletePlaylistSubTitle = 'Por favor, selecione alguma das alternativas',
  editPlaylistTitle = 'Editar Playlist',
  addFileTitle = 'Adicionar Arquivos a Playlist?',
  detailsPlaylistTitle = 'Detalhes da Playlist',
}) => {
  return (
    <>
      <CreatePlaylistModal
        handlePopUpClose={() => handlePopUpClose('create')}
        showAlert={showAlert}
        open={openModal.create}
        title={createPlaylistTitle}
      />
      <EditPlaylistModal
        companyId={companyId}
        idToEdit={selectedId}
        handlePopUpClose={() => handlePopUpClose('edit')}
        showAlert={showAlert}
        open={openModal.edit}
        title={editPlaylistTitle}
      />
      <DeletePlaylistModal
        idToDelete={selectedId}
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
        open={openModal.delete}
        title={deletePlaylistTitle}
        subTitle={deletePlaylistSubTitle}
      />
      <AddFileToPlaylistModal
        idPlaylist={selectedId}
        open={openModal.add}
        showAlert={showAlert}
        handlePopUpClose={() => handlePopUpClose('add')}
        title={addFileTitle}
      />
      <DetailsPlaylistModal
        idPlaylist={selectedId}
        handlePopUpClose={() => handlePopUpClose('details')}
        showAlert={showAlert}
        open={openModal.details}
        title={detailsPlaylistTitle}
      />
    </>
  );
};
