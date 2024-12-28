import { FC, useState } from 'react';
import {
  FormAuthCard,
  FormAuthConfirm,
  StepperCustomHorizontal,
} from '../../components';
import { Avatar, Box, Container, useTheme } from '@mui/material';
import { FormCreateUser } from '../../components';
import { FormCreateUserProps } from '@pure-workspace/domain';
import { useSnackbarAlert } from '../../hooks';
import { CreateCompanyStepper } from '../../components/stepper/company/create-company-stepper';
import { useNavigate } from 'react-router-dom';

interface CreateUserProps {
  cardImage: string;
  logo: string;
  createUserLabel?: FormCreateUserProps;
}

export const CreateUser: FC<CreateUserProps> = ({ cardImage, logo }) => {
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const changeStage = (stepPosition: number) => {
    setStep(stepPosition);
  };

  const showAlert = (message: string, success: boolean) => {
    showSnackbarAlert({
      message: message,
      severity: success ? 'success' : 'error',
    });
  };

  return (
    <>
      <FormAuthCard imageUrl={cardImage}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                mt: theme.spacing(1),
                mb: theme.spacing(1),
                bgcolor: 'secondary.main',
                height: theme.spacing(12),
                width: theme.spacing(12),
              }}
              src={logo}
            />
            <Box sx={{ mt: 1 }}>
              <StepperCustomHorizontal activeStep={step} />
              {step === 0 && (
                <FormCreateUser onData={changeStage} showAlert={showAlert} />
              )}
              {step === 1 && (
                <FormAuthConfirm
                  showAlert={showAlert}
                  handlePopUpClose={() => changeStage(2)}
                />
              )}
              {step === 2 && (
                <CreateCompanyStepper
                  handlePopUpClose={() => navigate('/login')}
                  showAlert={showAlert}
                />
              )}
            </Box>
          </Box>
        </Container>
      </FormAuthCard>
      {SnackbarAlert}
    </>
  );
};
