import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FC } from 'react';

interface NavigationButtonProps {
  buttonRight?: () => void;
  buttonLeft?: () => void;
  step: number;
  totalSteps: number;
}

export const NavigationButton: FC<NavigationButtonProps> = ({
  step,
  totalSteps,
  buttonLeft,
  buttonRight,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {buttonLeft && (
        <IconButton
          style={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          }}
          onClick={buttonLeft}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}
      <Typography marginRight={theme.spacing(2)} marginLeft={theme.spacing(2)}>
        {step}/{totalSteps}
      </Typography>
      {buttonRight && (
        <IconButton
          style={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          }}
          onClick={buttonRight}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>
  );
};
