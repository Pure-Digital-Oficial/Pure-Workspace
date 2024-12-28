import {
  Box,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Scheduling } from '@pure-workspace/domain';
import { FC } from 'react';

interface SchedulingSimpleItemProps {
  scheduling: Scheduling;
  isSelected: boolean;
  onSchedulingToggle: (id: string) => void;
}

export const SchedulingSimpleItem: FC<SchedulingSimpleItemProps> = ({
  scheduling,
  isSelected,
  onSchedulingToggle,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box key={scheduling.id}>
      <ListItem>
        <ListItemIcon
          sx={{
            marginRight: smDown ? theme.spacing(-2) : theme.spacing(0),
          }}
        >
          <Checkbox
            edge="start"
            checked={!!isSelected}
            onChange={() => onSchedulingToggle(scheduling.id)}
          />
        </ListItemIcon>
        <ListItemText primary={scheduling.name} />
      </ListItem>
    </Box>
  );
};
