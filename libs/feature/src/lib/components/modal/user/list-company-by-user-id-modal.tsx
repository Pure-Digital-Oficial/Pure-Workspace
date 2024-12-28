import { FC, useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useListCompaniesByUserIdData } from '../../../hooks';
import { CompanyItem, EmptyListResponse } from '../../list';
import StoreIcon from '@mui/icons-material/Store';
import { SearchContainerModal } from '../container';
import { RemoveUserAccessToTheCompanyModal } from '../company';
import { useLoggedUser } from '../../../contexts';

interface ListCompanyByUserIdModalProps {
  userId: string;
  open: boolean;
  title?: string;
  removeUserAccessToTheCompanyTitle?: string;
  removeUserAccessToTheCompanySubTitle?: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
}

export const ListCompanyByUserIdModal: FC<ListCompanyByUserIdModalProps> = ({
  userId,
  open,
  handlePopUpClose,
  showAlert,
  title = 'Empresas',
  removeUserAccessToTheCompanyTitle = 'Remover Acesso à Empresa',
  removeUserAccessToTheCompanySubTitle = 'Deseja realmente remover o acesso a essa empresa?',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedId, setSelectedId] = useState('');
  const [openModal, setOpenModal] = useState({
    'remove-company': false,
  });

  const { listCompaniesByUser, getListCompaniesByUserData } =
    useListCompaniesByUserIdData({
      showAlert,
      loggedUserId: loggedUser?.id ?? '',
      userId,
    });

  useEffect(() => {
    if (open) {
      getListCompaniesByUserData();
    }
  }, [getListCompaniesByUserData, open]);

  const handlePopUpOpen = async (type: 'remove-company', id?: string) => {
    setSelectedId(id ?? '');
    setOpenModal((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handleInModalPopUpClose = async (type: 'remove-company') => {
    setOpenModal((prev) => ({
      ...prev,
      [type]: false,
    }));
    getListCompaniesByUserData();
  };

  const renderCompanies = () =>
    listCompaniesByUser.length > 0 ? (
      listCompaniesByUser.map((company) => (
        <CompanyItem
          key={company.id}
          statusColor={company.status === 'ACTIVE' ? 'success' : 'error'}
          company={company}
          inModal={true}
          removeUserAccessToTheCompany={async () =>
            handlePopUpOpen('remove-company', company.id)
          }
        />
      ))
    ) : (
      <EmptyListResponse
        message="Sem Empresas"
        icon={<StoreIcon sx={{ fontSize: theme.spacing(10) }} />}
      />
    );

  const searchCompany = async (input: string) => {
    console.log('pesquisou');
  };

  return (
    <>
      <RemoveUserAccessToTheCompanyModal
        companyId={selectedId}
        handlePopUpClose={() => handleInModalPopUpClose('remove-company')}
        open={openModal['remove-company']}
        showAlert={showAlert}
        title={removeUserAccessToTheCompanyTitle}
        subTitle={removeUserAccessToTheCompanySubTitle}
        userId={userId}
      />
      <SearchContainerModal
        height={smDown ? theme.spacing(55) : theme.spacing(80)}
        width={mdDown ? '90%' : theme.spacing(100)}
        open={open}
        handlePopUpClose={handlePopUpClose}
        title={title}
        search={{
          placeholder: 'aa',
          searchData: searchCompany,
        }}
      >
        <Box sx={{ padding: theme.spacing(2) }}>{renderCompanies()}</Box>
      </SearchContainerModal>
    </>
  );
};
