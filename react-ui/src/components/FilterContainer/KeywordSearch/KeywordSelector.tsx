import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Alert, Checkbox, CircularProgress, FormControlLabel, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { useKeywordQuery } from '../../../redux/services/keywordApi';
import filterSlice from '../../../redux/slices/filterSlice';
import { Category, EventKeyword, RelatedEventKeyWord } from '../../../types';
import styles from './KeywordSearch.module.scss';

type IProps = {
  selectedKeyword: Category;
  onHierarchyChange: (keyword: EventKeyword | RelatedEventKeyWord) => void;
};

const KeywordSelector = ({ selectedKeyword, onHierarchyChange }: IProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { addSearchedKeywords, removeSearchedKeywords } = bindActionCreators(
    filterSlice.actions,
    dispatch,
  );
  const { filters } = useAppSelector((state) => state);
  const {
    data: keyword,
    isLoading,
    isFetching,
    isError,
  } = useKeywordQuery(selectedKeyword.yso, { refetchOnMountOrArgChange: true });
  const currentLang = i18n.language;
  const { searchedKeywords } = filters;

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      addSearchedKeywords(e.target.value);
    } else {
      removeSearchedKeywords(e.target.value);
    }
  };

  const getParentElements = () => {
    if (!keyword) return null;

    const parents = keyword.parents.reduce((acc: JSX.Element[], parent, index) => {
      acc.push(
        <li className={styles.keywordParent} key={parent.id}>
          <div className={styles.parentWrapper}>
            {getButtonElement(parent, true)}
            {getCheckboxElement(parent)}
          </div>
          {index === keyword.parents.length - 1 && (
            <ul className={styles.keywordListingNested} id="last-parent">
              {getOptionElement()}
            </ul>
          )}
        </li>,
      );
      return acc;
    }, []);

    return (
      <ul className={styles.keywordListing}>{parents.length > 0 ? parents : getOptionElement()}</ul>
    );
  };

  const getOptionElement = () => {
    if (!keyword) return null;
    return (
      <li className={styles.keywordOption} key={keyword.id}>
        {getCheckboxElement(keyword)}
        <ul className={styles.keywordListingNested}>
          {keyword.children.map((child, key) => (
            <li className={styles.keywordChild} key={key}>
              {getButtonElement(child, false)}
              {getCheckboxElement(child)}
            </li>
          ))}
        </ul>
      </li>
    );
  };

  const getCheckboxElement = (keyword: EventKeyword | RelatedEventKeyWord) => {
    const { id, name, ontology_type } = keyword;
    return (
      <FormControlLabel
        value={id}
        label={getTranslatedValue(name, currentLang)}
        control={
          <Checkbox
            disabled={ontology_type === 'OntologyHierarchy'}
            onChange={handleToggle}
            checked={searchedKeywords.includes(id)}
          />
        }
      />
    );
  };

  const getButtonElement = (keyword: EventKeyword | RelatedEventKeyWord, parent = false) => {
    const keywordName = getTranslatedValue(keyword.name, currentLang) || keyword.id;
    const ariaLabel = t('showNarrowerConcepts', { value: keywordName });
    const ariaLabelParent = t('showBroaderConcepts', { value: keywordName });
    const arrowType = parent ? 'up' : 'down';

    return (
      <button
        aria-label={parent ? ariaLabelParent : ariaLabel}
        onClick={() => onHierarchyChange(keyword)}
        className={styles.keywordToggleButton}
      >
        {arrowType === 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </button>
    );
  };

  const renderContent = () => {
    if (isLoading || isFetching) {
      return (
        <Box sx={{ textAlign: 'center' }} className={styles.keywordSelectorPaddedContent}>
          <CircularProgress />
        </Box>
      );
    }

    if (isError) {
      return (
        <div className={styles.keywordSelectorPaddedContent}>
          <Alert severity="error" sx={{ lineHeight: 'unset' }}>
            {t('errorLoadingKeyword')}
          </Alert>
        </div>
      );
    }

    if (keyword) {
      return getParentElements();
    }

    return null;
  };

  return (
    <Paper sx={{ width: '100%', maxWidth: 500 }} className={styles.keywordSelectorWrapper}>
      {renderContent()}
    </Paper>
  );
};

export default KeywordSelector;
