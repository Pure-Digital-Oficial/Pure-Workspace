import { FC, ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  Box,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ButtonNavigation } from '../../shared';
import { useDrawerContext } from '../../contexts';
import { scrollTo } from '../../services';

interface SimpleHeaderProps {
  title?: string;
  logo: string;
  logoAltTitle?: string;
  toolBar?: ReactNode;
  listButtons: ButtonNavigation[];
  color?: string;
}

export const SimpleHeader: FC<SimpleHeaderProps> = ({
  title,
  logoAltTitle = 'Logo da Empresa',
  logo,
  listButtons,
  toolBar,
  color = 'white',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <AppBar sx={{ backgroundColor: color }} id="home" position="static">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <Box>
            <img
              onClick={() => scrollTo('home')}
              width={theme.spacing(8)}
              height={theme.spacing(8)}
              style={{
                transition: 'transform 0.3s, opacity 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              src={logo}
              alt={logoAltTitle}
            />
            {title && (
              <Typography
                variant="h6"
                textOverflow="ellipsis"
                overflow="hidden"
                noWrap
                component="div"
                fontSize={
                  smDown
                    ? theme.spacing(2)
                    : mdDown
                    ? theme.spacing(1.8)
                    : theme.spacing(3)
                }
                sx={{ flexGrow: 1 }}
              >
                {title}
              </Typography>
            )}
          </Box>
          {smDown ? (
            <IconButton color="inherit" onClick={toggleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                }}
              >
                {listButtons &&
                  listButtons.map((button) => (
                    <Button
                      color="inherit"
                      onClick={button.to}
                      key={button.title}
                      sx={{
                        marginRight: theme.spacing(2),
                        textTransform: 'none',
                        fontWeight: 400,
                        fontSize: smDown
                          ? theme.spacing(1.5)
                          : mdDown
                          ? theme.spacing(1.6)
                          : theme.spacing(2),
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          opacity: 0.8,
                        },
                      }}
                    >
                      {button.title}
                    </Button>
                  ))}
              </Box>
              {toolBar && <Box>{toolBar}</Box>}
            </>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};
