import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, MouseEvent, FC } from 'react';
import { IconMenuItem } from '@pure-workspace/domain';
import { BaseMenu } from './base-menu';

interface ButtonFileMenuProps {
  iconMenuItemList: IconMenuItem[];
}

export const ButtonFileMenu: FC<ButtonFileMenuProps> = ({
  iconMenuItemList,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <BaseMenu
        iconMenuItemList={iconMenuItemList}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};
