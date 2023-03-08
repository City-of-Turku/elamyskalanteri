import { Box } from '@mui/system';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { useKeywordQuery } from '../../../redux/services/keywordApi';
import filterSlice from '../../../redux/slices/filterSlice';
import FilterChip from '../FilterChip/FilterChip';

type KeywordFilterChipProps = {
  keyword: string;
};

const KeywordFilterChip = ({ keyword }: KeywordFilterChipProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const { filters } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { removeSearchedKeywords } = bindActionCreators(filterSlice.actions, dispatch);
  const { data, isLoading, isFetching, isError } = useKeywordQuery(keyword);

  if (!data || isLoading || isFetching || isError) return null;

  return (
    <FilterChip
      label={getTranslatedValue(data.name, currentLang) || data.id}
      active={filters.searchedKeywords.includes(keyword)}
      handleDelete={() => removeSearchedKeywords([keyword])}
    />
  );
};

const SearchedKeywords = () => {
  const { filters } = useAppSelector((state) => state);

  if (!filters.searchedKeywords.length) return null;

  return (
    <Box sx={{ mt: 2 }}>
      {filters.searchedKeywords.map((keyword, index) => (
        <KeywordFilterChip keyword={keyword} key={`${index}-${keyword}`} />
      ))}
    </Box>
  );
};

export default SearchedKeywords;
