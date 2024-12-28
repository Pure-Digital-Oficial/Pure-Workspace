import {
  Box,
  IconButton,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ScrollBox, SearchBar } from '../../components';
import { FC, ReactNode } from 'react';

interface ContainerSimpleListProps {
  children: ReactNode;
  totalPage: number;
  search: {
    placeholder: string;
    searchData: (input: string) => Promise<void>;
    createPopUp?: () => void;
  };
  handleChange: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => Promise<void>;
}

export const ContainerSimpleList: FC<ContainerSimpleListProps> = ({
  children,
  totalPage,
  search,
  handleChange,
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
        alignItems: 'center',
      }}
    >
      <Box width="95%">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box width={smDown ? '100%' : '55%'} marginRight={theme.spacing(2)}>
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
            width={smDown ? '100%' : mdDown ? '85%' : '65%'}
            sx={{
              marginLeft: smDown ? -3 : '',
            }}
          >
            <ScrollBox maxHeight="100%">{children}</ScrollBox>
          </Box>
        </Box>
        <Box
          width={mdUp ? '97%' : '100%'}
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
      </Box>
    </Box>
  );
};
