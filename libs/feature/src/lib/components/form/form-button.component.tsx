import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { grey, green } from '@mui/material/colors';
import { FC } from 'react';

interface FormButtonProps {
  buttonTitle: string;
  loading: boolean;
  success: boolean;
  buttonRight?: () => void;
  buttonLeft?: () => void;
  bgColor?: string;
  variant?: 'contained' | 'outlined';
}

export const FormButton: FC<FormButtonProps> = ({
  buttonTitle,
  loading = false,
  success = false,
  buttonRight,
  buttonLeft,
  bgColor = 'primary',
  variant = 'contained',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

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
      <Button
        type="submit"
        fullWidth
        variant={variant}
        sx={
          success
            ? buttonSx
            : {
                margin: theme.spacing(1),
                height: smDown ? theme.spacing(6) : theme.spacing(7),
                fontSize: '1rem',
                bgcolor: loading ? grey[500] : bgColor,
                '&:hover': {
                  bgcolor: loading ? grey[700] : bgColor,
                },
              }
        }
      >
        {buttonTitle}
        {loading && (
          <CircularProgress
            sx={{
              mt: theme.spacing(1),
              mb: theme.spacing(1),
              height: theme.spacing(8),
              color: 'white',
              position: 'absolute',
            }}
          />
        )}
      </Button>
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
