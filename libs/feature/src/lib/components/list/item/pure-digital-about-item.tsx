import { Box, Divider, useMediaQuery, useTheme } from '@mui/material';
import { IconText } from '../text';
import { FC } from 'react';
import { IconTextProps } from '../../../shared';

interface PureDigitalAboutItemProps {
  dividerColor?: string;
  about: IconTextProps;
}

export const PureDigitalAboutItem: FC<PureDigitalAboutItemProps> = ({
  dividerColor,
  about,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box
      key={about.title}
      sx={{
        ml: lgDown ? theme.spacing(3) : '',
      }}
    >
      <IconText
        icon={about.icon}
        title={about.title}
        width={smDown ? '95%' : lgDown ? '85%' : theme.spacing(50)}
        color="white"
        fontSize={theme.spacing(2)}
      />
      <Divider
        sx={{
          width: smDown ? '95%' : lgDown ? '85%' : theme.spacing(52),
          mt: theme.spacing(3),
          borderColor: dividerColor,
        }}
      />
    </Box>
  );
};
