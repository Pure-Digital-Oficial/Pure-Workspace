import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { DrawerHeaderWrapper } from './drawer-header-wrapper';
import { Icon } from '@mui/material';

interface DrawerHeaderProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export const DrawerHeader = ({
  open,
  handleDrawerClose,
}: DrawerHeaderProps) => {
  const theme = useTheme();
  return (
    <DrawerHeaderWrapper open={open}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? (
          <Icon>chevron_right</Icon>
        ) : (
          <Icon>chevron_left</Icon>
        )}
      </IconButton>
    </DrawerHeaderWrapper>
  );
};
