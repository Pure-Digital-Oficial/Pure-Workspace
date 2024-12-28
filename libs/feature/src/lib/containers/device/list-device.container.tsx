import { Box, Grid, Icon, useTheme } from '@mui/material';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import {
  DeviceCard,
  DeviceModals,
  EmptyListResponse,
  ToolbarPureTV,
} from '../../components';
import { LayoutBase } from '../../layout';
import { CrudType, IconMenuItem } from '@pure-workspace/domain';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useListDeviceData, useSnackbarAlert } from '../../hooks';
import { ContainerCardList } from '../utils';
import { useLoggedUser } from '../../contexts';

export const ListDeviceContainer = () => {
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

  const { listDevice, totalPage, getListDeviceData } = useListDeviceData({
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
    getListDeviceData();
  };

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getListDeviceData();
      hasLoadedUserData.current = true;
    }
  }, [getListDeviceData]);

  const rightClickMenuList: IconMenuItem[] = [
    {
      icon: <Icon>playlist_add</Icon>,
      title: 'Novo Dispositivo',
      handleClick: async () => handlePopUpOpen('create'),
    },
  ];

  const renderDevices = () =>
    listDevice.length > 0 ? (
      listDevice.map((device) => (
        <Grid item key={device.id}>
          <DeviceCard
            key={device.id}
            name={device.name}
            addSchedulesToDevice={() => handlePopUpOpen('add', device.id)}
            deleteDevice={() => handlePopUpOpen('delete', device.id)}
            detailsDevice={() => handlePopUpOpen('details', device.id)}
            editDevice={() => handlePopUpOpen('edit', device.id)}
          />
        </Grid>
      ))
    ) : (
      <EmptyListResponse
        message="Sem Dispositivos"
        icon={
          <DesktopAccessDisabledIcon
            sx={{
              fontSize: theme.spacing(10),
            }}
          />
        }
      />
    );

  const searchData = async (input: string) => {
    getListDeviceData(input);
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getListDeviceData('', value);
  };

  return (
    <>
      <DeviceModals
        selectedId={selectedId}
        openModal={openModal}
        handlePopUpClose={handlePopUpClose}
        showAlert={showAlert}
      />
      <LayoutBase
        title="Listagem Dispositivos"
        iconMenuItemList={rightClickMenuList}
        toolBar={<ToolbarPureTV />}
      >
        <ContainerCardList
          handleChange={handleChange}
          search={{
            searchData: searchData,
            placeholder: 'Pesquisar Dispositivo',
            createPopUp: () => handlePopUpOpen('create'),
          }}
          totalPage={totalPage}
        >
          <Box display="flex" justifyContent="center" width="100%">
            <Grid display="flex" justifyContent="center" container spacing={2}>
              {renderDevices()}
            </Grid>
          </Box>
        </ContainerCardList>
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
