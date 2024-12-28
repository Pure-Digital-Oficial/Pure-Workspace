import {
  Box,
  Button,
  Icon,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { appLogout } from '../../../services';
import { useAppThemeContext, useLoggedUser } from '../../../contexts';
import { CompanySimpleResponseDto, LoggedUser } from '@pure-workspace/domain';
import { useListCompaniesByUserIdData } from '../../../hooks';

interface DrawerConfigurationProps {
  logoutTitle: string;
  themeTitle: string;
  companyLabel?: string;
  companyList?: boolean;
  showAlert: (message: string, success: boolean) => void;
}

export const DrawerConfiguration: FC<DrawerConfigurationProps> = ({
  logoutTitle,
  themeTitle,
  companyList = true,
  companyLabel = 'Alterar Empresa',
  showAlert,
}) => {
  const theme = useTheme();
  const { toggleTheme } = useAppThemeContext();
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const [selectedCompany, setSelectedCompany] = useState('');
  const hasLoadedUserData = useRef(false);

  const { listCompaniesByUser, getListCompaniesByUserData } =
    useListCompaniesByUserIdData({
      showAlert,
      loggedUserId: loggedUser?.id ?? '',
      userId: loggedUser?.id ?? '',
    });

  const logout = () => {
    appLogout();
    setLoggedUser(null);
  };

  useEffect(() => {
    if (loggedUser?.id && !hasLoadedUserData.current) {
      handleData();
    }
  });

  const handleData = async () => {
    await getListCompaniesByUserData().then(() => {
      if (listCompaniesByUser.length > 0) {
        hasLoadedUserData.current = true;
        setLoggedUser({
          ...(loggedUser ?? ({} as LoggedUser)),
          companies: listCompaniesByUser ?? ([] as CompanySimpleResponseDto[]),
        });
        setSelectedCompany(loggedUser?.selectedCompany.id ?? '');
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredCompany: CompanySimpleResponseDto =
      loggedUser?.companies.filter(
        (item) => item.id === event.target.value
      )[0] ?? ({} as CompanySimpleResponseDto);
    setSelectedCompany(event.target.value);
    setLoggedUser({
      ...(loggedUser ?? ({} as LoggedUser)),
      selectedCompany: filteredCompany,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
      }}
    >
      {companyList && (
        <TextField
          fullWidth
          select
          value={selectedCompany}
          margin="normal"
          id="companyId"
          label={companyLabel}
          onChange={handleChange}
          SelectProps={{
            renderValue: (value) => {
              const selectedItem = loggedUser?.companies.find(
                (item) => item.id === value
              );
              return selectedItem
                ? selectedItem.socialReason.split(' ')[0]
                : '';
            },
          }}
        >
          {loggedUser?.companies.map((item: CompanySimpleResponseDto) => (
            <MenuItem key={item.id} value={item.id}>
              {item.socialReason}
            </MenuItem>
          ))}
        </TextField>
      )}
      <Button
        onClick={logout}
        color="inherit"
        sx={{
          marginBottom: theme.spacing(0.5),
        }}
        startIcon={<Icon>logout</Icon>}
      >
        <Typography>{logoutTitle}</Typography>
      </Button>

      <Button
        onClick={toggleTheme}
        color="inherit"
        startIcon={<Icon>dark_mode</Icon>}
      >
        <Typography>{themeTitle}</Typography>
      </Button>
    </Box>
  );
};
