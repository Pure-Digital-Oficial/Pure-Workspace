import {
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IconMenuItem, Scheduling } from '@pure-workspace/domain';
import { formatBrDate } from '../../../shared';
import { ButtonFileMenu } from '../../menu';

interface SchedulingItemProps {
  scheduling: Scheduling;
  titleCreatedBy?: string;
  titleCreatedAt?: string;
  titleStartTime?: string;
  titleEndTime?: string;
  titleLooping?: string;
  titlePriority?: string;
  editScheduling: () => Promise<void>;
  deleteScheduling: () => Promise<void>;
  addPlaylistToScheduling: () => Promise<void>;
  detailsScheduling: () => Promise<void>;
}

export const SchedulingItem: React.FC<SchedulingItemProps> = ({
  scheduling,
  titleCreatedAt = 'Criado em',
  titleCreatedBy = 'Criado por',
  titleStartTime = 'Tempo Inicial',
  titleEndTime = 'Tempo Final',
  titleLooping = 'Repetir',
  titlePriority = 'Prioridade',
  editScheduling,
  deleteScheduling,
  addPlaylistToScheduling,
  detailsScheduling,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const iconMenuList: IconMenuItem[] = [
    {
      icon: <EditIcon />,
      title: 'Editar',
      handleClick: editScheduling,
    },
    {
      icon: <DeleteIcon />,
      title: 'Deletar',
      handleClick: deleteScheduling,
    },
    {
      icon: <PlaylistAddIcon />,
      title: 'Adicionar Playlist',
      handleClick: addPlaylistToScheduling,
    },
    {
      icon: <InfoIcon />,
      title: 'Detalhes',
      handleClick: detailsScheduling,
    },
  ];
  return (
    <Box key={scheduling.id}>
      <ListItem>
        <ListItemText
          primary={scheduling.name}
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
                    sx={{ display: 'inline', marginLeft: theme.spacing(1) }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {scheduling.createBy}
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
                    sx={{ display: 'inline', marginLeft: theme.spacing(1) }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {formatBrDate(new Date(scheduling.createdAt))}
                  </Typography>
                </Box>
              </Box>
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
                    {titleStartTime}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: theme.spacing(1) }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {scheduling.startTime}
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: theme.spacing(2) }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {titleEndTime}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: theme.spacing(1) }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {scheduling.endTime}
                  </Typography>
                </Box>
                <Box component="span" marginTop={theme.spacing(1)}>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {titleLooping}:
                  </Typography>
                  <Chip
                    component="span"
                    sx={{ marginLeft: theme.spacing(1) }}
                    label={scheduling.lopping === true ? 'Sim' : 'Não'}
                    color={scheduling.lopping === true ? 'success' : 'error'}
                    variant="filled"
                  />
                  <Typography
                    sx={{ display: 'inline', marginLeft: theme.spacing(2) }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {titlePriority}:
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', marginLeft: theme.spacing(0.5) }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {scheduling.priority}
                  </Typography>
                </Box>
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
