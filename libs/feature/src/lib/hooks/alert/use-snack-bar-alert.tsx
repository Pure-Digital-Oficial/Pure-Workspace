import { SnackbarAlertProps } from '@pure-workspace/domain';
import { ReactNode, useState } from 'react';
import { SnackbarAlert } from '../../components/alert';

interface UseSnackbarAlert {
  showSnackbarAlert: (
    options: Omit<SnackbarAlertProps, 'open' | 'handleClose'>
  ) => void;
  SnackbarAlert: ReactNode;
}

export const useSnackbarAlert = (): UseSnackbarAlert => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Omit<
    SnackbarAlertProps,
    'open' | 'handleClose'
  > | null>(null);

  const showSnackbarAlert = (
    options: Omit<SnackbarAlertProps, 'open' | 'handleClose'>
  ) => {
    setOpen(true);
    setOptions(options);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SnackBarAlertComponent = options && (
    <SnackbarAlert open={open} handleClose={handleClose} {...options} />
  );

  return { showSnackbarAlert, SnackbarAlert: SnackBarAlertComponent };
};
