import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { IconNavigation } from '../../shared';
import { FC } from 'react';

interface SimpleFooterProps {
  copyrightText?: string;
  companyName?: string;
  icons: IconNavigation[];
  colorDefault?: string;
  colorMobile?: string;
  colorTablet?: string;
}

export const SimpleFooter: FC<SimpleFooterProps> = ({
  icons,
  colorMobile,
  colorTablet,
  companyName,
  copyrightText = 'Todos os direitos reservados por',
  colorDefault = '#D2EACF',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: smDown ? 'column' : 'row',
        fontSize: theme.spacing(1.5),
        background:
          smDown && colorMobile
            ? colorMobile
            : mdDown && colorTablet
            ? colorTablet
            : colorDefault,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ color: smDown && colorMobile ? 'white' : '' }}
          variant="body2"
        >
          © {new Date().getFullYear()} {copyrightText} {companyName}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        {icons.map((icon) => (
          <IconButton key={icon.to} href={icon.to}>
            {icon.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};
