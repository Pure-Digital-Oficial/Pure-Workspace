import { useDrawerContext } from '../../contexts';
import { DrawerHeader } from './drawer-header';
import { DrawerListItem } from './drawer-list';
import { FC, ReactNode, useCallback } from 'react';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import {
  Box,
  List,
  CssBaseline,
  Divider,
  useMediaQuery,
  Avatar,
  Icon,
  IconButton,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { DrawerConfiguration } from './config';
import { useLoadUserPureTvData, useSnackbarAlert } from '../../hooks';

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(theme.breakpoints.up('sm') && {
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
}));

interface MiniDrawerProps {
  children: ReactNode;
  image: string;
  logoutTitle?: string;
  themeTitle?: string;
  companyList?: boolean;
}

export const MiniDrawer: FC<MiniDrawerProps> = ({
  children,
  image,
  logoutTitle = 'Fazer Logout',
  themeTitle = 'Alterar Tema',
  companyList,
}) => {
  const theme = useTheme();
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const showAlert = useCallback(
    (message: string, success: boolean) => {
      showSnackbarAlert({
        message: message,
        severity: success ? 'success' : 'error',
      });
    },
    [showSnackbarAlert]
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {Object.keys(drawerOptions).length > 0 && (
          <Drawer
            variant={smDown ? 'temporary' : 'permanent'}
            open={isDrawerOpen}
            onClose={toggleDrawerOpen}
          >
            <DrawerHeader
              open={isDrawerOpen}
              handleDrawerClose={toggleDrawerOpen}
            />
            {isDrawerOpen && (
              <Box
                width="100%"
                marginTop={-5}
                height={theme.spacing(15)}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                  src={image}
                />
              </Box>
            )}
            <Divider />
            <List component="nav">
              <DrawerListItem
                items={drawerOptions}
                open={isDrawerOpen}
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
            </List>
            <Box
              sx={{
                marginTop: 'auto',
              }}
            >
              <Divider />
              {isDrawerOpen && (
                <DrawerConfiguration
                  logoutTitle={logoutTitle}
                  themeTitle={themeTitle}
                  showAlert={showAlert}
                  companyList={companyList}
                />
              )}
              {!isDrawerOpen && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: theme.spacing(1),
                  }}
                >
                  <IconButton onClick={toggleDrawerOpen}>
                    <Icon>settings</Icon>
                  </IconButton>
                </Box>
              )}
            </Box>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: theme.spacing(1) }}>
          {children}
        </Box>
      </Box>
      {SnackbarAlert}
    </>
  );
};
