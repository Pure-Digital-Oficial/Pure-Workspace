import { DrawerOption, DrawerTopic } from '@pure-workspace/domain';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';
import { useEffect, useState } from 'react';

interface DrawerListItemProps {
  items: DrawerTopic;
  open: boolean;
  onClick?: () => void;
}

export const DrawerListItem = ({
  items,
  open,
  onClick,
}: DrawerListItemProps) => {
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const [buttonsDrawer, setButtonsDrawer] = useState<DrawerOption[]>([]);
  const [openSubItems, setOpenSubItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (!isDrawerOpen) {
      let listItem: DrawerOption[] = [];
      Object.keys(items).forEach((topic) => {
        items[topic].forEach(({ label, icon, path }) => {
          listItem.push({
            icon,
            label,
            path,
          });
        });
      });
      setButtonsDrawer(listItem);
    }
  }, [isDrawerOpen, items]);

  const navigate = useNavigate();

  const handleClick = (to: string) => {
    return () => {
      navigate(to);
      onClick?.();
    };
  };

  const handleToggleSubItems = (key: string) => {
    setOpenSubItems((prevOpenSubItems) => ({
      ...prevOpenSubItems,
      [key]: !prevOpenSubItems[key],
    }));
  };

  return (
    <>
      {isDrawerOpen
        ? Object.keys(items).map((topic) => (
            <div key={topic}>
              {items[topic].length === 1 ? (
                items[topic].map(({ label, icon, path }) => (
                  <ListItem
                    key={label}
                    disablePadding
                    sx={{ display: 'block' }}
                  >
                    <ListItemButton
                      onClick={
                        isDrawerOpen ? handleClick(path) : toggleDrawerOpen
                      }
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon>{icon}</Icon>
                      </ListItemIcon>
                      <ListItemText
                        primary={label}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <>
                  <ListItemButton onClick={() => handleToggleSubItems(topic)}>
                    <ListItemIcon>
                      <Icon>{items[topic][0].icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={topic} sx={{ marginLeft: -2 }} />
                    {openSubItems[topic] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={openSubItems[topic]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {items[topic].map(({ label, icon, path }) => (
                      <ListItem
                        key={label}
                        disablePadding
                        sx={{ display: 'block' }}
                      >
                        <ListItemButton
                          onClick={
                            isDrawerOpen ? handleClick(path) : toggleDrawerOpen
                          }
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            pl: 4,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 2 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                            <Icon>{icon}</Icon>
                          </ListItemIcon>
                          <ListItemText
                            primary={label}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </Collapse>
                </>
              )}
            </div>
          ))
        : buttonsDrawer.map(({ label, icon, path }) => (
            <ListItem key={label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={isDrawerOpen ? handleClick(path) : toggleDrawerOpen}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
    </>
  );
};
