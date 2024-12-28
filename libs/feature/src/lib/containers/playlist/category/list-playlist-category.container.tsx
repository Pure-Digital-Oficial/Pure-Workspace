import { Icon, List, useTheme } from '@mui/material';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import {
  EmptyListResponse,
  PlaylistCategoryItem,
  PlaylistCategoryModals,
  ToolbarPureTV,
} from '../../../components';
import { LayoutBase } from '../../../layout';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useListPlaylistCategoryData, useSnackbarAlert } from '../../../hooks';
import { CrudType, IconMenuItem } from '@pure-workspace/domain';
import { useLoggedUser } from '../../../contexts';
import { ContainerSimpleList } from '../../utils';

export const ListPlaylistCategoryContainer = () => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const [selectedId, setSelectedId] = useState<string>('');
  const [openModal, setOpenModal] = useState({
    create: false,
    delete: false,
    edit: false,
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

  const { listPlaylistCategory, totalPage, getPlaylistCategoryData } =
    useListPlaylistCategoryData({
      showAlert,
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
    });

  const handlePopUpOpen = async (type: CrudType, id?: string) => {
    setSelectedId(id ?? '');
    setOpenModal((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handlePopUpClose = async (type: CrudType) => {
    setOpenModal((prev) => ({
      ...prev,
      [type]: false,
    }));
    getPlaylistCategoryData();
  };

  const renderPlaylistCategory = () =>
    listPlaylistCategory.length > 0 ? (
      listPlaylistCategory.map((category) => (
        <PlaylistCategoryItem
          key={category.id}
          editPlaylistCategory={() => handlePopUpOpen('edit', category.id)}
          deletePlaylistCategory={() => handlePopUpOpen('delete', category.id)}
          category={category}
        />
      ))
    ) : (
      <EmptyListResponse
        message="Sem Categorias"
        icon={
          <DoNotTouchIcon
            sx={{
              fontSize: theme.spacing(10),
            }}
          />
        }
      />
    );

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getPlaylistCategoryData();
      hasLoadedUserData.current = true;
    }
  }, [getPlaylistCategoryData]);

  const searchData = async (input: string) => {
    getPlaylistCategoryData(input);
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getPlaylistCategoryData('', value);
  };

  const rightClickMenuList: IconMenuItem[] = [
    {
      icon: <Icon>category</Icon>,
      title: 'Nova Categoria',
      handleClick: async () => handlePopUpOpen('create'),
    },
  ];

  return (
    <>
      <PlaylistCategoryModals
        companyId={loggedUser?.selectedCompany.id ?? ''}
        selectedId={selectedId}
        openModal={openModal}
        handlePopUpClose={handlePopUpClose}
        showAlert={showAlert}
      />
      <LayoutBase
        title="Listagem de Categoria da Playlist"
        iconMenuItemList={rightClickMenuList}
        toolBar={<ToolbarPureTV />}
      >
        <ContainerSimpleList
          handleChange={handleChange}
          search={{
            placeholder: 'Buscar por categoria',
            searchData: searchData,
            createPopUp: () => handlePopUpOpen('create'),
          }}
          totalPage={totalPage}
        >
          <List> {renderPlaylistCategory()} </List>
        </ContainerSimpleList>
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
