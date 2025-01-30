import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { FormContactUs } from '../form';
import { CompanyContact } from './company-contact';

interface SimpleContactUsProps {
  title: string;
  showAlert: (message: string, success: boolean) => void;
  bgColor?: string;
  bgInputColor?: string;
  inputColor?: string;
  phoneLabel?: string;
  phones: string[];
  emailLabel?: string;
  email: string;
  addressLabel?: string;
  address: string;
}

export const SimpleContactUs: FC<SimpleContactUsProps> = ({
  title,
  showAlert,
  bgColor,
  bgInputColor,
  inputColor,
  phoneLabel,
  phones,
  email,
  emailLabel,
  addressLabel,
  address,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#D2EACF',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: bgColor,
          width: mdDown ? '90%' : '90%',
          maxWidth: 1600,
          marginBottom: theme.spacing(3),
          marginTop: theme.spacing(3),
        }}
      >
        {!smDown && (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <CompanyContact
              address={address}
              email={email}
              phones={phones}
              title={title}
              addressLabel={addressLabel}
              emailLabel={emailLabel}
              phoneLabel={phoneLabel}
            />
          </Box>
        )}
        <Box sx={{ width: smDown ? '100%' : '50%' }}>
          {smDown && (
            <Typography
              fontWeight={600}
              textAlign="center"
              fontSize={theme.spacing(4)}
              variant="h4"
            >
              {title}
            </Typography>
          )}
          <FormContactUs
            showAlert={showAlert}
            bgColor={bgInputColor}
            color={inputColor}
          />
        </Box>
      </Box>
    </Box>
  );
};
