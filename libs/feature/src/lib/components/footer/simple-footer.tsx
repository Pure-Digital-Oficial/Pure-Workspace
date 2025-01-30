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
  company?: {
    companyName?: string;
    companyLogo: string;
  };
  icons: IconNavigation[];
  colorDefault?: string;
  colorMobile?: string;
  colorTablet?: string;
}

export const SimpleFooter: FC<SimpleFooterProps> = ({
  icons,
  colorMobile,
  colorTablet,
  company = { companyLogo: '', companyName: '' },
  copyrightText = 'Todos os direitos reservados por',
  colorDefault = '#D2EACF',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: theme.spacing(1.5),
        background:
          smDown && colorMobile
            ? colorMobile
            : lgDown && colorTablet
            ? colorTablet
            : colorDefault,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
        }}
      >
        <Box
          component="img"
          src={company.companyLogo}
          alt={company.companyName}
          height={theme.spacing(15)}
          sx={{
            maxWidth: smDown ? '80%' : '100%',
            objectFit: 'contain',
          }}
        />

        <Box sx={{ display: 'flex' }}>
          {icons.map((icon) => (
            <IconButton
              sx={{ height: theme.spacing(5) }}
              key={icon.to}
              href={icon.to}
            >
              {icon.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Typography
          sx={{ color: smDown && colorMobile ? 'white' : '' }}
          variant="body2"
        >
          © {new Date().getFullYear()} {copyrightText} {company.companyName}
        </Typography>
      </Box>
    </Box>
  );
};
