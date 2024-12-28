import { FC } from 'react';
import { CrudType } from '@pure-workspace/domain';
import {
  EditDeviceModal,
  DeleteDeviceModal,
  DetailsDeviceModal,
  CreateDeviceModal,
} from '.';
import { AddSchedulesToDeviceModal } from '../schedules-to-device';

interface DeviceModalsProps {
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
  createDeviceTitle?: string;
  editDeviceTitle?: string;
  detailsDeviceTitle?: string;
  deleteDeviceTitle?: string;
  addSchedulesTitle?: string;
}

export const DeviceModals: FC<DeviceModalsProps> = ({
  selectedId,
  openModal,
  handlePopUpClose,
  showAlert,
  createDeviceTitle = 'Cadastrar Dispositivo',
  deleteDeviceTitle = 'Deletar Dispositivo',
  editDeviceTitle = 'Editar Dispositivo',
  detailsDeviceTitle = 'Detalhes da Dispositivo',
  addSchedulesTitle = 'Adicionar Agendamento',
}) => {
  return (
    <>
      <CreateDeviceModal
        open={openModal.create}
        title={createDeviceTitle}
        handlePopUpClose={() => handlePopUpClose('create')}
        showAlert={showAlert}
      />
      <DeleteDeviceModal
        open={openModal.delete}
        title={deleteDeviceTitle}
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
        idToDelete={selectedId}
      />
      <EditDeviceModal
        open={openModal.edit}
        title={editDeviceTitle}
        handlePopUpClose={() => handlePopUpClose('edit')}
        showAlert={showAlert}
        idToEdit={selectedId}
      />
      <DetailsDeviceModal
        open={openModal.details}
        title={detailsDeviceTitle}
        handlePopUpClose={() => handlePopUpClose('details')}
        showAlert={showAlert}
        idDevice={selectedId}
      />
      <AddSchedulesToDeviceModal
        open={openModal.add}
        title={addSchedulesTitle}
        handlePopUpClose={() => handlePopUpClose('add')}
        showAlert={showAlert}
        idDevice={selectedId}
      />
    </>
  );
};
