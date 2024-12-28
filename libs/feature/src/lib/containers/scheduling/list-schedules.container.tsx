import { List, useTheme } from '@mui/material';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { LayoutBase } from '../../layout';
import {
  EmptyListResponse,
  SchedulingItem,
  SchedulingModals,
  ToolbarPureTV,
} from '../../components';
import { ContainerSimpleList } from '../utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CrudType, IconMenuItem } from '@pure-workspace/domain';
import { useListSchedulesData, useSnackbarAlert } from '../../hooks';
import { useLoggedUser } from '../../contexts';

export const ListSchedulesContainer = () => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const [selectedId, setSelectedId] = useState<string>('');
  const [openModal, setOpenModal] = useState({
    create: false,
    delete: false,
    edit: false,
    details: false,
    add: false,
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

  const { listSchedules, totalPage, getListSchedulesData } =
    useListSchedulesData({
      showAlert,
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
    });

  const handlePopUpOpen = async (type: CrudType | 'add', id?: string) => {
    setSelectedId(id ?? '');
    setOpenModal((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handlePopUpClose = async (type: CrudType | 'add') => {
    setOpenModal((prev) => ({
      ...prev,
      [type]: false,
    }));
    getListSchedulesData();
  };

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getListSchedulesData();
      hasLoadedUserData.current = true;
    }
  }, [getListSchedulesData]);

  const searchData = async (input: string) => {
    getListSchedulesData(input);
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getListSchedulesData('', value);
  };

  const renderSchedules = () =>
    listSchedules.length > 0 ? (
      listSchedules.map((scheduling) => (
        <SchedulingItem
          editScheduling={() => handlePopUpOpen('edit', scheduling.id)}
          deleteScheduling={() => handlePopUpOpen('delete', scheduling.id)}
          addPlaylistToScheduling={() => handlePopUpOpen('add', scheduling.id)}
          detailsScheduling={() => handlePopUpOpen('details', scheduling.id)}
          key={scheduling.id}
          scheduling={scheduling}
        />
      ))
    ) : (
      <EmptyListResponse
        message="Sem Agendamentos"
        icon={
          <EventBusyIcon
            sx={{
              fontSize: theme.spacing(10),
            }}
          />
        }
      />
    );

  const rightClickMenuList: IconMenuItem[] = [
    {
      icon: <AlarmAddIcon />,
      title: 'Novo Agendamento',
      handleClick: async () => handlePopUpOpen('create'),
    },
  ];

  return (
    <>
      <SchedulingModals
        selectedId={selectedId}
        openModal={openModal}
        handlePopUpClose={handlePopUpClose}
        showAlert={showAlert}
      />
      <LayoutBase
        title="Listagem Agendamentos"
        iconMenuItemList={rightClickMenuList}
        toolBar={<ToolbarPureTV />}
      >
        <ContainerSimpleList
          search={{
            placeholder: 'Pesquisar por agendamento',
            searchData: searchData,
            createPopUp: () => handlePopUpOpen('create'),
          }}
          totalPage={totalPage}
          handleChange={handleChange}
        >
          <List> {renderSchedules()} </List>
        </ContainerSimpleList>
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
