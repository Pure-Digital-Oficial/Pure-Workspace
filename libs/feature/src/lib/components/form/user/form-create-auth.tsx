import {
  Box,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateAuthSchema,
  EntityExist,
  ValidationsError,
} from '../../../shared';
import { FormButton } from '../form-button.component';
import {
  AuthConfirmProps,
  CreateAuthDto,
  ErrorResponse,
  LoggedUser,
} from '@pure-workspace/domain';
import {
  CreateAuth,
  FindUserByEmailRequest,
  getItemLocalStorage,
} from '../../../services';
import axios, { AxiosError } from 'axios';
import { useLoggedUser } from '../../../contexts';

interface ConfirmPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

export const FormAuthConfirm: FC<AuthConfirmProps> = ({
  emailLabel = 'Digite seu e-mail',
  passwordLabel = 'Digite sua senha',
  confirmPasswordLabel = 'Digite sua senha novamente',
  buttonTitle = 'Próxima Etapa',
  showAlert,
  handlePopUpClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setLoggedUser } = useLoggedUser();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ConfirmPassword>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CreateAuthSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const createAuth = async (request: CreateAuthDto) => {
    try {
      await CreateAuth(request);
      await setLoggedUserId(request.email);
      setSuccess(true);
      handlePopUpClose();
      setSuccess(false);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Autenticação');
        if (errors) {
          showAlert?.(errors, false);
        }
      }
      setLoading(false);
    }
  };

  const handleData = async (data: ConfirmPassword) => {
    setSuccess(false);
    setLoading(true);
    const userId = getItemLocalStorage('ui');

    const request: CreateAuthDto = {
      email: data.email,
      password: data.password,
      userId: userId,
    };
    await createAuth(request);
  };

  const setLoggedUserId = async (email: string) => {
    const user = await FindUserByEmailRequest({ email });

    if (Object.keys(user).length > 0) {
      const loggedUser: LoggedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type,
        status: user.status,
        selectedCompany: user.companies[0],
        companies: user.companies,
      };
      setLoggedUser(loggedUser);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleData)}>
      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        id="email"
        disabled={loading}
        label={emailLabel}
        autoComplete="email"
        autoFocus
        {...register('email')}
      />

      <TextField
        type={showPassword ? 'text' : 'password'}
        margin="normal"
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? (
                  <Icon>visibility_off</Icon>
                ) : (
                  <Icon>visibility</Icon>
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!errors.password}
        helperText={errors.password?.message}
        id="password"
        disabled={loading}
        label={passwordLabel}
        autoComplete="password"
        {...register('password')}
      />

      <TextField
        type={showConfirmPassword ? 'text' : 'password'}
        required
        margin="normal"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? (
                  <Icon>visibility_off</Icon>
                ) : (
                  <Icon>visibility</Icon>
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        id="confirmPassword"
        disabled={loading}
        label={confirmPasswordLabel}
        autoComplete="confirmPassword"
        {...register('confirmPassword')}
      />
      <FormButton
        success={success}
        loading={loading}
        buttonTitle={buttonTitle}
      />
    </Box>
  );
};
