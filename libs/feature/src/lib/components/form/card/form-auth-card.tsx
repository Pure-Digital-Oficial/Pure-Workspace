import { Box, Card, useMediaQuery, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

interface FormAuthCardProps {
  imageUrl: string;
  children: ReactNode;
}

export const FormAuthCard: FC<FormAuthCardProps> = ({
  imageUrl = '',
  children,
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
          height: smDown ? '100vh' : 'auto',
          width: smDown
            ? '100%'
            : mdDown
            ? theme.spacing(65)
            : theme.spacing(143),
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!mdDown && (
          <img
            src={imageUrl}
            alt="auth"
            style={{ width: '50%', height: '100%', flex: '0 0 50%' }}
          />
        )}
        {children}
      </Card>
    </Box>
  );
};
