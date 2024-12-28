import { FC, useState, MouseEvent } from 'react';
import { IconMenuItem } from '@pure-workspace/domain';
import { BaseMenu } from './base-menu';

interface RightClickMenuProps {
  iconMenuItemList: IconMenuItem[];
  children: React.ReactNode;
}

export const RightClickMenu: FC<RightClickMenuProps> = ({
  iconMenuItemList,
  children,
}) => {
  const [anchorPosition, setAnchorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      <BaseMenu
        iconMenuItemList={iconMenuItemList}
        anchorPosition={anchorPosition}
        setAnchorPosition={setAnchorPosition}
      />
    </>
  );
};
