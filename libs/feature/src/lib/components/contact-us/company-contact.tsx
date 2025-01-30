import { Box, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

interface CompanyContactProps {
  phoneLabel?: string;
  phones: string[];
  title: string;
  email: string;
  emailLabel?: string;
  address: string;
  addressLabel?: string;
}

export const CompanyContact: FC<CompanyContactProps> = ({
  title,
  phones,
  email,
  address,
  phoneLabel = 'Telefones',
  emailLabel = 'Email',
  addressLabel = 'Endereço',
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{ textTransform: 'uppercase' }}
        fontWeight={400}
        fontSize={theme.spacing(2.5)}
        variant="h4"
      >
        {title}
      </Typography>

      {phones && (
        <Box mt={theme.spacing(4)}>
          <Typography
            sx={{ textTransform: 'uppercase' }}
            variant="body1"
            fontWeight={400}
            fontSize={theme.spacing(1.75)}
          >
            {phoneLabel}
          </Typography>
          {phones.map((phone, index) => (
            <Typography
              key={index}
              variant="body1"
              fontWeight={500}
              fontSize={theme.spacing(2.5)}
            >
              {phone}
            </Typography>
          ))}
        </Box>
      )}
      <Typography
        mt={theme.spacing(2)}
        sx={{ textTransform: 'uppercase' }}
        variant="body1"
        fontWeight={400}
        fontSize={theme.spacing(1.75)}
      >
        {emailLabel}
      </Typography>
      <Typography
        variant="body1"
        fontWeight={500}
        fontSize={theme.spacing(2.5)}
      >
        {email}
      </Typography>

      <Typography
        mt={theme.spacing(2)}
        sx={{ textTransform: 'uppercase' }}
        variant="body1"
        fontWeight={400}
        fontSize={theme.spacing(1.75)}
      >
        {addressLabel}
      </Typography>
      <Typography
        variant="body1"
        fontWeight={500}
        fontSize={theme.spacing(2.5)}
      >
        {address}
      </Typography>
    </Box>
  );
};
