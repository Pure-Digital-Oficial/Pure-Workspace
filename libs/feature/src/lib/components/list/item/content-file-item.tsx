import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
import { ContentFile } from '@pure-workspace/domain';

interface ContentFileItemProps {
  contentFile: ContentFile;
  isSelected: boolean;
  onFileToggle: (files: string) => void;
}
export const ContentFileItem: FC<ContentFileItemProps> = ({
  contentFile,
  isSelected,
  onFileToggle,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box>
      <ListItem key={contentFile.id}>
        <ListItemIcon
          sx={{
            marginRight: smDown ? theme.spacing(-2) : theme.spacing(0),
          }}
        >
          <Checkbox
            edge="start"
            checked={isSelected}
            onChange={() => onFileToggle(contentFile.id)}
          />
        </ListItemIcon>
        <ListItemAvatar>
          <Avatar
            alt={contentFile.originalName}
            src={contentFile.path}
            sx={{
              width: theme.spacing(8),
              height: theme.spacing(8),
              '& img': {
                objectFit: 'contain',
                objectPosition: 'center',
                maxHeight: '100%',
                maxWidth: '100%',
              },
            }}
          />
        </ListItemAvatar>

        <ListItemText
          sx={{
            marginLeft: theme.spacing(2),
            overflow: 'hidden',
            fontSize: smDown ? '8px' : '16px',
            textOverflow: 'ellipsis',
          }}
          primary={contentFile.originalName}
        />
      </ListItem>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Divider sx={{ width: '90%' }} />
      </Box>
    </Box>
  );
};
