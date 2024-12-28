import { Box, Typography, useTheme } from '@mui/material';
import { FC, ReactElement } from 'react';

interface EmptyListResponseProps {
  message: string;
  icon: ReactElement;
}

export const EmptyListResponse: FC<EmptyListResponseProps> = ({
  message,
  icon = 'info',
}) => {
  const theme = useTheme();
  return (
    <Box
      marginTop={theme.spacing(2)}
      width="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="center">
        {icon}
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4">{message}</Typography>
      </Box>
    </Box>
  );
};
