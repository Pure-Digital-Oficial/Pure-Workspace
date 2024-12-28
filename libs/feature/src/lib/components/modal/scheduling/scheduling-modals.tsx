import { FC } from 'react';
import { CrudType } from '@pure-workspace/domain';
import {
  CreateSchedulingModal,
  DeleteSchedulingModal,
  DetailsSchedulingModal,
  EditSchedulingModal,
} from '.';
import { AddPlaylistToSchedulingModal } from '../playlist-to-scheduling';

interface SchedulingModalsProps {
  selectedId: string;
  openModal: {
    create: boolean;
    delete: boolean;
    edit: boolean;
    details: boolean;
    add: boolean;
  };
  handlePopUpClose: (type: CrudType | 'add') => void;
  showAlert: (message: string, success: boolean) => void;
  createSchedulingTitle?: string;
  deleteSchedulingTitle?: string;
  deleteSchedulingSubTitle?: string;
  editSchedulingTitle?: string;
  detailsSchedulingTitle?: string;
  detailsTitle?: string;
}

export const SchedulingModals: FC<SchedulingModalsProps> = ({
  selectedId,
  openModal,
  handlePopUpClose,
  showAlert,
  createSchedulingTitle = 'Criar Agendamento',
  deleteSchedulingTitle = 'Deletar Agendamento?',
  deleteSchedulingSubTitle = 'Por favor, selecione alguma das alternativas',
  editSchedulingTitle = 'Editar Agendamento',
  detailsSchedulingTitle = 'Detalhes da Agendamento',
}) => {
  return (
    <>
      <CreateSchedulingModal
        handlePopUpClose={() => handlePopUpClose('create')}
        showAlert={showAlert}
        open={openModal.create}
        title={createSchedulingTitle}
      />
      <EditSchedulingModal
        idToEdit={selectedId}
        handlePopUpClose={() => handlePopUpClose('edit')}
        showAlert={showAlert}
        open={openModal.edit}
        title={editSchedulingTitle}
      />
      <DeleteSchedulingModal
        idToDelete={selectedId}
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
        open={openModal.delete}
        title={deleteSchedulingTitle}
        subTitle={deleteSchedulingSubTitle}
      />
      <DetailsSchedulingModal
        idToDetails={selectedId}
        handlePopUpClose={() => handlePopUpClose('details')}
        showAlert={showAlert}
        open={openModal.details}
        title={detailsSchedulingTitle}
      />
      <AddPlaylistToSchedulingModal
        open={openModal.add}
        title="Adicionar Playlist ao Agendamento"
        handlePopUpClose={() => handlePopUpClose('add')}
        showAlert={showAlert}
        idScheduling={selectedId}
      />
    </>
  );
};
