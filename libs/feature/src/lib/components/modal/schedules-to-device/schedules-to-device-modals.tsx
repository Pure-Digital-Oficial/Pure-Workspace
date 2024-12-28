import { FC } from 'react';
import {
  DeleteSchedulesToDeviceModal,
  MoveSchedulesToAnotherDeviceModal,
} from '.';

interface SchedulesToDeviceModalsProps {
  selectedId: string;
  loggedUserId: string;
  companyId: string;
  openModal: {
    delete: boolean;
    move: boolean;
  };
  handlePopUpClose: (type: 'move' | 'delete') => void;
  showAlert: (message: string, success: boolean) => void;
  getSelectedSchedulingIds: () => string[];
  moveSchedulesToDeviceTitle?: string;
  deleteSchedulesToDeviceTitle?: string;
  deleteSchedulesToDeviceSubTitle?: string;
}

export const SchedulesToDeviceModals: FC<SchedulesToDeviceModalsProps> = ({
  selectedId,
  loggedUserId,
  openModal,
  companyId,
  handlePopUpClose,
  showAlert,
  getSelectedSchedulingIds,
  deleteSchedulesToDeviceTitle = 'Deletar Agendamento',
  moveSchedulesToDeviceTitle = 'Mover Agendamentos',
  deleteSchedulesToDeviceSubTitle = 'Selecione alguma das alternativas',
}) => {
  return (
    <>
      <DeleteSchedulesToDeviceModal
        idDevice={selectedId}
        loggedUserId={loggedUserId}
        open={openModal.delete}
        title={deleteSchedulesToDeviceTitle}
        schedulesIds={getSelectedSchedulingIds()}
        showAlert={showAlert}
        onClose={() => handlePopUpClose('delete')}
        subTitle={deleteSchedulesToDeviceSubTitle}
      />
      <MoveSchedulesToAnotherDeviceModal
        open={openModal.move}
        oldDeviceId={selectedId}
        loggedUserId={loggedUserId}
        selectedSchedules={getSelectedSchedulingIds()}
        showAlert={showAlert}
        onClose={() => handlePopUpClose('move')}
        title={moveSchedulesToDeviceTitle}
        companyId={companyId}
      />
    </>
  );
};
