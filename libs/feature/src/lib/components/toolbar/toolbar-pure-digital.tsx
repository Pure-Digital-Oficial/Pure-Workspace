import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CtaButton, ToolbarButtom } from '../buttom';
import { useLoggedUser } from '../../contexts';

interface ToolbarPureDigitalProps {
  loginTitle?: string;
  notifyTitle?: string;
  fill?: string;
  ctaButton: () => void;
  ctaButtonTitle?: string;
}

export const ToolbarPureDigital: FC<ToolbarPureDigitalProps> = ({
  loginTitle = 'Fazer Login',
  notifyTitle = 'Notificações',
  fill = '#D2EACF',
  ctaButton,
  ctaButtonTitle,
}) => {
  const navigate = useNavigate();
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const navigateTo = (input: string) => {
    navigate(input);
  };

  return (
    <Stack spacing={1} direction="row" sx={{ color: 'action.active' }}>
      {!smDown && (
        <CtaButton
          action={ctaButton}
          title={ctaButtonTitle}
          color="secondary"
          borderRadius={90}
        />
      )}
      <ToolbarButtom
        handleOpen={() => navigateTo('/login')}
        icon={<Person2OutlinedIcon fontSize="medium" sx={{ color: 'black' }} />}
        title={loginTitle}
      />
      {loggedUser?.id && (
        <ToolbarButtom
          handleOpen={() => navigateTo('/')}
          icon={
            <NotificationsNoneOutlinedIcon
              fontSize="medium"
              sx={{ color: 'black' }}
            />
          }
          title={notifyTitle}
          fill={fill}
        />
      )}
    </Stack>
  );
};
