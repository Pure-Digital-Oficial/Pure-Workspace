import { Box, Card, Typography, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

interface CreateCardProps {
  children: ReactNode;
  height: string;
  width: string;
  title: string;
}

export const FormCard: FC<CreateCardProps> = ({
  children,
  height,
  width,
  title,
}) => {
  const theme = useTheme();
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center">
      <Card
        sx={{
          height: height,
          width: width,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: theme.spacing(2),
        }}
      >
        <Typography
          marginBottom={theme.spacing(2)}
          fontWeight="800"
          variant="h4"
        >
          {title}
        </Typography>
        {children}
      </Card>
    </Box>
  );
};
