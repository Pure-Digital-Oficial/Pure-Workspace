import {
  Box,
  Card,
  CardActions,
  CardContent,
  Icon,
  Typography,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
// import { useLoggedUser } from "../../contexts";
import { IconMenuItem } from '@pure-workspace/domain';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonFileMenu } from '../menu';

interface ListDirectoryProps {
  idDirectory: string;
  name: string;
  editTitle?: string;
  deleteTitle?: string;
  onClick: () => void;
  deleteDirectory: () => Promise<void>;
  editDirectory: () => Promise<void>;
}

export const DirectoryCard: FC<ListDirectoryProps> = ({
  idDirectory,
  name,
  editTitle = 'Editar',
  deleteTitle = 'Deletar',
  onClick,
  deleteDirectory,
  editDirectory,
}) => {
  const theme = useTheme();
  // const { loggedUser } = useLoggedUser();
  const iconMenuList: IconMenuItem[] = [
    {
      icon: <Icon>delete</Icon>,
      title: deleteTitle,
      handleClick: deleteDirectory,
    },
    {
      icon: <Icon>folder_open</Icon>,
      title: 'Abrir',
      handleClick: async () => {
        onClick();
      },
    },
    {
      icon: <EditIcon />,
      title: editTitle,
      handleClick: editDirectory,
    },
  ];

  return (
    <Card
      sx={{
        width: theme.spacing(40),
        height: theme.spacing(8),
        margin: theme.spacing(2),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Icon>folder</Icon>
        <CardContent onClick={onClick}>
          <Box>
            <Typography
              component="div"
              variant="body2"
              overflow="hidden"
              noWrap
              width={theme.spacing(20)}
              textOverflow="ellipsis"
              fontSize={14}
            >
              {name}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <ButtonFileMenu iconMenuItemList={iconMenuList} />
        </CardActions>
      </Box>
    </Card>
  );
};
