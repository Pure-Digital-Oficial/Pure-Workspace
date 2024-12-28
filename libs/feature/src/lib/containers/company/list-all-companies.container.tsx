import { List, useTheme } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import { useLoggedUser } from '../../contexts';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  CompanyPopUp,
  CompanyPopupType,
  IconMenuItem,
} from '@pure-workspace/domain';
import { useSnackbarAlert, useListCompanyData } from '../../hooks';
import { ContainerSimpleList } from '../utils';
import { LayoutBase } from '../../layout';
import {
  CompanyItem,
  EmptyListResponse,
  ToolbarPureTV,
  CompanyModals,
} from '../../components';

interface ListAllCompaniesContainerProps {
  createCompanyButtonTitle?: string;
  toolbar?: ReactNode;
}

export const ListAllCompaniesContainer: FC<ListAllCompaniesContainerProps> = ({
  createCompanyButtonTitle = 'Nova Empresa',
  toolbar = <ToolbarPureTV />,
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

  const { listCompany, getListCompanyData, totalPage } = useListCompanyData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
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
    getListCompanyData();
  };

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getListCompanyData();
      hasLoadedUserData.current = true;
    }
  }, [getListCompanyData]);

  const searchData = async (input: string) => {
    getListCompanyData(input);
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getListCompanyData('', value);
  };

  const renderCompanies = () =>
    listCompany.length > 0 ? (
      listCompany.map((company) => (
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
      />
      <LayoutBase
        title="Listagem de Empresas"
        iconMenuItemList={rightClickMenuList}
        toolBar={toolbar}
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
