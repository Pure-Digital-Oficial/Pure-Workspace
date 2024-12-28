import { List, useTheme } from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {
  UserListItem,
  ToolbarPureTV,
  EmptyListResponse,
  UserModals,
} from '../../components';
import { LayoutBase } from '../../layout';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { UserPopupType } from '@pure-workspace/domain';
import { useListUserData, useSnackbarAlert } from '../../hooks';
import { useLoggedUser } from '../../contexts';
import { ContainerSimpleList } from '../utils';

interface ListUserContainerProps {
  toolbar?: ReactNode;
}

export const ListUserContainer: FC<ListUserContainerProps> = ({
  toolbar = <ToolbarPureTV />,
}) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const theme = useTheme();
  const { loggedUser } = useLoggedUser();
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const [openModal, setOpenModal] = useState({
    create: false,
    delete: false,
    edit: false,
    'add-company': false,
    'list-company': false,
    'change-type': false,
  });
  const hasLoadedUserData = useRef(false);

  const showAlert = useCallback(
    (message: string, success: boolean) => {
      showSnackbarAlert({
        message: message,
        severity: success ? 'success' : 'error',
      });
    },
    [showSnackbarAlert]
  );

  const { getListUserData, listUsers, totalPage } = useListUserData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
  });

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getListUserData('', value);
  };

  const handlePopUpOpen = async (type: UserPopupType, id?: string) => {
    setSelectedId(id ?? '');
    setOpenModal((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handlePopUpClose = async (type: UserPopupType) => {
    setOpenModal((prev) => ({
      ...prev,
      [type]: false,
    }));
    getListUserData();
  };

  const searchData = async (input: string) => {
    getListUserData(input);
  };

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getListUserData();
      hasLoadedUserData.current = true;
    }
  }, [getListUserData]);

  return (
    <>
      <UserModals
        handlePopUpClose={handlePopUpClose}
        openModal={openModal}
        showAlert={showAlert}
        selectedId={selectedId}
      />
      <LayoutBase title="Listagem de Usuários" toolBar={toolbar}>
        <ContainerSimpleList
          search={{
            placeholder: 'Pesquisar por agendamento',
            searchData: searchData,
          }}
          totalPage={totalPage}
          handleChange={handleChange}
        >
          <List
            sx={{
              width: '100%',
            }}
          >
            {listUsers.length > 0 ? (
              listUsers.map((user) => (
                <UserListItem
                  inModal={false}
                  deleteUser={async () =>
                    handlePopUpOpen('delete', user.userId)
                  }
                  editUser={async () => handlePopUpOpen('edit', user.userId)}
                  addUserToAnotherCompany={async () =>
                    handlePopUpOpen('add-company', user.userId)
                  }
                  listCompanyByUserId={async () =>
                    handlePopUpOpen('list-company', user.userId)
                  }
                  changeUserType={async () =>
                    handlePopUpOpen('change-type', user.userId)
                  }
                  key={user.userId}
                  user={user}
                  statusColor={user.status === 'ACTIVE' ? 'success' : 'error'}
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
        </ContainerSimpleList>
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
