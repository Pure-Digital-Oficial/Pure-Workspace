import { FC, useCallback, useEffect, useState } from 'react';
import {
  CompanyDataBodyDto,
  EditCompanyDataDto,
  ErrorResponse,
  FindCompanyDataByIdDto,
  StepItem,
} from '@pure-workspace/domain';
import { useLoggedUser } from '../../../../contexts';
import { Controller, useForm } from 'react-hook-form';
import {
  EditCompanyDataRequest,
  FindCompanyDataByIdRequest,
} from '../../../../services';
import axios, { AxiosError } from 'axios';
import {
  formatValueMask,
  PortTypeList,
  SituationTypeList,
  ValidationsError,
} from '../../../../shared';
import { Box, MenuItem, TextField } from '@mui/material';
import { FormButton } from '../../form-button.component';

interface FormEditCompanyDataProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  companyDataId: string;
  step: StepItem;
  buttonRight: () => void;
  buttonLeft: () => void;
  portLabel?: string;
  openingLabel?: string;
  situationLabel?: string;
  legalNatureLabel?: string;
  phoneLabel?: string;
  responsibleEmailLabel?: string;
  successMessage?: string;
  buttonTitle?: string;
}

export const FormEditCompanyData: FC<FormEditCompanyDataProps> = ({
  showAlert,
  handlePopUpClose,
  buttonLeft,
  buttonRight,
  companyDataId,
  step: { stepPosition = 1, stepTitle = 'Etapa', totalPositions = 2 },
  portLabel = 'Porte',
  openingLabel = 'Abertura',
  situationLabel = 'Situação',
  legalNatureLabel = 'Natureza Jurídica',
  phoneLabel = 'Telefone',
  responsibleEmailLabel = 'Email Responsável',
  successMessage = 'Empresa criada com sucesso',
  buttonTitle = 'Editar Empresa',
}) => {
  const { loggedUser } = useLoggedUser();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [port, setPort] = useState('');
  const [situation, setSituation] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

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
    defaultValues: {
      legalNature: '',
      opening: '',
      phone: '',
      port: '',
      responsibleEmail: '',
      situation: '',
    },
  });

  const getCompanyData = useCallback(
    async (input: FindCompanyDataByIdDto) => {
      try {
        const result = await FindCompanyDataByIdRequest(input);
        setDataLoaded(true);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Company Data');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  useEffect(() => {
    if (!companyDataId) {
      setDataLoaded(false);
    }
  }, [companyDataId]);

  useEffect(() => {
    if (companyDataId && !dataLoaded) {
      const loggedUserId = loggedUser?.id ?? '';

      getCompanyData({
        companyDataId,
        loggedUserId: loggedUserId,
      }).then((companyData) => {
        const [dia, mes, ano] = companyData?.opening.split('/') ?? [];
        const formatedOpening = new Date(`${ano}-${mes}-${dia}`)
          .toISOString()
          .split('T')[0];
        setPort(companyData?.port ?? '');
        setSituation(companyData?.situation ?? '');
        setValue('opening', formatedOpening);
        reset({
          legalNature: companyData?.legalNature ?? '',
          responsibleEmail: companyData?.responsibleEmail ?? '',
          phone: formatValueMask(companyData?.phone ?? '', 'phone'),
        });
      });
    }
  }, [loggedUser, companyDataId, dataLoaded, getCompanyData, setValue, reset]);

  const editCompany = async (input: EditCompanyDataDto) => {
    try {
      const result = await EditCompanyDataRequest({
        ...input,
        body: {
          ...input.body,
          phone: input.body.phone.replace(/[^\d]+/g, ''),
        },
      });
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleCompanyData = async (data: CompanyDataBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await editCompany({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
      companyDataId,
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
        error={!!errors.legalNature}
        InputLabelProps={{ shrink: true }}
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
            margin="normal"
            error={!!errors.situation}
            InputLabelProps={{ shrink: true }}
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
        InputLabelProps={{ shrink: true }}
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
            buttonRight={buttonRight}
            buttonLeft={buttonLeft}
            buttonTitle={`${buttonTitle} (${stepTitle} - ${stepPosition}/${totalPositions})`}
            loading={loading}
            success={success}
          />
        </Box>
      </Box>
    </Box>
  );
};
