import {
  Box,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLoggedUser } from '../../../../contexts';
import { FC, useState } from 'react';
import {
  CreateProductDto,
  ErrorResponse,
  ProductBodyDto,
} from '@pure-workspace/domain';
import { CreateProductRequest } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { ProductFormSchema, ValidationsError } from '../../../../shared';
import { SimpleFormModal } from '../../simple';
import { FormButton } from '../../../form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateProductModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  descriptionLabel?: string;
  successMessage?: string;
  maximumDiscountLabel?: string;
  standardPriceLabel?: string;
}

export const CreateProductModal: FC<CreateProductModalProps> = ({
  open,
  title,
  handlePopUpClose,
  showAlert,
  nameLabel = 'Nome',
  descriptionLabel = 'Descrição',
  maximumDiscountLabel = 'Máximo de desconto',
  standardPriceLabel = 'Preço inicial',
  successMessage = 'Produto criado com sucesso',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { loggedUser } = useLoggedUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProductBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      maximumDiscount: '',
      standardPrice: '',
    },
  });

  const createProduct = async (input: CreateProductDto) => {
    try {
      const result = await CreateProductRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Produto');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleProductData = async (data: ProductBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createProduct({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      reset({
        name: '',
        description: '',
        maximumDiscount: '',
        standardPrice: '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    }
  };

  return (
    <SimpleFormModal
      open={open}
      handlePopUpClose={handlePopUpClose}
      height="auto"
      width={smDown ? '90%' : theme.spacing(90)}
      title={title}
    >
      <Box
        sx={{ mt: 2 }}
        component="form"
        onSubmit={handleSubmit(handleProductData)}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
          id="name"
          disabled={loading}
          label={nameLabel}
          autoComplete="name"
          autoFocus
          {...register('name')}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ''}
          id="description"
          disabled={loading}
          label={descriptionLabel}
          autoComplete="description"
          {...register('description')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label={maximumDiscountLabel}
            margin="normal"
            required
            error={!!errors.maximumDiscount}
            helperText={
              errors.maximumDiscount ? errors.maximumDiscount.message : ''
            }
            id="maximumDiscount"
            sx={{ width: '49%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            {...register('maximumDiscount')}
          />
          <TextField
            label={standardPriceLabel}
            margin="normal"
            required
            error={!!errors.standardPrice}
            helperText={
              errors.standardPrice ? errors.standardPrice.message : ''
            }
            id="standardPrice"
            sx={{ width: '49%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            {...register('standardPrice')}
          />
        </Box>
        <FormButton buttonTitle="Criar" loading={loading} success={success} />
      </Box>
    </SimpleFormModal>
  );
};
