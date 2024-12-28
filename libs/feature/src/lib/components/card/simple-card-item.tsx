import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import { IconMenuItem, ImageCardItem } from '@pure-workspace/domain';
import { FC } from 'react';
import { ButtonFileMenu } from '../menu';

interface SimpleCardItemProps {
  imageData: ImageCardItem;
  name: string;
  iconMenuList: IconMenuItem[];
}

export const SimpleCardItem: FC<SimpleCardItemProps> = ({
  imageData,
  name,
  iconMenuList,
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: theme.spacing(28),
        maxWidth: 345,
        minWidth: theme.spacing(40),
        margin: 'auto',
      }}
    >
      <CardMedia
        component="img"
        image={
          imageData.image === ''
            ? '/assets/images/Sem_Arquivo.png'
            : imageData.image
        }
        title={imageData.imageName}
        sx={{
          height: theme.spacing(15),
          objectFit: 'contain',
          objectPosition: 'center',
          margin: 'auto',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <CardContent>
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
