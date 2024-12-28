export interface SnackbarAlertProps {
  open: boolean;
  duration?: number;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  handleClose: () => void;
}
