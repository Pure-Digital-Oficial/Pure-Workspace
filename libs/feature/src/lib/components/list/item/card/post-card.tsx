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
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Card
      sx={{
        width: mdDown
          ? theme.spacing(40)
          : xlDown
          ? theme.spacing(45)
          : theme.spacing(48),
        height: theme.spacing(75),
        margin: smDown
          ? 0
          : lgDown
          ? theme.spacing(1)
          : xlDown
          ? theme.spacing(0.5)
          : theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        image={image}
        title={title}
        sx={{
          height: theme.spacing(40),
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          component="div"
          variant="h6"
          gutterBottom
          overflow="hidden"
          noWrap
          textOverflow="ellipsis"
          fontSize={20}
          fontWeight={500}
        >
          {title}
        </Typography>

        <Typography
          component="div"
          variant="body2"
          overflow="hidden"
          noWrap
          textOverflow="ellipsis"
          fontSize={16}
          fontWeight={400}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: 'white',
            width: '100%',
            marginBottom: theme.spacing(2),
          }}
        >
          {buttonTitle}
        </Button>
      </CardActions>
    </Card>
  );
};
