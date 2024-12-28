import {
  Box,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { FC } from 'react';

interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  customInput?: string;
  setCustomInput?: (value: string) => void;
  customInputLabel?: string;
  color?: {
    labelColor: string;
    textColor: string;
  };
  fontSize?: number;
  width: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  customInput,
  setCustomInput,
  color,
  fontSize = 1.8,
  width,
  customInputLabel = 'Especifique sua resposta',
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', mb: 3, width: width }}>
      <Typography
        variant="body1"
        sx={{
          fontSize: theme.spacing(fontSize),
          textAlign: 'start',
          color: color?.labelColor,
        }}
      >
        {label}
      </Typography>

      <FormControl
        fullWidth
        sx={{
          bgcolor: 'white',
          borderRadius: 1,
        }}
      >
        <TextField
          sx={{ color: color?.textColor, fontSize: fontSize }}
          value={value}
          select
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value === 'Outros' && setCustomInput)
              setCustomInput('');
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          <MenuItem value="Outros">Outros</MenuItem>
        </TextField>

        {value === 'Outros' && setCustomInput && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label={customInputLabel}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: '95%' }}
              InputLabelProps={{
                style: {
                  color: color?.textColor,
                  fontSize: theme.spacing(fontSize),
                },
              }}
              InputProps={{
                style: {
                  color: color?.textColor,
                  fontSize: theme.spacing(fontSize),
                },
              }}
            />
          </Box>
        )}
      </FormControl>
    </Box>
  );
};
