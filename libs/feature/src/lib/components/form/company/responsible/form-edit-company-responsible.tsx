import { FC, useCallback, useEffect, useState } from 'react';
import {
  CompanyBodyResponsibleDto,
  EditCompanyResponsibleDto,
  ErrorResponse,
  FindCompanyResponsibleByIdDto,
  MaskType,
  StepItem,
} from '@pure-workspace/domain';
import { useLoggedUser } from '../../../../contexts';
import { Controller, useForm } from 'react-hook-form';
import {
  EditCompanyResponsibleRequest,
  FindCompanyResponsibleByIdRequest,
} from '../../../../services';
import axios, { AxiosError } from 'axios';
import { formatValueMask, ValidationsError } from '../../../../shared';
import { Box, TextField } from '@mui/material';
import { FormButton } from '../../form-button.component';

interface FormCreateCompanyResponsibleProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  buttonRight: () => void;
  buttonLeft: () => void;
  step: StepItem;
  companyResponsibleId: string;
  buttonTitle?: string;
  successMessage?: string;
  documentLabel?: string;
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  birthdateLabel?: string;
  maskDocumentType?: MaskType;
}

export const FormEditCompanyResponsible: FC<
  FormCreateCompanyResponsibleProps
> = ({
  showAlert,
  handlePopUpClose,
  buttonRight,
  buttonLeft,
  companyResponsibleId,
  step: { stepPosition = 4, stepTitle = 'Etapa', totalPositions },
  successMessage = 'Responsável da Empresa criado com sucesso',
  nameLabel = 'Nome',
  emailLabel = 'Email',
  phoneLabel = 'Telefone',
  birthdateLabel = 'Data de Nascimento',
  buttonTitle = 'Adicionar Responsável',
  documentLabel = 'CPF',
  maskDocumentType = 'cpf',
}) => {
  const { loggedUser } = useLoggedUser();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<CompanyBodyResponsibleDto>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      birthdate: new Date(),
      document: '',
      email: '',
      name: '',
      phone: '',
    },
  });

  const editCompanyResponsible = async (input: EditCompanyResponsibleDto) => {
    try {
      const result = await EditCompanyResponsibleRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Responsável da Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const getCompanyResponsible = useCallback(
    async (input: FindCompanyResponsibleByIdDto) => {
      try {
        const result = await FindCompanyResponsibleByIdRequest(input);
        setDataLoaded(true);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Device');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  useEffect(() => {
    if (companyResponsibleId && !dataLoaded) {
      getCompanyResponsible({
        companyResponsibleId,
        loggedUserId: loggedUser?.id ?? '',
      }).then((responsible) => {
        const formatedBirthdate =
          responsible?.birthdate.toString().split('T')[0] ?? '';
        reset({
          birthdate: formatedBirthdate,
          document: formatValueMask(
            responsible?.document ?? '',
            maskDocumentType
          ),
          email: responsible?.email ?? '',
          name: responsible?.name ?? '',
          phone: formatValueMask(responsible?.phone ?? '', 'phone'),
        });
      });
    }
  }, [
    stepPosition,
    loggedUser,
    dataLoaded,
    companyResponsibleId,
    getCompanyResponsible,
  ]);

  useEffect(() => {
    if (!companyResponsibleId) {
      setDataLoaded(false);
    }
  }, [stepPosition]);

  const handleCompanyData = async (data: CompanyBodyResponsibleDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await editCompanyResponsible({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
      companyResponsibleId,
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        birthdate: new Date(),
        email: '',
        document: '',
        name: '',
        phone: '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    }
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
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        id="name"
        disabled={loading}
        InputLabelProps={{ shrink: true }}
        label={nameLabel}
        autoComplete="name"
        autoFocus
        {...register('name')}
      />

      <Controller
        name="document"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={documentLabel}
            fullWidth
            disabled={true}
            margin="normal"
            error={!!errors.document}
            helperText={errors.document ? errors.document.message : ''}
            onChange={(e) =>
              field.onChange(formatValueMask(e.target.value, maskDocumentType))
            }
            inputProps={{ maxLength: 18 }}
          />
        )}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        type="email"
        error={!!errors.email}
        InputLabelProps={{ shrink: true }}
        helperText={errors.email ? errors.email.message : ''}
        id="email"
        disabled={loading}
        label={emailLabel}
        autoComplete="email"
        {...register('email')}
      />
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
            margin="normal"
            required
            fullWidth
            type="date"
            error={!!errors.birthdate}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={errors.birthdate ? errors.birthdate.message : ''}
            id="birthdate"
            disabled={loading}
            label={birthdateLabel}
            autoComplete="birthdate"
            {...register('birthdate')}
          />
        </Box>
      </Box>
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
