import { Box, IconButton, LinearProgress, Typography } from '@mui/material';
import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface ProgressFilePopUpProps {
  progress: number;
  handleClose: () => void;
}

export const ProgressFilePopUp: FC<ProgressFilePopUpProps> = ({
  progress,
  handleClose,
}) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        width: 300,
        display: 'flex',
        alignItems: 'center',
        position: 'fixed' as 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: '80%' }}
      />
      <Box ml={2}>
        <Typography variant="body2">{progress}%</Typography>
      </Box>
      <Box
        sx={{
          marginRight: -1,
        }}
      >
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
