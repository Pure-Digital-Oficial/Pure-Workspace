import { Button, useMediaQuery, useTheme } from '@mui/material';
import { FC, ReactElement } from 'react';

interface CtaButtonProps {
  title?: string;
  fontSize?: number;
  action: () => void;
  iconRight?: ReactElement;
  iconLeft?: ReactElement;
  width?: number;
  color?: string;
  titleColor?: string;
  padding?: number;
  borderRadius?: number;
}

export const CtaButton: FC<CtaButtonProps> = ({
  action,
  iconRight,
  iconLeft,
  fontSize = 12,
  width,
  title = 'Contrate Agora',
  color,
  titleColor,
  padding,
  borderRadius,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: borderRadius ? `${borderRadius}px` : '',
        whiteSpace: 'nowrap',
        textTransform: 'none',
        fontSize: fontSize,
        marginRight: smDown ? '' : lgDown ? theme.spacing(-1) : 'auto',
        width: width ? theme.spacing(width) : 'auto',
        background:
          color === 'secondary'
            ? theme.palette.secondary.main
            : color === 'primary'
            ? theme.palette.primary.main
            : color,
        ':hover': {
          background:
            color === 'secondary'
              ? theme.palette.secondary.light
              : color === 'primary'
              ? theme.palette.primary.light
              : color,
        },
        color: titleColor,
        padding: padding ? theme.spacing(padding) : 'auto',
      }}
      onClick={action}
      endIcon={iconRight}
      startIcon={iconLeft}
    >
      {title}
    </Button>
  );
};
