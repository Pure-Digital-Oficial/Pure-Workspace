import { useMediaQuery, useTheme } from '@mui/material';
import { FormCard, FormEditUser, ToolbarPureTV } from '../../components';
import { LayoutBase } from '../../layout';
import { useSnackbarAlert } from '../../hooks';

export const EditUserContainer = () => {
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const showErrorAlert = (message: string) => {
    showSnackbarAlert({
      message: message,
      severity: 'error',
    });
  };

  return (
    <>
      <LayoutBase title="Editar Usuário" toolBar={<ToolbarPureTV />}>
        {!smDown && (
          <FormCard
            title="Editar os dados do Usuário"
            height={theme.spacing(63)}
            width={mdDown ? theme.spacing(60) : theme.spacing(100)}
          >
            <FormEditUser
              showAlert={showErrorAlert}
              nameLabel="Digite o nome"
              birthDateLabel="Digite sua Data de Nascimento"
            />
          </FormCard>
        )}

        {smDown && (
          <FormEditUser
            showAlert={showErrorAlert}
            nameLabel="Digite o nome"
            birthDateLabel="Digite sua Data de Nascimento"
          />
        )}
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
