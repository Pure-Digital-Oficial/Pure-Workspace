import {
  Box,
  Icon,
  IconButton,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FC, ReactNode } from 'react';

import { MobileBackButtom, SearchBar } from '../../components';

interface ContainerCardListProps {
  children: ReactNode;
  totalPage: number;
  mobileBackButtom?: boolean;
  search: {
    placeholder: string;
    searchData: (input: string) => Promise<void>;
    createPopUp?: () => void;
  };
  handleChange: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => Promise<void>;
  changeDirectory?: boolean;
  handleDirectoryPopUpOpen?: () => void;
}

export const ContainerCardList: FC<ContainerCardListProps> = ({
  children,
  totalPage,
  mobileBackButtom = false,
  search,
  handleChange,
  changeDirectory = false,
  handleDirectoryPopUpOpen,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box width="100%">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!smDown && changeDirectory && (
            <IconButton
              onClick={handleDirectoryPopUpOpen}
              sx={{
                width: theme.spacing(8),
                height: theme.spacing(8),
                marginRight: theme.spacing(2),
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <Icon
                sx={{
                  color: theme.palette.common.white,
                  // theme.palette.mode === 'dark'
                  //   ? theme.palette.common.white
                  //   : theme.palette.grey[700],
                }}
              >
                folder
              </Icon>
            </IconButton>
          )}
          {mobileBackButtom && <MobileBackButtom />}
          <Box
            sx={{
              justifyContent: 'center',
              width: mdUp ? '55%' : smDown ? '80%' : mdDown ? '95%' : '80%',
              marginLeft: theme.spacing(2),
            }}
          >
            <SearchBar
              onSearch={search.searchData}
              placeholder={search.placeholder}
            />
          </Box>
          {search.createPopUp && (
            <IconButton
              onClick={search.createPopUp}
              sx={{
                width: theme.spacing(8),
                height: theme.spacing(8),
                marginLeft: theme.spacing(2),
              }}
            >
              <AddCircleIcon
                sx={{
                  width: theme.spacing(8),
                  height: theme.spacing(8),
                }}
                color="primary"
                fontSize="large"
              />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box width="100%">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            mt={theme.spacing(2)}
            sx={{
              width: mdUp ? '100%' : smDown ? '94%' : mdDown ? '95%' : '80%',
            }}
          >
            {children}
          </Box>
        </Box>
        {totalPage > 0 ? (
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            marginTop={theme.spacing(2)}
          >
            <Pagination
              count={totalPage}
              color="primary"
              onChange={handleChange}
            />
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};
