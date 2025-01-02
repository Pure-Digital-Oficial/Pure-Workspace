import { Button, Tooltip } from '@mui/material';
import { FC } from 'react';

interface ImageButtonProps {
  imageSrc: string;
  title: string;
  altText?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  boxShadow?: string;
  maxSize?: string;
}

export const ImageButton: FC<ImageButtonProps> = ({
  imageSrc,
  title,
  altText = 'button image',
  onClick,
  size = 'medium',
  maxSize = '15%',
  disabled = false,
  boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)',
}) => {
  return (
    <Tooltip title={title}>
      <Button
        onClick={onClick}
        size={size}
        disabled={disabled}
        style={{
          padding: 0,
          minWidth: 0,
          borderRadius: '100%',
          overflow: 'hidden',
          maxWidth: maxSize,
          maxHeight: maxSize,
          boxShadow: boxShadow,
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Button>
    </Tooltip>
  );
};
