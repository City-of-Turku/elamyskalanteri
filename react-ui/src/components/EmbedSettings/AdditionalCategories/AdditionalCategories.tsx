import {
  Alert,
  Autocomplete,
  CircularProgress,
  FilterOptionsState,
  TextField,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import { Box } from '@mui/system';
import { bindActionCreators } from '@reduxjs/toolkit';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { useKeywordSetQuery } from '../../../redux/services/keywordApi';
import filterSlice from '../../../redux/slices/filterSlice';
import { EventKeyword } from '../../../types';

const AdditionalCategories = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLang = i18n.language;
  const { filters } = useAppSelector((state) => state);
  const { setExtraKeyword } = bindActionCreators(filterSlice.actions, dispatch);
  const { data: keywordSetData, isLoading, isFetching, isError } = useKeywordSetQuery();
  const allSystemExtraKeywordsSets = keywordSetData?.data.filter(
    (keywordSet) => keywordSet.id === 'system:extra',
  );
  const allSystemExtraKeywords = allSystemExtraKeywordsSets?.map(
    (keywordSet) => keywordSet.keywords,
  );
  const extraKeywords = allSystemExtraKeywords?.map((keywordSet) => keywordSet).flat();
  const activeExtraKeyword =
    filters.extraKeyword && extraKeywords
      ? extraKeywords.find((keyword) => keyword.id === filters.extraKeyword) || null
      : null;

  const handleChange = (keyword: EventKeyword | null) => {
    if (!keyword) return setExtraKeyword(null);
    return setExtraKeyword(keyword.id);
  };

  const filterOptions = (
    options: EventKeyword[],
    { inputValue }: FilterOptionsState<EventKeyword>,
  ) => {
    if (!inputValue.length) return [];
    return matchSorter(options, inputValue, { keys: [`name.${currentLang}`] });
  };

  if (isLoading || isFetching) {
    return (
      <Box sx={{ padding: 2 }}>
        <p>{t('additionalCategories')}</p>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ padding: 2 }}>
        <p>{t('additionalCategories')}</p>
        <Alert severity="error" sx={{ lineHeight: 'unset' }}>
          {t('errorLoadingAdditionalCategories')}
        </Alert>
      </Box>
    );
  }

  return (
    <FormGroup sx={{ padding: 2 }}>
      <p>{t('additionalCategories')}</p>
      <Autocomplete
        value={activeExtraKeyword}
        filterOptions={filterOptions}
        onChange={(event, newValue) => handleChange(newValue)}
        disablePortal
        clearOnBlur
        popupIcon={null}
        id="additionalCategoriesSelect"
        options={extraKeywords ? extraKeywords : []}
        getOptionLabel={(option) => getTranslatedValue(option.name) || '-'}
        noOptionsText={t('noOptions')}
        renderInput={(params) => (
          <TextField
            aria-label={t('searchForAdditionalCategories')}
            placeholder={t('searchForAdditionalCategories')}
            {...params}
          />
        )}
        sx={{
          maxWidth: 500,
          width: '100%',
        }}
      />
    </FormGroup>
  );
};

export default AdditionalCategories;
