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
import { IconMenuItem, PlaylistCategory } from '@pure-workspace/domain';
import { FC } from 'react';
import { formatBrDate } from '../../../shared';
import { ButtonFileMenu } from '../../menu';

interface PlaylistCategoryItemProps {
  category: PlaylistCategory;
  editPlaylistCategory: () => Promise<void>;
  deletePlaylistCategory: () => Promise<void>;
  titleDescription?: string;
  titleCreatedBy?: string;
  titleCreatedAt?: string;
}

export const PlaylistCategoryItem: FC<PlaylistCategoryItemProps> = ({
  category,
  editPlaylistCategory,
  deletePlaylistCategory,
  titleDescription = 'Descrição',
  titleCreatedBy = 'Criado por',
  titleCreatedAt = 'Criado em',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const iconMenuList: IconMenuItem[] = [
    {
      icon: <EditIcon />,
      title: 'Editar',
      handleClick: editPlaylistCategory,
    },
    {
      icon: <DeleteIcon />,
      title: 'Deletar',
      handleClick: deletePlaylistCategory,
    },
  ];
  return (
    <Box key={category.id}>
      <ListItem>
        <ListItemText
          primary={category.name}
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
                    {titleCreatedBy}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: '4px' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {category.created_by}
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
                    {formatBrDate(new Date(category.created_at))}
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
                  {category.description}
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
