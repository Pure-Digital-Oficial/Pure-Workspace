import {
  Box,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { IconMenuItem, ProductResponseDto } from '@pure-workspace/domain';
import { FC } from 'react';
import { formatBrDate } from '../../../shared';
import { ButtonFileMenu } from '../../menu';

interface ProductItemProps {
  product: ProductResponseDto;
  deleteProduct: () => Promise<void>;
  detailsProduct: () => Promise<void>;
  editProduct: () => Promise<void>;
  changeProduct: () => Promise<void>;
  deleteProductTitle?: string;
  detailsProductTitle?: string;
  editProductTitle?: string;
  changeProductTitle?: string;
  titleDescription?: string;
  titleUpdatedBy?: string;
  titleCreatedAt?: string;
}

export const ProductItem: FC<ProductItemProps> = ({
  product,
  deleteProduct,
  editProduct,
  detailsProduct,
  changeProduct,
  deleteProductTitle = 'Deletar',
  detailsProductTitle = 'Detalhes',
  editProductTitle = 'Editar',
  changeProductTitle = 'Alterar Status',
  titleDescription = 'Descrição',
  titleUpdatedBy = 'Atualizado por',
  titleCreatedAt = 'Criado em',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const iconMenuList: IconMenuItem[] = [
    {
      icon: <EditIcon />,
      title: editProductTitle,
      handleClick: editProduct,
    },
    {
      icon: <InfoIcon />,
      title: detailsProductTitle,
      handleClick: detailsProduct,
    },
    {
      icon: <ChangeCircleIcon />,
      title: changeProductTitle,
      handleClick: changeProduct,
    },
    {
      icon: <DeleteIcon />,
      title: deleteProductTitle,
      handleClick: deleteProduct,
    },
  ];
  return (
    <Box key={product.id}>
      <ListItem>
        <ListItemText
          primary={product.name}
          secondary={
            <Box
              component="span"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box component="span">
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {titleUpdatedBy}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: '4px' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {product.updatedBy}
                  </Typography>
                </Box>
                <Box component="span">
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {titleCreatedAt}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: '4px' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {formatBrDate(new Date(product.createdAt))}
                  </Typography>
                </Box>
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {titleDescription}:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: 'inline-block',
                    width: '100%',
                    maxHeight: theme.spacing(6),
                    marginLeft: '4px',
                    wordWrap: 'break-word',
                    overflowY: 'auto',
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
            </Box>
          }
        />
        <Box
          sx={{
            marginLeft: smDown ? 0 : theme.spacing(2),
          }}
        >
          <ButtonFileMenu iconMenuItemList={iconMenuList} />
        </Box>
      </ListItem>
      <Divider sx={{ width: '100%' }} />
    </Box>
  );
};
