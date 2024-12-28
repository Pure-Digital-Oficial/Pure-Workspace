import { ProductResponseDto } from '@pure-workspace/domain';
import { FC } from 'react';
import { SimpleFormModal } from '../../simple';
import { Box, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { formatBrDate, formatNumberToBRL } from '../../../../shared';

interface DetailsProductModalProps {
  open: boolean;
  title: string;
  product: ProductResponseDto;
  handlePopUpClose: () => void;
  nameLabel?: string;
  statusLabel?: string;
  descriptionLabel?: string;
  maximumDiscountLabel?: string;
  standardPriceLabel?: string;
  createdByLabel?: string;
  createdAtLabel?: string;
  updatedByLabel?: string;
  updatedAtLabel?: string;
}

export const DetailsProductModal: FC<DetailsProductModalProps> = ({
  open,
  title,
  product,
  handlePopUpClose,
  nameLabel = 'Nome',
  statusLabel = 'Status',
  descriptionLabel = 'Descrição',
  maximumDiscountLabel = 'Máximo de desconto',
  standardPriceLabel = 'Preço inicial',
  createdByLabel = 'Criado por',
  createdAtLabel = 'Criado em',
  updatedByLabel = 'Atualizado por',
  updatedAtLabel = 'Atualizado em',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <SimpleFormModal
      open={open}
      handlePopUpClose={handlePopUpClose}
      height="auto"
      width={smDown ? '90%' : theme.spacing(90)}
      title={title}
    >
      <Box sx={{ mt: 2 }}>
        <Box
          mb={theme.spacing(1)}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography mb={theme.spacing(1)} variant="h5">
            <strong>{nameLabel}</strong>: {product.name}
          </Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Typography variant="body1">
              <strong>{statusLabel}</strong>:
            </Typography>
            <Chip
              component="span"
              sx={{
                marginLeft: theme.spacing(1),
              }}
              color={
                product.status == 'ACTIVE'
                  ? 'success'
                  : product.status == 'INACTIVE'
                  ? 'error'
                  : 'warning'
              }
              label={product.status}
            />
          </Box>
        </Box>
        <Box
          mb={theme.spacing(1)}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="body1">
            <strong>{standardPriceLabel}</strong>:{' '}
            {formatNumberToBRL(product.standardPrice)}
          </Typography>
          <Typography variant="body1">
            <strong>{maximumDiscountLabel}</strong>:{' '}
            {formatNumberToBRL(product.maximumDiscount)}
          </Typography>
        </Box>
        {product.createdAt && (
          <Box
            mb={theme.spacing(1)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="body1">
              <strong>{createdByLabel}</strong>: {product.createdBy}
            </Typography>
            <Typography variant="body1">
              <strong>{createdAtLabel}</strong>:{' '}
              {formatBrDate(new Date(product.createdAt))}
            </Typography>
          </Box>
        )}

        {product.updatedAt && (
          <Box
            mb={theme.spacing(1)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="body1">
              <strong>{updatedByLabel}</strong>: {product.updatedBy}
            </Typography>
            <Typography variant="body1">
              <strong>{updatedAtLabel}</strong>:{' '}
              {formatBrDate(new Date(product.updatedAt))}
            </Typography>
          </Box>
        )}

        <Typography variant="body1">
          <strong>{descriptionLabel}</strong>: {product.description}
        </Typography>
      </Box>
    </SimpleFormModal>
  );
};
