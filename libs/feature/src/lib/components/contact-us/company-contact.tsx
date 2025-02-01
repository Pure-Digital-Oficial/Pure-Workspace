import { Box, Typography, useTheme } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import { FC } from 'react';
import { formatValueMask } from '../../shared';

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
          <Box
            sx={{
              display: 'flex',
              mb: theme.spacing(1),
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <PhoneInTalkIcon sx={{ mr: theme.spacing(1) }} />
            <Typography
              sx={{ textTransform: 'uppercase' }}
              variant="body1"
              fontWeight={400}
              fontSize={theme.spacing(1.75)}
            >
              {phoneLabel}
            </Typography>
          </Box>
          {phones.map((phone, index) => (
            <Typography
              key={index}
              variant="body1"
              fontWeight={500}
              fontSize={theme.spacing(2.5)}
            >
              {formatValueMask(phone, 'phone')}
            </Typography>
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          mb: theme.spacing(1),
          flexDirection: 'row',
          mt: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <EmailIcon sx={{ mr: theme.spacing(1) }} />
        <Typography
          sx={{ textTransform: 'uppercase' }}
          variant="body1"
          fontWeight={400}
          fontSize={theme.spacing(1.75)}
        >
          {emailLabel}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        fontWeight={500}
        fontSize={theme.spacing(2.5)}
      >
        {email}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          mb: theme.spacing(1),
          flexDirection: 'row',
          mt: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <BusinessIcon sx={{ mr: theme.spacing(1) }} />
        <Typography
          sx={{ textTransform: 'uppercase' }}
          variant="body1"
          fontWeight={400}
          fontSize={theme.spacing(1.75)}
        >
          {addressLabel}
        </Typography>
      </Box>

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
