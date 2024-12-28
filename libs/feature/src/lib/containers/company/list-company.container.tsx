import { List, useTheme } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import { useLoggedUser } from '../../contexts';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  CompanyPopUp,
  CompanyPopupType,
  IconMenuItem,
} from '@pure-workspace/domain';
import { useSnackbarAlert, useListCompaniesByUserIdData } from '../../hooks';
import { ContainerSimpleList } from '../utils';
import { LayoutBase } from '../../layout';
import {
  CompanyItem,
  EmptyListResponse,
  ToolbarPureTV,
  CompanyModals,
} from '../../components';

interface ListCompanyContainerProps {
  createCompanyButtonTitle?: string;
}

export const ListCompanyContainer: FC<ListCompanyContainerProps> = ({
  createCompanyButtonTitle = 'Nova Empresa',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const [selectedId, setSelectedId] = useState<string>('');
  const [openModal, setOpenModal] = useState<CompanyPopUp>({
    create: false,
    delete: false,
    edit: false,
    details: false,
    'list-users': false,
    'remove-access': false,
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

  const { listCompaniesByUser, getListCompaniesByUserData, totalPage } =
    useListCompaniesByUserIdData({
      showAlert,
      loggedUserId: loggedUser?.id ?? '',
      userId: loggedUser?.id ?? '',
    });

  const handlePopUpOpen = async (type: CompanyPopupType, id?: string) => {
    setSelectedId(id ?? '');
    setOpenModal((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handlePopUpClose = async (type: CompanyPopupType) => {
    setOpenModal((prev) => ({
      ...prev,
      [type]: false,
    }));
    getListCompaniesByUserData();
  };

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getListCompaniesByUserData();
      hasLoadedUserData.current = true;
    }
  }, [getListCompaniesByUserData]);

  const searchData = async (input: string) => {
    getListCompaniesByUserData(input);
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getListCompaniesByUserData('', value);
  };

  const renderCompanies = () =>
    listCompaniesByUser.length > 0 ? (
      listCompaniesByUser.map((company) => (
        <CompanyItem
          key={company.id}
          statusColor={company.status === 'ACTIVE' ? 'success' : 'error'}
          deleteCompany={() => handlePopUpOpen('delete', company.id)}
          editCompany={() => handlePopUpOpen('edit', company.id)}
          detailsCompany={() => handlePopUpOpen('details', company.id)}
          listUsersByCompany={() => handlePopUpOpen('list-users', company.id)}
          removeUserAccessToTheCompany={() =>
            handlePopUpOpen('remove-access', company.id)
          }
          company={company}
          inModal={false}
          removeUserAccessToTheCompanyTitle="Remover Meu Acesso"
        />
      ))
    ) : (
      <EmptyListResponse
        message="Sem Empresas"
        icon={<StoreIcon sx={{ fontSize: theme.spacing(10) }} />}
      />
    );

  const rightClickMenuList: IconMenuItem[] = [
    {
      icon: <AddBusinessIcon />,
      title: createCompanyButtonTitle,
      handleClick: () => handlePopUpOpen('create'),
    },
  ];

  return (
    <>
      <CompanyModals
        selectedId={selectedId}
        openModal={openModal}
        handlePopUpClose={handlePopUpClose}
        showAlert={showAlert}
        userId={loggedUser?.id ?? ''}
      />
      <LayoutBase
        title="Listagem de Empresas"
        iconMenuItemList={rightClickMenuList}
        toolBar={<ToolbarPureTV />}
      >
        <ContainerSimpleList
          search={{
            placeholder: 'Pesquisar Empresa',
            searchData: searchData,
            createPopUp: () => handlePopUpOpen('create'),
          }}
          totalPage={totalPage}
          handleChange={handleChange}
        >
          <List>{renderCompanies()}</List>
        </ContainerSimpleList>
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
