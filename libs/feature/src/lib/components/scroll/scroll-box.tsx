import styled from '@emotion/styled';
import { Box } from '@mui/material';

interface ScrollBoxProps {
  maxHeight?: string;
  scrollbarWidth?: string;
  scrollbarTrackColor?: string;
  scrollbarThumbColor?: string;
  scrollbarThumbHoverColor?: string;
}

export const ScrollBox = styled(Box)<ScrollBoxProps>(
  ({
    maxHeight,
    scrollbarWidth,
    scrollbarTrackColor,
    scrollbarThumbColor,
    scrollbarThumbHoverColor,
  }) => ({
    maxHeight: maxHeight,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: scrollbarWidth,
    },
    '&::-webkit-scrollbar-track': {
      background: scrollbarTrackColor || '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: scrollbarThumbColor || '#888',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: scrollbarThumbHoverColor || '#555',
    },
  })
);
