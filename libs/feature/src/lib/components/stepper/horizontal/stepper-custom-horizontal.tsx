import { ReactElement } from 'react';
import {
  Icon,
  useMediaQuery,
  Typography,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  styled,
  useTheme,
} from '@mui/material';

interface StepperData {
  icon: ReactElement;
  step: string;
}

interface StepperCustomProps {
  activeStep?: number;
  elementList?: StepperData[];
}

export const StepperCustomHorizontal: React.FC<StepperCustomProps> = ({
  activeStep = 2,
  elementList = [
    {
      icon: <Icon>group_add</Icon>,
      step: 'Criar Usuario',
    },
    {
      icon: <Icon>password</Icon>,
      step: 'Criar Senha',
    },
    {
      icon: <Icon>add_business</Icon>,
      step: 'Criar Empresa',
    },
  ],
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: smDown
        ? theme.spacing(2.2)
        : mdDown
        ? theme.spacing(2.5)
        : theme.spacing(3),
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient( 95deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.dark} 100%)`,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient( 95deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.dark} 100%)`,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: smDown
        ? theme.spacing(0.3)
        : mdDown
        ? theme.spacing(0.4)
        : theme.spacing(0.5),
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.background.default,
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: smDown
      ? theme.spacing(4.5)
      : mdDown
      ? theme.spacing(5)
      : theme.spacing(6),
    height: smDown
      ? theme.spacing(4.5)
      : mdDown
      ? theme.spacing(5)
      : theme.spacing(6),
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.dark} 100%)`,
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage: `linear-gradient( 136deg,  ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.dark} 100%)`,
    }),
  }));

  const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;
    const index = Number(props.icon);
    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {elementList[index - 1].icon}
      </ColorlibStepIconRoot>
    );
  };

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {elementList.map(({ step }, index) => (
          <Step key={step}>
            <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>
              <Typography
                fontSize={
                  smDown
                    ? theme.spacing(1)
                    : mdDown
                    ? theme.spacing(1.5)
                    : theme.spacing(2)
                }
              >
                {step}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};
