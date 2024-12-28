import { Box, IconButton, Pagination, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ScrollBox, SearchBar } from '../../../components';
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

export const ContainerListModal: FC<ContainerSimpleListProps> = ({
  children,
  totalPage,
  search,
  handleChange,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '1rem',
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
          <Box width="100%">
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
        <Box>
          <ScrollBox maxHeight="100%">{children}</ScrollBox>
        </Box>
        <Box
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
