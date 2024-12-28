import {
  Box,
  Divider,
  Fade,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC, ReactNode } from 'react';
import { SearchBarInModal } from '../../search';

interface SearchContainerModalProps {
  open: boolean;
  handlePopUpClose: () => void;
  search: {
    placeholder: string;
    searchData: (input: string) => Promise<void>;
    createPopUp?: () => void;
  };
  title: string;
  children: ReactNode;
  height: string;
  width: string;
  maxHeight?: string;
}

export const SearchContainerModal: FC<SearchContainerModalProps> = ({
  open,
  handlePopUpClose,
  search,
  title,
  children,
  width,
  height,
  maxHeight = '80%',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal open={open} onClose={handlePopUpClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: height,
            maxHeight: maxHeight,
            width: width,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography
              noWrap
              textOverflow="ellipsis"
              overflow="hidden"
              variant="h5"
              fontSize={smDown ? 16 : 22}
            >
              <strong>{title}</strong>
            </Typography>
            <IconButton onClick={handlePopUpClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <SearchBarInModal
            onSearch={search.searchData}
            placeholder={search.placeholder}
          />
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};
