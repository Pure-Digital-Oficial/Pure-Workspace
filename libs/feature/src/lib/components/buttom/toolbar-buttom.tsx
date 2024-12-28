import { Badge, Box, IconButton, Tooltip } from '@mui/material';
import { FC, ReactElement } from 'react';

interface ToolbarButtomProps {
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  icon: ReactElement;
  title: string;
  badgeContent?: number;
}

export const ToolbarButtom: FC<ToolbarButtomProps> = ({
  handleOpen,
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
            background: 'white',
            justifyContent: 'center',
            ':hover': {
              background: 'white',
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
