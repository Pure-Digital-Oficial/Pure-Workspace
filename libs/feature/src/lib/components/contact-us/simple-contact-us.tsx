import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { FormContactUs } from '../form';
import { CompanyContact } from './company-contact';
import { SectionContainer } from '../section';

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
  backgroundColor?: string;
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
  backgroundColor = '#D2EACF',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SectionContainer
      fullHeigth={false}
      id="contact-us-section"
      backgroundColor={backgroundColor}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: bgColor,
          width: '100%',
        }}
      >
        {!smDown && (
          <Box sx={{ display: 'flex', width: '50%' }}>
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
    </SectionContainer>
  );
};
