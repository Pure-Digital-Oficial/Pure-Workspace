import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC } from 'react';

interface PostCardProps {
  image: string;
  title: string;
  description: string;
  buttonTitle?: string;
}

export const PostCard: FC<PostCardProps> = ({
  description,
  image,
  title,
  buttonTitle = 'Saiba Mais',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        width: smDown ? theme.spacing(45) : theme.spacing(40),
        height: theme.spacing(28),
        margin: theme.spacing(2),
      }}
    >
      <CardMedia
        component="img"
        image={image}
        title={title}
        sx={{
          height: theme.spacing(15),
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
          <Typography
            component="div"
            variant="body2"
            overflow="hidden"
            noWrap
            width={theme.spacing(20)}
            textOverflow="ellipsis"
            fontSize={14}
          >
            {title}
          </Typography>

          <Typography
            component="div"
            variant="body2"
            overflow="hidden"
            noWrap
            width={theme.spacing(20)}
            textOverflow="ellipsis"
            fontSize={14}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>{buttonTitle}</Button>
        </CardActions>
      </Box>
    </Card>
  );
};
