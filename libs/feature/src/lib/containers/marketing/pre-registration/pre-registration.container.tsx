import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FormPreRegistration } from '../../../components';
import { CreatePreRegistrationDto, ErrorResponse } from '@pure-workspace/domain';
import { CreatePreRegistrationRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { useSnackbarAlert } from '../../../hooks';

interface PreRegistrationContainerProps {
  title: string;
  textColor?: string;
  backgroundColor?: string;
  backgroundCardColor?: string;
  phone: string;
  preRegistration?: {
    nameLabel?: string;
    companyNameLabel?: string;
    branchOfTheCompanyLabel?: string;
    ladingpageUseLabel?: string;
    ladingpageUseList?: string[];
    ladingPageemphasisLabel?: string;
    ladingPageemphasisList?: string[];
  };
}

export const PreRegistrationContainer: FC<PreRegistrationContainerProps> = ({
  title,
  phone,
  textColor = '#fff',
  backgroundColor = '#111111',
  backgroundCardColor = 'radial-gradient(ellipse at bottom right, #700B0E, #1E1E1E, #9C1B1F, #9C1B1F, #1E1E1E, #9C1B1F)',
  preRegistration = {
    companyNameLabel: 'Nome da Empresa',
    nameLabel: 'Nome',
    branchOfTheCompanyLabel: 'Ramo da Empresa',
    ladingpageUseLabel: 'Para que você quer usar sua landing page?',
    ladingpageUseList: [
      'Gerar vendas',
      'Capturar contatos (leads)',
      'Divulgar algo (evento, marca, etc.)',
    ],
    ladingPageemphasisLabel:
      'Você já sabe o que gostaria de destacar na sua landing page?',
    ladingPageemphasisList: [
      'Sim, já tenho uma ideia clara.',
      'Tenho algumas ideias, mas preciso de orientação.',
      'Não, preciso de ajuda desde o início.',
    ],
  },
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const [preRegistrationId, setPreRegistrationId] = useState('');

  const showAlert = useCallback(
    (message: string, success: boolean) => {
      showSnackbarAlert({
        message: message,
        severity: success ? 'success' : 'error',
      });
    },
    [showSnackbarAlert]
  );

  const createPreRegistration = useCallback(
    async (input: CreatePreRegistrationDto) => {
      try {
        const result = await CreatePreRegistrationRequest(input);
        if (result) {
          setPreRegistrationId(result.preRegisrationId);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Pre Cadastro');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );
  const isPreRegistrationCreated = useRef(false);
  useEffect(() => {
    if (!isPreRegistrationCreated.current) {
      const urlParams = new URLSearchParams(window.location.search);
      const sendingId = urlParams.get('sending_id');
      if (sendingId) {
        createPreRegistration({
          sendingId,
        });
        isPreRegistrationCreated.current = true;
      }
    }
  }, [createPreRegistration]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ background: backgroundColor }}
      >
        {!smDown && (
          <Box
            sx={{
              position: 'relative',
              maxWidth: 500,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: backgroundCardColor,
                opacity: 0.4,
                zIndex: 0,
              },
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h5"
              component="div"
              gutterBottom
              color={textColor}
              zIndex={1}
              position="relative"
            >
              {title}
            </Typography>

            <FormPreRegistration
              preRegistrationId={preRegistrationId}
              nameLabel={preRegistration?.nameLabel ?? ''}
              companyNameLabel={preRegistration?.companyNameLabel ?? ''}
              branchOfTheCompanyLabel={
                preRegistration?.branchOfTheCompanyLabel ?? ''
              }
              ladingpageUse={{
                ladingpageUseLabel: preRegistration?.ladingpageUseLabel ?? '',
                ladingpageUseList: preRegistration?.ladingpageUseList ?? [],
              }}
              showAlert={showAlert}
              ladingPageemphasis={{
                ladingPageemphasisLabel:
                  preRegistration?.ladingPageemphasisLabel ?? '',
                ladingPageemphasisList:
                  preRegistration?.ladingPageemphasisList ?? [],
              }}
              phone={phone}
            />
          </Box>
        )}

        {smDown && (
          <Box
            sx={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}
          >
            <Typography
              fontWeight="bold"
              variant="h5"
              component="div"
              gutterBottom
              color={textColor}
            >
              {title}
            </Typography>

            <FormPreRegistration
              preRegistrationId={preRegistrationId}
              nameLabel={preRegistration?.nameLabel ?? ''}
              companyNameLabel={preRegistration?.companyNameLabel ?? ''}
              branchOfTheCompanyLabel={
                preRegistration?.branchOfTheCompanyLabel ?? ''
              }
              ladingpageUse={{
                ladingpageUseLabel: preRegistration?.ladingpageUseLabel ?? '',
                ladingpageUseList: preRegistration?.ladingpageUseList ?? [],
              }}
              showAlert={showAlert}
              ladingPageemphasis={{
                ladingPageemphasisLabel:
                  preRegistration?.ladingPageemphasisLabel ?? '',
                ladingPageemphasisList:
                  preRegistration?.ladingPageemphasisList ?? [],
              }}
              phone={phone}
            />
          </Box>
        )}
      </Box>
      {SnackbarAlert}
    </>
  );
};
