import { Box, List, Popper, useTheme } from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { FC, useEffect, useState } from 'react';
import { useLoggedUser } from '../../../contexts';
import { useFindUnauthorizedUsersByCompanyIdData } from '../../../hooks';
import { ScrollBox } from '../../scroll';
import { EmptyListResponse, UserListItem } from '../../list';
import { AuthorizeUserModal } from '../../modal';

interface ListUnauthorizedUsersPopperProps {
  open: boolean;
  id: string;
  anchorEl: null | HTMLElement;
  showAlert: (message: string, success: boolean) => void;
  onMove: (move: boolean) => void;
}

export const ListUnauthorizedUsersPopper: FC<
  ListUnauthorizedUsersPopperProps
> = ({ id, open, anchorEl, showAlert, onMove }) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const [authorizeUserPopUp, setAuthorizeUserPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  const { getUnauthorizedUsersByCompanyIdData, userList } =
    useFindUnauthorizedUsersByCompanyIdData({
      showAlert,
      companyId: loggedUser?.selectedCompany.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
    });

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && id && !dataLoaded) {
      getUnauthorizedUsersByCompanyIdData();
      setDataLoaded(true);
    }
  }, [id, dataLoaded, open, getUnauthorizedUsersByCompanyIdData]);

  const handleAuthOpen = (id: string) => {
    setSelectedId(id);
    setAuthorizeUserPopUp(true);
  };

  const handleAuthClose = () => {
    setSelectedId('');
    setAuthorizeUserPopUp(false);
    onMove(true);
    getUnauthorizedUsersByCompanyIdData();
  };

  return (
    <>
      <AuthorizeUserModal
        handlePopUpClose={() => handleAuthClose()}
        idToAuthorized={selectedId}
        open={authorizeUserPopUp}
        showAlert={showAlert}
        title="Autorizar Usuário"
        subTitle="Você Deseja autorizar este usuário a acessar sua Empresa?"
      />
      <Box>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            <ScrollBox maxHeight="80%">
              <List
                sx={{
                  width: '100%',
                }}
              >
                {userList.length > 0 ? (
                  userList.map((user) => (
                    <UserListItem
                      key={user.userId}
                      user={user}
                      inModal={true}
                      statusColor={
                        user.status === 'ACTIVE' ? 'success' : 'error'
                      }
                      authorizeUser={async () => handleAuthOpen(user.userId)}
                    />
                  ))
                ) : (
                  <EmptyListResponse
                    message="Sem Usuários"
                    icon={
                      <PersonOffIcon
                        sx={{
                          fontSize: theme.spacing(10),
                        }}
                      />
                    }
                  />
                )}
              </List>
            </ScrollBox>
          </Box>
        </Popper>
      </Box>
    </>
  );
};
