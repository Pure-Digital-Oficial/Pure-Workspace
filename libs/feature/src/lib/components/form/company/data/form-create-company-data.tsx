import {
  CompanyDataBodyDto,
  CompanyDataResponseDto,
  CreateCompanyDataDto,
  ErrorResponse,
  StepItem,
} from '@pure-workspace/domain';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCompanyDataFormSchema } from '../../../../shared/validations/company';
import { CreateCompanyDataRequest } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { useLoggedUser } from '../../../../contexts';
import {
  formatValueMask,
  PortTypeList,
  SituationTypeList,
  ValidationsError,
} from '../../../../shared';
import { Box, MenuItem, TextField } from '@mui/material';
import { FormButton } from '../../form-button.component';

interface FormCreateCompanyDataProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  step: StepItem;
  companyId: string;
  totalPosition: number;
  companyData: CompanyDataResponseDto;
  portLabel?: string;
  openingLabel?: string;
  situationLabel?: string;
  legalNatureLabel?: string;
  phoneLabel?: string;
  responsibleEmailLabel?: string;
  successMessage?: string;
  buttonTitle?: string;
}

export const FormCreateCompanyData: FC<FormCreateCompanyDataProps> = ({
  showAlert,
  handlePopUpClose,
  companyId,
  companyData,
  step: { stepPosition = 1, stepTitle = 'Etapa' },
  totalPosition,
  portLabel = 'Porte',
  openingLabel = 'Abertura',
  situationLabel = 'Situação',
  legalNatureLabel = 'Natureza Jurídica',
  phoneLabel = 'Telefone',
  responsibleEmailLabel = 'Email Responsável',
  successMessage = 'Empresa criada com sucesso',
  buttonTitle = 'Adicionar Empresa',
}) => {
  const { loggedUser } = useLoggedUser();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [port, setPort] = useState('');
  const [situation, setSituation] = useState('');

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<CompanyDataBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CreateCompanyDataFormSchema),
    defaultValues: {
      legalNature: companyData.legalNature,
      opening: '',
      phone: companyData.phone,
      port: companyData.port,
      responsibleEmail: companyData.responsibleEmail,
      situation: companyData.situation,
    },
  });

  const createCompanyData = async (input: CreateCompanyDataDto) => {
    try {
      const result = await CreateCompanyDataRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Dados da Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleCompanyData = async (data: CompanyDataBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createCompanyData({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
      companyId,
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        legalNature: '',
        opening: '',
        phone: '',
        port: '',
        responsibleEmail: '',
        situation: '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    }
  };

  useEffect(() => {
    const [dia, mes, ano] = companyData.opening.split('/');
    const formatedOpening = new Date(`${ano}-${mes}-${dia}`)
      .toISOString()
      .split('T')[0];
    setPort(companyData.port);
    setSituation(companyData.situation);
    setValue('opening', formatedOpening);
    setValue('phone', formatValueMask(companyData.phone, 'phone'));
  }, [
    companyData.phone,
    companyData.opening,
    companyData.situation,
    companyData.port,
    setValue,
  ]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  return (
    <Box
      sx={{ mt: 2 }}
      component="form"
      onSubmit={handleSubmit(handleCompanyData)}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.legalNature}
        helperText={errors.legalNature ? errors.legalNature.message : ''}
        id="legalNature"
        disabled={loading}
        label={legalNatureLabel}
        autoComplete="legalNature"
        autoFocus
        {...register('legalNature')}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box width="48%">
          <TextField
            fullWidth
            select
            value={situation}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            error={!!errors.situation}
            helperText={errors.situation?.message}
            id="situation"
            label={situationLabel}
            {...register('situation', { onChange: handleChange(setSituation) })}
          >
            {SituationTypeList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="48%">
          <TextField
            margin="normal"
            required
            fullWidth
            type="date"
            error={!!errors.opening}
            helperText={errors.opening ? errors.opening.message : ''}
            InputLabelProps={{ shrink: true, required: true }}
            id="opening"
            disabled={loading}
            label={openingLabel}
            autoComplete="opening"
            {...register('opening')}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box width="48%">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={phoneLabel}
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
                onChange={(e) =>
                  field.onChange(formatValueMask(e.target.value, 'phone'))
                }
                inputProps={{ maxLength: 18 }}
              />
            )}
          />
        </Box>
        <Box width="48%">
          <TextField
            fullWidth
            select
            value={port}
            margin="normal"
            error={!!errors.port}
            helperText={errors.port?.message}
            id="port"
            label={portLabel}
            {...register('port', { onChange: handleChange(setPort) })}
          >
            {PortTypeList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.responsibleEmail}
        helperText={
          errors.responsibleEmail ? errors.responsibleEmail.message : ''
        }
        id="responsibleEmail"
        disabled={loading}
        label={responsibleEmailLabel}
        autoComplete="responsibleEmail"
        {...register('responsibleEmail')}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Box width="80%">
          <FormButton
            buttonTitle={`${buttonTitle} (${stepTitle} - ${stepPosition}/${totalPosition})`}
            loading={loading}
            success={success}
          />
        </Box>
      </Box>
    </Box>
  );
};
