import axios, { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  EditProductDto,
  ErrorResponse,
  ProductBodyDto,
  ProductResponseDto,
} from '@pure-workspace/domain';
import { useLoggedUser } from '../../../../contexts';
import { EditProductRequest } from '../../../../services';
import { ProductFormSchema, ValidationsError } from '../../../../shared';
import { FormButton } from '../../../form';
import { SimpleFormModal } from '../../simple';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditProductModalProps {
  idToEdit: string;
  open: boolean;
  title: string;
  product: ProductResponseDto;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  descriptionLabel?: string;
  maximumDiscountLabel?: string;
  standardPriceLabel?: string;
  successMessage?: string;
}

export const EditProductModal: FC<EditProductModalProps> = ({
  idToEdit,
  open,
  title,
  product,
  handlePopUpClose,
  showAlert,
  nameLabel = 'Nome',
  descriptionLabel = 'Descrição',
  maximumDiscountLabel = 'Máximo de desconto',
  standardPriceLabel = 'Preço inicial',
  successMessage = 'Dispositivo Editado com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
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

  useEffect(() => {
    if (open && product?.name && !dataLoaded) {
      reset({
        name: product.name,
        description: product.description,
        maximumDiscount: product.maximumDiscount,
        standardPrice: product.standardPrice,
      });
      setDataLoaded(true);
    }
  }, [open, product, reset]);

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  const editProduct = async (input: EditProductDto) => {
    try {
      const editedProduct = await EditProductRequest(input);
      return editedProduct;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
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
    const result = await editProduct({
      body: data,
      id: idToEdit,
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
      setSuccess(false);
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
