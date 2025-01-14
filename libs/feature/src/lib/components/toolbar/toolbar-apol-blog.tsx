import { Stack } from '@mui/material';
import { ToolbarButtom } from '../buttom';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { FC } from 'react';

interface ToolbarApolBlogProps {
  loginTitle?: string;
  fill?: string;
}

export const ToolbarApolBlog: FC<ToolbarApolBlogProps> = ({
  loginTitle = 'Fazer Login',
  fill = '#D2EACF',
}) => {
  const navigateTo = () => {};

  return (
    <Stack spacing={1} direction="row" sx={{ color: 'action.active' }}>
      <ToolbarButtom
        handleOpen={navigateTo}
        icon={<Person2OutlinedIcon fontSize="large" sx={{ color: 'black' }} />}
        title={loginTitle}
        fill={fill}
      />

      {/* {loggedUser?.type !== 'DEFAULT' && (
          <ToolbarButtom
            handleOpen={handleListUsersOpen}
            icon={<GroupIcon fontSize="large" color="primary" />}
            title={listUserTitle}
            badgeContent={totalUsers}
          />
        )} */}
    </Stack>
  );
};
