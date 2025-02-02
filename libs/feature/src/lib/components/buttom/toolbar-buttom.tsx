import { Badge, Box, IconButton, Tooltip } from '@mui/material';
import { FC, ReactElement } from 'react';

interface ToolbarButtomProps {
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  icon: ReactElement;
  title: string;
  badgeContent?: number;
  fill?: string;
}

export const ToolbarButtom: FC<ToolbarButtomProps> = ({
  handleOpen,
  fill = 'white',
  icon,
  title,
  badgeContent = 0,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Tooltip title={title}>
        <IconButton
          sx={{
            display: 'flex',
            background: fill,
            justifyContent: 'center',
            ':hover': {
              background: fill,
              opacity: 0.5,
            },
          }}
          onClick={handleOpen}
        >
          <Badge color="error" badgeContent={badgeContent}>
            {icon}
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
};
