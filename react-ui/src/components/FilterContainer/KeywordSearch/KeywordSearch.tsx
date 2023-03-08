import { Autocomplete, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { useKeywordSearchQuery } from '../../../redux/services/keywordApi';
import { Category, EventKeyword, RelatedEventKeyWord } from '../../../types';
import KeywordSelector from './KeywordSelector';
import SearchedKeywords from './SearchedKeywords';

const KeywordSearch = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [selectedKeyword, setSelectedKeyword] = useState<Category | null>(null);
  const [inputValue, setInputValue] = useState('');
  const validInputValue = inputValue.length > 2;
  const [options, setOptions] = useState<readonly Category[]>([]);
  const {
    data: keywordSearchPayload,
    isLoading: isLoadingKeywords,
    isFetching: isFetchingKeywords,
  } = useKeywordSearchQuery({ locale: currentLang, text: inputValue }, { skip: !validInputValue });
  const keywordSearchResults = keywordSearchPayload?.data;
  const isLoading = isLoadingKeywords || isFetchingKeywords;

  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const debouncedInputChange = useMemo(() => debounce(handleInputChange, 300), []);

  const onHierarchyChange = (keyword: EventKeyword | RelatedEventKeyWord) => {
    const keywordAsCategory: Category = {
      yso: keyword.id,
      name: keyword.name,
    };
    setOptions([keywordAsCategory, ...options]);
    setSelectedKeyword(keywordAsCategory);
  };

  useEffect(() => {
    if (!validInputValue) {
      setOptions(selectedKeyword ? [selectedKeyword] : []);
      return undefined;
    }

    if (keywordSearchResults) {
      const mappedKeywords: Category[] = keywordSearchResults.map((keyword, index) => ({
        yso: keyword.id,
        name: keyword.name,
      }));

      let newOptions: readonly Category[] = [];

      if (selectedKeyword) {
        newOptions = [selectedKeyword];
      }

      if (mappedKeywords) {
        newOptions = [...newOptions, ...mappedKeywords];
      }

      setOptions(newOptions);
    }
  }, [keywordSearchResults, currentLang, validInputValue, selectedKeyword]);

  return (
    <Box>
      <Autocomplete
        id="keyword-search"
        sx={{ width: '100%', maxWidth: 500 }}
        filterOptions={(x) => x}
        options={options ? options : []}
        value={selectedKeyword}
        getOptionLabel={(option) => getTranslatedValue(option.name, currentLang) || option.yso}
        noOptionsText={!validInputValue ? t('enter3OrMoreCharacters') : t('noResultsFound')}
        loading={isLoading}
        filterSelectedOptions
        includeInputInList
        autoComplete={false}
        renderOption={(props, option, state) => (
          <li {...props} key={`${option.yso}-${state.index}`}>
            {getTranslatedValue(option.name, currentLang) || option.yso}
          </li>
        )}
        onChange={(_, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setSelectedKeyword(newValue);
        }}
        onInputChange={(_, newInputValue) => debouncedInputChange(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('searchForKeywords')}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {!!selectedKeyword && <KeywordSelector selectedKeyword={selectedKeyword} onHierarchyChange={onHierarchyChange} />}
      <SearchedKeywords />
    </Box>
  );
};

export default KeywordSearch;
