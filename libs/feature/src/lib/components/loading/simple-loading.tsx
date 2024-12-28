import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

interface SimpleLoadingProps {
  open: boolean;
}

export const SimpleLoading: FC<SimpleLoadingProps> = ({ open }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.modal + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
