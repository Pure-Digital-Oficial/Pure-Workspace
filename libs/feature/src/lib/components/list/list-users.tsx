import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
  useTheme,
  Chip,
} from '@mui/material';
import { StatusColor } from '@pure-workspace/domain';
import { FC } from 'react';

interface ListUserProps {
  image: string;
  imageAlt: string;
  name: string;
  userId: string;
  email: string;
  nickname: string;
  status: string;
  statusColor: StatusColor;
  editUser?: () => void;
  deleteUser?: () => void;
}

export const ListUser: FC<ListUserProps> = ({
  image,
  imageAlt,
  name,
  userId,
  email,
  nickname,
  status,
  statusColor,
  editUser,
  deleteUser,
}) => {
  const theme = useTheme();
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={imageAlt} src={image} />
        </ListItemAvatar>
        <ListItemText>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{userId}</Typography>
            <Box marginBottom={theme.spacing(2)}>
              <Button
                onClick={editUser}
                sx={{ marginRight: theme.spacing(0.5) }}
                color="warning"
                variant="contained"
              >
                Editar
              </Button>
              <Button onClick={deleteUser} color="error" variant="contained">
                Excluir
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: theme.spacing(2),
            }}
          >
            <Typography>{name}</Typography>
            <Chip color={statusColor} label={status} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{nickname}</Typography>
            <Typography>{email}</Typography>
          </Box>
        </ListItemText>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};
