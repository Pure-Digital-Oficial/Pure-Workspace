import { styled, Theme } from '@mui/material';

interface DrawerHeaderWrapperProps {
  open: boolean;
}

export const DrawerHeaderWrapper = styled('div')(
  ({ theme, open }: { theme: Theme } & DrawerHeaderWrapperProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    ...(open ? { marginBottom: theme.spacing(2) } : {}),
  })
);
