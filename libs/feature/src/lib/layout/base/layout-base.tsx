import {
  Box,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useDrawerContext } from '../../contexts';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { MobileButtonMenu, RightClickMenu } from '../../components';
import { IconMenuItem } from '@pure-workspace/domain';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface ILayoutBasePros {
  children: ReactNode;
  title: string;
  toolBar?: ReactNode;
  iconMenuItemList?: IconMenuItem[];
}

export const LayoutBase: FC<ILayoutBasePros> = ({
  children,
  title,
  toolBar,
  iconMenuItemList = [],
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleDrawerOpen, isDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 6 : 8)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        {!smDown && (
          <AppBar position="fixed" open={isDrawerOpen}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(isDrawerOpen && { display: 'none' }),
                }}
              >
                <Icon>menu</Icon>
              </IconButton>
              <Typography
                variant={'h4'}
                textOverflow="ellipsis"
                overflow="hidden"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {title}
              </Typography>
              {toolBar && <Box>{toolBar}</Box>}
            </Toolbar>
          </AppBar>
        )}
        {smDown && (
          <Typography
            variant={'h5'}
            textOverflow="ellipsis"
            overflow="hidden"
            noWrap
            component="div"
          >
            {title}
          </Typography>
        )}
      </Box>
      <Box flex={1} overflow="auto">
        {iconMenuItemList.length > 0 ? (
          <RightClickMenu iconMenuItemList={iconMenuItemList ?? []}>
            {smDown && <MobileButtonMenu iconMenuItemList={iconMenuItemList} />}
            {children}
          </RightClickMenu>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};
