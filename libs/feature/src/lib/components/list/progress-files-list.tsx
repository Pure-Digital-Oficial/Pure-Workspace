import {
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { FC } from 'react';
import { FileWithProgress } from '@pure-workspace/domain';
import { ScrollBox } from '../scroll';

interface ProgressFilesListProps {
  filesList: FileWithProgress[];
  handleDelete: (fileName: string) => void;
  title?: string;
  progress: number;
}

export const ProgressFilesList: FC<ProgressFilesListProps> = ({
  filesList,
  handleDelete,
  title = 'Arquivos Selecionados:',
  progress,
}) => {
  return (
    <Box maxHeight="80%" mt={2}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1, ml: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress === Infinity ? 0 : progress}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            progress === Infinity ? 0 : progress
          )}%`}</Typography>
        </Box>
      </Box>
      <Typography marginLeft="1rem" variant="h6">
        {title}
      </Typography>
      <ScrollBox maxHeight="11rem">
        <List>
          {filesList.map(({ file }) => (
            <ListItem key={file.name}>
              <ListItemText
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  textWrap: 'nowrap',
                }}
                primary={file.name}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(file.name)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </ScrollBox>
    </Box>
  );
};
