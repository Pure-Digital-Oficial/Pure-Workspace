import { Box, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { IconTextProps } from '../../../shared';

export const IconText: FC<IconTextProps> = ({
  icon,
  title,
  width,
  color,
  fontSize,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        mt: theme.spacing(2),
        width: width,
      }}
      key={title}
    >
      {icon}
      <Typography
        variant="body2"
        sx={{
          marginLeft: 1,
          textAlign: 'start',
          color: color,
          fontSize: fontSize,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
