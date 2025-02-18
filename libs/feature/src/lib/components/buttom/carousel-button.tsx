import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FC } from 'react';

interface CarouselButtonProps {
  handlePrevious: () => void;
  handleNext: () => void;
  itemsListCount: number;
}

export const CarouselButton: FC<CarouselButtonProps> = ({
  handleNext,
  handlePrevious,
  itemsListCount,
}) => {
  const theme = useTheme();
  return (
    <Box component="nav" aria-label="carousel navigation">
      <IconButton
        onClick={handlePrevious}
        aria-label="Anterior"
        disabled={itemsListCount <= 1}
      >
        <ArrowBackIosNewIcon
          sx={{ height: theme.spacing(3), width: theme.spacing(3) }}
        />
      </IconButton>

      <IconButton
        onClick={handleNext}
        aria-label="Próximo"
        disabled={itemsListCount <= 1}
      >
        <ArrowForwardIosIcon
          sx={{ height: theme.spacing(3), width: theme.spacing(3) }}
        />
      </IconButton>
    </Box>
  );
};
