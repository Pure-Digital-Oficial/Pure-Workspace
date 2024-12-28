import { FC, useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { SimpleFormModal } from '../simple';
import { EditCompanyStepper } from '../../stepper/company/edit-company-stepper';
import { useLoggedUser } from '../../../contexts';
import { useFindAllCompanyIdsData } from '../../../hooks';

interface EditCompanyModalProps {
  open: boolean;
  title: string;
  companyId: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
}

export const EditCompanyModal: FC<EditCompanyModalProps> = ({
  open,
  title,
  companyId,
  handlePopUpClose,
  showAlert,
}) => {
  const theme = useTheme();
  const { loggedUser } = useLoggedUser();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [dataLoaded, setDataLoaded] = useState(false);

  const { companyIds, getCompanyIdsData } = useFindAllCompanyIdsData({
    companyId,
    loggedUserId: loggedUser?.id ?? '',
    showAlert,
  });

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && companyId && !dataLoaded) {
      getCompanyIdsData();
    }
  }, [loggedUser, companyId, dataLoaded, open, getCompanyIdsData]);

  return (
    <SimpleFormModal
      open={open}
      handlePopUpClose={handlePopUpClose}
      height="auto"
      width={smDown ? '90%' : theme.spacing(90)}
      title={title}
    >
      <EditCompanyStepper
        companyIds={companyIds}
        handlePopUpClose={handlePopUpClose}
        showAlert={showAlert}
      />
    </SimpleFormModal>
  );
};
