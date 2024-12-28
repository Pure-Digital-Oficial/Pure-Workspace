import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import { CustomInput, CustomSelect } from '../../input';
import {
  ErrorResponse,
  PreBriefingDto,
  UpdatePreRegistrationDto,
} from '@pure-workspace/domain';
import {
  navigateToWaths,
  UpdatePreRegistrationRequest,
} from '../../../services';
import axios, { AxiosError } from 'axios';
import { PreRegistrationFormSchema, ValidationsError } from '../../../shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormPreRegistrationProps {
  preRegistrationId: string;
  nameLabel: string;
  textColor?: string;
  textLabelColor?: string;
  companyNameLabel: string;
  branchOfTheCompanyLabel: string;
  buttonTitle?: string;
  ladingpageUse: {
    ladingpageUseLabel: string;
    ladingpageUseList: string[];
  };
  ladingPageemphasis: {
    ladingPageemphasisLabel: string;
    ladingPageemphasisList: string[];
  };
  phone: string;
  showAlert: (message: string, success: boolean) => void;
}

export const FormPreRegistration: FC<FormPreRegistrationProps> = ({
  preRegistrationId,
  nameLabel,
  companyNameLabel,
  branchOfTheCompanyLabel,
  textColor = 'black',
  textLabelColor = '#fff',
  ladingpageUse,
  ladingPageemphasis,
  showAlert,
  phone,
  buttonTitle = 'Fale com consultor',
}) => {
  const [ladingpageUseValue, setLadingpageUseValue] = useState('');
  const [ladingPageemphasisValue, setLadingPageemphasisValue] = useState('');
  const [customLadingpageUse, setCustomLadingpageUse] = useState('');
  const [customLadingPageemphasis, setCustomLadingPageemphasis] = useState('');

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PreBriefingDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(PreRegistrationFormSchema),
    defaultValues: {
      name: '',
      companyName: '',
      branchOfTheCompany: '',
    },
  });

  const updatePreRegistration = async (input: UpdatePreRegistrationDto) => {
    try {
      const result = await UpdatePreRegistrationRequest(input);
      return result;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Pre Cadastro');
        console.log(errors);
        if (errors) {
          console.log('mostrou o erro');
          showAlert(errors, false);
        }
      }
    }
  };

  const handlePreRegistration = async (data: PreBriefingDto) => {
    if (data) {
      const updatedPreRegistration = await updatePreRegistration({
        id: preRegistrationId,
        branchOfTheCompany: data.branchOfTheCompany,
      });

      if (updatedPreRegistration) {
        navigateToWaths(
          phone,
          `Nome: ${data.name},\n Nome da Empresa: ${data.companyName},\n Ramo de atuação: ${data.branchOfTheCompany},\n Objetivo Principal: ${ladingpageUseValue}, \n Destaque da Empresa: ${ladingPageemphasisValue}`,
          true
        );
      }
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handlePreRegistration)}
    >
      <CustomInput
        width="100%"
        label={nameLabel}
        id="name"
        color={{
          textColor: 'black',
          backgroundInputColor: 'white',
          labelColor: 'white',
        }}
        required={true}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        useForm={register('name')}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: smDown ? 'column' : 'row',
          justifyContent: smDown ? '' : 'space-between',
        }}
      >
        <CustomInput
          width={smDown ? '100%' : '49%'}
          label={companyNameLabel}
          id="companyName"
          color={{
            textColor: 'black',
            backgroundInputColor: 'white',
            labelColor: 'white',
          }}
          required={true}
          error={!!errors.companyName}
          helperText={errors.companyName ? errors.companyName.message : ''}
          useForm={register('companyName')}
        />
        <CustomInput
          width={smDown ? '100%' : '49%'}
          label={branchOfTheCompanyLabel}
          id="branchOfTheCompany"
          color={{
            textColor: 'black',
            backgroundInputColor: 'white',
            labelColor: 'white',
          }}
          required={true}
          error={!!errors.branchOfTheCompany}
          helperText={
            errors.branchOfTheCompany ? errors.branchOfTheCompany.message : ''
          }
          useForm={register('branchOfTheCompany')}
        />
      </Box>
      <CustomSelect
        width="100%"
        label={ladingpageUse.ladingpageUseLabel}
        options={ladingpageUse.ladingpageUseList}
        value={ladingpageUseValue}
        onChange={setLadingpageUseValue}
        customInput={customLadingpageUse}
        setCustomInput={setCustomLadingpageUse}
        color={{
          textColor: textColor,
          labelColor: textLabelColor,
        }}
      />
      <CustomSelect
        width="100%"
        label={ladingPageemphasis.ladingPageemphasisLabel}
        options={ladingPageemphasis.ladingPageemphasisList}
        value={ladingPageemphasisValue}
        onChange={setLadingPageemphasisValue}
        customInput={customLadingPageemphasis}
        setCustomInput={setCustomLadingPageemphasis}
        color={{
          textColor: textColor,
          labelColor: textLabelColor,
        }}
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{
          borderRadius: theme.spacing(1),
          textTransform: 'none',
          mt: theme.spacing(2),
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            borderColor: 'white',
          },
        }}
        fullWidth
      >
        {buttonTitle}
      </Button>
    </Box>
  );
};
