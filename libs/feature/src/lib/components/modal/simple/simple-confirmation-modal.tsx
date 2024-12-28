import { Modal, Box, Typography, Button } from '@mui/material';
import { FC } from 'react';

interface SimpleConfimationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onUnsuccessfully?: () => void;
  title: string;
  subTitle: string;
  yesButtonTitle?: string;
  noButtonTitle?: string;
}

export const SimpleConfimationModal: FC<SimpleConfimationModalProps> = ({
  open,
  title,
  subTitle,
  onClose,
  onSuccess,
  onUnsuccessfully,
  yesButtonTitle = 'Sim',
  noButtonTitle = 'Não',
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {subTitle}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Button variant="contained" color="success" onClick={onSuccess}>
            {yesButtonTitle}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onUnsuccessfully ? onUnsuccessfully : onClose}
          >
            {noButtonTitle}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
