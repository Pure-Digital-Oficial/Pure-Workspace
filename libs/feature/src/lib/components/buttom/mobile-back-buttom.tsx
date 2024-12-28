import { Icon, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MobileBackButtom = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={handleBack}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        borderRadius: theme.spacing(4),
        width: theme.spacing(7),
        height: theme.spacing(7),
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      <Icon
        sx={{
          fontSize: theme.spacing(4),
        }}
      >
        arrow_back
      </Icon>
    </IconButton>
  );
};
