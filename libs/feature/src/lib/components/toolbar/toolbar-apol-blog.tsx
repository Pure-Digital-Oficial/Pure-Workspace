import { Stack } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToolbarButtom } from '../buttom';
import { useLoggedUser } from '../../contexts';

interface ToolbarApolBlogProps {
  loginTitle?: string;
  notifyTitle?: string;
  fill?: string;
}

export const ToolbarApolBlog: FC<ToolbarApolBlogProps> = ({
  loginTitle = 'Fazer Login',
  notifyTitle = 'Notificações',
  fill = '#D2EACF',
}) => {
  const navigate = useNavigate();
  const { loggedUser } = useLoggedUser();
  const navigateTo = () => {
    navigate('login');
  };

  return (
    <Stack spacing={1} direction="row" sx={{ color: 'action.active' }}>
      <ToolbarButtom
        handleOpen={navigateTo}
        icon={<Person2OutlinedIcon fontSize="large" sx={{ color: 'black' }} />}
        title={loginTitle}
        fill={fill}
      />
      {loggedUser?.id && (
        <ToolbarButtom
          handleOpen={navigateTo}
          icon={
            <NotificationsNoneOutlinedIcon
              fontSize="large"
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
