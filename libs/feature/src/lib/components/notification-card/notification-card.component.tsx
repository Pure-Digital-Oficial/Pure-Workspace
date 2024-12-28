import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC } from 'react';

interface NotificationCardProps {
  title: string;
  buttonText: string;
  onClick?: () => void;
  imageUrl?: string;
}

export const NotificationCardComponent: FC<NotificationCardProps> = ({
  buttonText = 'button text',
  title = 'title text',
  onClick,
  imageUrl,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        sx={{
          textAlign: 'center',
          width: smDown
            ? theme.spacing(45)
            : mdDown
            ? theme.spacing(60)
            : theme.spacing(70),
          height: imageUrl ? theme.spacing(55) : '20%',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '90%',
          }}
        >
          <div>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              {title}
            </Typography>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="default"
                style={{ maxWidth: '100%', height: 250, margin: '20px 0' }}
              />
            )}
          </div>
          <Button variant="contained" onClick={onClick}>
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
