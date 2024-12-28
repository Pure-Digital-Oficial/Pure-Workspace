import {
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  IconMenuItem,
  ListSimpleCompanyResponseDto,
  StatusColor,
} from '@pure-workspace/domain';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Face3Icon from '@mui/icons-material/Face3';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FC } from 'react';
import { ButtonFileMenu } from '../../menu';
import { formatBrDate } from '../../../shared';

interface CompanyItemProps {
  company: ListSimpleCompanyResponseDto;
  deleteTitle?: string;
  editTitle?: string;
  detailsTitle?: string;
  listUsersByCompanyTitle?: string;
  removeUserAccessToTheCompanyTitle?: string;
  titleCnpj?: string;
  titleFantasyName?: string;
  titleCreatedBy?: string;
  titleCreatedAt?: string;
  titleId?: string;
  titleCity?: string;
  statusTitle?: string;
  statusColor: StatusColor;
  inModal: boolean;
  deleteCompany?: () => Promise<void>;
  editCompany?: () => Promise<void>;
  detailsCompany?: () => Promise<void>;
  listUsersByCompany?: () => Promise<void>;
  removeUserAccessToTheCompany?: () => Promise<void>;
}

export const CompanyItem: FC<CompanyItemProps> = ({
  company,
  deleteTitle = 'Deletar',
  editTitle = 'Editar',
  detailsTitle = 'Detalhes',
  listUsersByCompanyTitle = 'Usuários',
  removeUserAccessToTheCompanyTitle = 'Remover Acesso',
  titleCnpj = 'CNPJ',
  titleFantasyName = 'Nome Fantasia',
  titleCreatedBy = 'Criado por',
  titleCreatedAt = 'Criado em',
  titleId = 'Cod.',
  titleCity = 'Cidade',
  statusTitle = 'Status',
  statusColor,
  inModal,
  deleteCompany,
  editCompany,
  detailsCompany,
  listUsersByCompany,
  removeUserAccessToTheCompany,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const iconMenuList: IconMenuItem[] = [];

  if (deleteCompany) {
    iconMenuList.push({
      icon: <DeleteIcon />,
      title: deleteTitle,
      handleClick: deleteCompany,
    });
  }

  if (editCompany) {
    iconMenuList.push({
      icon: <EditIcon />,
      title: editTitle,
      handleClick: editCompany,
    });
  }

  if (listUsersByCompany) {
    iconMenuList.push({
      icon: <Face3Icon />,
      title: listUsersByCompanyTitle,
      handleClick: listUsersByCompany,
    });
  }

  if (detailsCompany) {
    iconMenuList.push({
      icon: <InfoIcon />,
      title: detailsTitle,
      handleClick: detailsCompany,
    });
  }

  if (removeUserAccessToTheCompany) {
    iconMenuList.push({
      icon: <DeleteForeverIcon />,
      title: removeUserAccessToTheCompanyTitle,
      handleClick: removeUserAccessToTheCompany,
    });
  }

  return (
    <Box key={company.id}>
      <ListItem>
        <ListItemText
          primary={company.socialReason}
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
                    sx={{ display: 'inline', fontSize: smDown ? 12 : 15 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {titleCnpj}:
                  </Typography>
                  <Typography
                    sx={{
                      display: 'inline',
                      marginLeft: theme.spacing(1),
                      fontSize: smDown ? 12 : 15,
                    }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {company.cnpj}
                  </Typography>
                </Box>
                <Box component="span">
                  <Typography
                    sx={{ display: 'inline', fontSize: smDown ? 12 : 15 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {titleFantasyName}:
                  </Typography>
                  <Typography
                    sx={{
                      display: 'inline',
                      marginLeft: theme.spacing(1),
                      fontSize: smDown ? 12 : 15,
                    }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {company.fantasyName}
                  </Typography>
                </Box>
              </Box>
              {!inModal && (
                <>
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
                        sx={{ display: 'inline', fontSize: smDown ? 12 : 15 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {titleId}:
                      </Typography>
                      <Typography
                        sx={{
                          display: 'inline',
                          marginLeft: theme.spacing(1),
                          fontSize: smDown ? 12 : 15,
                        }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {company.id}
                      </Typography>
                    </Box>
                    <Box component="span">
                      <Typography
                        sx={{ display: 'inline', fontSize: smDown ? 12 : 15 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {titleCity}:
                      </Typography>
                      <Typography
                        sx={{
                          display: 'inline',
                          marginLeft: theme.spacing(1),
                          fontSize: smDown ? 12 : 15,
                        }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {company.city}
                      </Typography>
                    </Box>
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
                        sx={{ display: 'inline', fontSize: smDown ? 12 : 15 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {titleCreatedBy}:
                      </Typography>
                      <Typography
                        sx={{
                          display: 'inline',
                          marginLeft: theme.spacing(1),
                          fontSize: smDown ? 12 : 15,
                        }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {company.createdBy}
                      </Typography>
                    </Box>
                    <Box component="span">
                      <Typography
                        sx={{ display: 'inline', fontSize: smDown ? 12 : 15 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {titleCreatedAt}:
                      </Typography>
                      <Typography
                        sx={{
                          display: 'inline',
                          marginLeft: theme.spacing(1),
                          fontSize: smDown ? 12 : 15,
                        }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {formatBrDate(new Date(company.createdAt))}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'end',
                      marginTop: theme.spacing(1),
                    }}
                  >
                    <Box component="span">
                      <Typography
                        sx={{ display: 'inline', fontSize: smDown ? 12 : 15 }}
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
                        label={company.status}
                      />
                    </Box>
                  </Box>
                </>
              )}
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
      <Divider sx={{ width: '100%' }} />
    </Box>
  );
};
