import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, MouseEvent, FC } from 'react';
import { IconMenuItem } from '@pure-workspace/domain';

interface ButtonFileMenuProps {
  iconMenuItemList: IconMenuItem[];
}

export const ButtonFileMenu: FC<ButtonFileMenuProps> = ({
  iconMenuItemList,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {iconMenuItemList.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              width: theme.spacing(20),
            }}
            onClick={() => {
              item.handleClick();
              handleClose();
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: -1,
              }}
            >
              <IconButton onClick={item.handleClick}>{item.icon}</IconButton>
              <Typography>{item.title}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
