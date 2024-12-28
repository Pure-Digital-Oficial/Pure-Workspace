import { FC } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { SimpleFormModal } from '../simple';
import { CreateCompanyStepper } from '../../stepper/company/create-company-stepper';

interface CreateCompanyModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
}

export const CreateCompanyModal: FC<CreateCompanyModalProps> = ({
  open,
  title,
  handlePopUpClose,
  showAlert,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SimpleFormModal
      open={open}
      handlePopUpClose={handlePopUpClose}
      height="auto"
      width={smDown ? '90%' : theme.spacing(90)}
      title={title}
    >
      <CreateCompanyStepper
        handlePopUpClose={handlePopUpClose}
        showAlert={showAlert}
      />
    </SimpleFormModal>
  );
};
