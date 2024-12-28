import {
  Box,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useState } from 'react';

interface SearchBarInModalProps {
  placeholder: string;
  onSearch: (text: string) => void;
}

export const SearchBarInModal: FC<SearchBarInModalProps> = ({
  placeholder,
  onSearch,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleClick = () => {
    onSearch(inputText);
  };

  const handleClear = () => {
    setInputText('');
    onSearch('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(inputText);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={theme.spacing(2)}>
      <TextField
        value={inputText}
        onChange={handleInputChange}
        fullWidth
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        sx={{
          fontSize: smDown ? 8 : 20,
          maxWidth: theme.spacing(80),
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            paddingRight: smDown ? '-5px' : '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dfe1e5',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c6c6c6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4285f4',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ marginRight: smDown ? -0.5 : 0 }}
              position="start"
            >
              <IconButton onClick={handleClick}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: inputText ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClear}>
                <Icon>clear</Icon>
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
};
