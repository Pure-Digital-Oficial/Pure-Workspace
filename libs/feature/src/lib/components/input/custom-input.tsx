import { Box, TextField, Typography, useTheme } from '@mui/material';
import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CustomInputProps {
  label: string;
  color?: {
    textColor?: string;
    labelColor?: string;
    backgroundInputColor?: string;
  };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  fontSize?: number;
  id: string;
  useForm?: UseFormRegisterReturn;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  width: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      color,
      onChange,
      value,
      fontSize = 1.8,
      id,
      useForm,
      error,
      helperText,
      required = false,
      width,
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Box sx={{ position: 'relative', width: width }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: theme.spacing(fontSize),
            textAlign: 'start',
            color: color?.labelColor,
            zIndex: 1,
          }}
        >
          {label}
        </Typography>
        <TextField
          ref={ref}
          value={value}
          onChange={onChange}
          fullWidth
          variant="outlined"
          id={id}
          error={error}
          required={required}
          helperText={helperText}
          sx={{ mb: 2, bgcolor: color?.backgroundInputColor, borderRadius: 1 }}
          InputProps={{
            style: {
              color: color?.textColor,
              fontSize: theme.spacing(fontSize),
            },
          }}
          {...useForm}
        />
      </Box>
    );
  }
);

CustomInput.displayName = 'CustomInput';
