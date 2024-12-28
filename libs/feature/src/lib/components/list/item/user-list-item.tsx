import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  Chip,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { IconMenuItem, StatusColor, UserList } from '@pure-workspace/domain';
import { FC } from 'react';
import { ButtonFileMenu } from '../../menu';

interface UserListItemProps {
  user: UserList;
  inModal: boolean;
  statusColor: StatusColor;
  editUser?: () => Promise<void>;
  deleteUser?: () => Promise<void>;
  authorizeUser?: () => Promise<void>;
  addUserToAnotherCompany?: () => Promise<void>;
  listCompanyByUserId?: () => Promise<void>;
  changeUserType?: () => Promise<void>;
  deleteUserTitle?: string;
  editUserTitle?: string;
  authorizeUserTitle?: string;
  addUserToAnotherCompanyTitle?: string;
  listCompanyByUserIdTitle?: string;
  changeUserTypeTitle?: string;
  nicknameTitle?: string;
  statusTitle?: string;
  idTitle?: string;
  emailTitle?: string;
}

export const UserListItem: FC<UserListItemProps> = ({
  user,
  statusColor,
  inModal,
  editUser,
  deleteUser,
  authorizeUser,
  addUserToAnotherCompany,
  listCompanyByUserId,
  changeUserType,
  addUserToAnotherCompanyTitle = 'Adionar Empresa',
  authorizeUserTitle = 'Autorizar Usuário',
  deleteUserTitle = 'Deletar',
  editUserTitle = 'Editar',
  listCompanyByUserIdTitle = 'Empresas',
  changeUserTypeTitle = 'Alterar Tipo',
  nicknameTitle = 'Nickname',
  statusTitle = 'Status',
  idTitle = 'ID',
  emailTitle = 'Email',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const iconMenuList: IconMenuItem[] = [];

  if (deleteUser) {
    iconMenuList.push({
      icon: <DeleteIcon />,
      title: deleteUserTitle,
      handleClick: deleteUser,
    });
  }

  if (editUser) {
    iconMenuList.push({
      icon: <EditIcon />,
      title: editUserTitle,
      handleClick: editUser,
    });
  }

  if (authorizeUser) {
    iconMenuList.push({
      icon: <VerifiedUserIcon />,
      title: authorizeUserTitle,
      handleClick: authorizeUser,
    });
  }

  if (addUserToAnotherCompany) {
    iconMenuList.push({
      icon: <AddBusinessIcon />,
      title: addUserToAnotherCompanyTitle,
      handleClick: addUserToAnotherCompany,
    });
  }

  if (listCompanyByUserId) {
    iconMenuList.push({
      icon: <ApartmentIcon />,
      title: listCompanyByUserIdTitle,
      handleClick: listCompanyByUserId,
    });
  }

  if (changeUserType) {
    iconMenuList.push({
      icon: <AdminPanelSettingsIcon />,
      title: changeUserTypeTitle,
      handleClick: changeUserType,
    });
  }

  return (
    <Box width="100%" key={user.userId}>
      <ListItem key={user.userId}>
        {!smDown && (
          <ListItemAvatar>
            <Avatar
              component="span"
              sx={{
                width: theme.spacing(7),
                height: theme.spacing(7),
                marginRight: theme.spacing(2),
              }}
              alt={user.name}
              src={''}
            />
          </ListItemAvatar>
        )}
        <ListItemText
          primary={user.name}
          secondary={
            <Box
              component="span"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box component="span">
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {idTitle}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: theme.spacing(1) }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {user.userId}
                  </Typography>
                </Box>
                {!inModal && (
                  <Box component="span">
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {statusTitle}:
                    </Typography>
                    <Chip
                      component="span"
                      sx={{
                        marginLeft: theme.spacing(1),
                      }}
                      color={statusColor}
                      label={user.status}
                    />
                  </Box>
                )}
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: theme.spacing(1),
                }}
              >
                <Box component="span">
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {nicknameTitle}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: theme.spacing(1) }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {user.nickname}
                  </Typography>
                </Box>
                {!inModal && (
                  <Box component="span">
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {emailTitle}:
                    </Typography>
                    <Typography
                      sx={{ display: 'inline', marginLeft: theme.spacing(1) }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {user.email}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          }
        />
        <Box
          sx={{
            marginLeft: smDown ? 0 : theme.spacing(2),
          }}
        >
          <ButtonFileMenu iconMenuItemList={iconMenuList} />
        </Box>
      </ListItem>
      <Divider
        variant="inset"
        component="li"
        sx={{
          marginLeft: inModal ? 0 : 'auto',
        }}
      />
    </Box>
  );
};
