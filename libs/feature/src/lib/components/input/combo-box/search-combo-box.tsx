import { Box, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ComboBoxListResult } from '@pure-workspace/domain';
import { FC, useState, useEffect, useCallback, useMemo } from 'react';

interface SearchComboBoxProps {
  onList: (
    searchTerm: string,
    page: number,
    pageSize: number
  ) => Promise<ComboBoxListResult[]>;
  pageSize?: number;
  emptyListMessage?: string;
  onItemSelected?: (item: ComboBoxListResult | null) => void;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const SearchComboBox: FC<SearchComboBoxProps> = ({
  onList,
  onItemSelected,
  pageSize = 20,
  emptyListMessage = 'Sem Resultados',
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<ComboBoxListResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const loadItems = useCallback(
    async (term?: string) => {
      setLoading(true);
      try {
        const newItems = await onList(term ?? '', 1, pageSize);
        setOptions(newItems);
        setNoResults(newItems.length === 0);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      } finally {
        setLoading(false);
      }
    },
    [onList, pageSize]
  );

  useEffect(() => {
    if (isOpened && !hasSearched) {
      loadItems(debouncedSearchTerm);
      if (options.length > 0) {
        setHasSearched(true);
      }
    }
  }, [isOpened, debouncedSearchTerm, loadItems, hasSearched, options.length]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setHasSearched(false);
    },
    []
  );

  const handleItemSelected = useCallback(
    (value: ComboBoxListResult | null) => {
      onItemSelected?.(value);
    },
    [onItemSelected]
  );

  const optionKeys = useMemo(() => options.map((item) => item.key), [options]);

  return (
    <Box>
      <Autocomplete
        options={optionKeys}
        getOptionLabel={(option) => option}
        loading={loading}
        onOpen={() => setIsOpened(true)}
        onClose={() => setIsOpened(false)}
        onChange={(event, value) => {
          const selectedOption = options.find((item) => item.key === value);
          handleItemSelected(selectedOption || null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
          />
        )}
      />
      {!loading && noResults && searchTerm && (
        <Typography variant="body2" color="textSecondary">
          {emptyListMessage}
        </Typography>
      )}
    </Box>
  );
};
