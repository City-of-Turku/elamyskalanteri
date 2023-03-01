import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTENT_TYPES, features } from '../../../constants';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { useKeywordSetQuery } from '../../../redux/services/keywordApi';
import filterSlice from '../../../redux/slices/filterSlice';
import { Category, EventKeyword } from '../../../types';
import Accordion from '../../Accordion/Accordion';
import KeywordSearch from '../KeywordSearch/KeywordSearch';
import OrganizationContainer from '../OrganizationContainer/OrganizationContainer';
import { CategorySelector } from './CategorySelector';
import styles from './WhatContainer.module.css';

type CategoryDescriptor = {
  title: string;
  categories: Category[];
};

const WhatContainer = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state);
  const { data: keywordSetData, isLoading, isFetching } = useKeywordSetQuery();
  const keywordSetList = keywordSetData?.data;
  const currentLang = i18n.language;
  const step = 1;
  // Bind setFeatures to dispatch, so it can be called without dispatch
  const {
    addFeature,
    removeFeature,
    addEventType,
    removeEventTypes,
    addAudience,
    removeAudience,
    setTypeId,
    setSuitableFor,
  } = bindActionCreators(filterSlice.actions, dispatch);

  const [typeIdState, setTypeIdState] = useState(filters.typeId);
  const [categoryGroups, setCategoryGroups] = useState<{
    [key: string]: Array<CategoryDescriptor>;
  }>({});
  const [audiences, setAudiences] = useState<Array<Category> | null>(null);
  const [minAge, maxAge] = [1, 100];
  const [useAgeFilter, setUseAgeFilter] = useState<boolean>(!!filters.suitableFor?.length);
  const [suitableFor, setSuitableForState] = useState<number[]>([minAge, maxAge]);

  const marks = [
    {
      value: minAge,
      label: `${minAge}`,
    },
    {
      value: maxAge,
      label: `${maxAge}`,
    },
  ];
  const handleTypeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (typeIdState) {
      removeEventTypes(
        categoryGroups[typeIdState]?.reduce((acc: Array<string>, curr) => {
          const currentCategories = curr.categories?.map((cat) => cat.yso) || [];
          return [...acc, ...currentCategories];
        }, []),
      );
    }
    setTypeIdState(val);
    setTypeId(val);
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addFeature(e.target.value);
    } else {
      removeFeature(e.target.value);
    }
  };

  const handleAudienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addAudience(e.target.value);
    } else {
      removeAudience(e.target.value);
    }
  };

  const addSelectedCategory = (yso: string) => {
    addEventType(yso);
  };

  const removeSelectedCategory = (yso: string) => {
    removeEventTypes([yso]);
  };

  const handleAgeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSuitableFor([suitableFor[0], suitableFor[1]]);
    } else {
      setSuitableFor([]);
    }
    setUseAgeFilter(checked);
  };

  const handeAgeGroupChange = useCallback(
    (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (activeThumb === 0) {
        const age = suitableFor[1];
        const minAge = Math.min(newValue[0], age - step),
          newAgeRange = [minAge, age];
        setSuitableFor(newAgeRange);
        setSuitableForState(newAgeRange);
      } else {
        const age = suitableFor[0];
        const maxAge = Math.max(newValue[1], age + step),
          newAgeRange = [age, maxAge];
        setSuitableFor(newAgeRange);
        setSuitableForState(newAgeRange);
      }
    },
    [suitableFor, setSuitableFor, setSuitableForState],
  );

  useEffect(() => {
    if (keywordSetList) {
      const createYsoObjects = (keywordObjects: EventKeyword[]): Array<Category> =>
        keywordObjects.map((obj) => ({
          name: obj.name,
          yso: obj.id,
        }));

      const getCategories = (id: string) => {
        if (!keywordSetList.length) return [];
        const keywords = keywordSetList.find((item) => item.id === id)?.keywords;
        return createYsoObjects(keywords || []);
      };

      const _categoryGroups = {
        [CONTENT_TYPES.EVENTS]: [
          {
            title: t('content'),
            categories: getCategories('turku:topic_content'),
          },
          {
            title: t('eventType'),
            categories: getCategories('turku:topic_type'),
          },
        ],
        [CONTENT_TYPES.HOBBIES]: [
          {
            title: t('content'),
            categories: getCategories('turku:hobbytopics'),
          },
        ],
        [CONTENT_TYPES.COURSES]: [
          {
            title: t('content'),
            categories: getCategories('turku:coursetopics'),
          },
        ],
      };

      const _audiences = getCategories('turku:audience');

      setCategoryGroups(_categoryGroups);
      setAudiences(_audiences);
    }
  }, [keywordSetList, t]);

  useEffect(() => {
    if (filters.typeId) {
      setTypeIdState(filters.typeId);
    }
  }, [filters.typeId]);

  useEffect(() => {
    if (filters.suitableFor.length) {
      const suitableFor = filters.suitableFor;
      setSuitableForState(suitableFor);
      setUseAgeFilter(true);
    }
  }, [useAgeFilter, filters.suitableFor]);

  const renderCategories = () => {
    if (!typeIdState) return null;

    if (isLoading || isFetching) {
      return <CircularProgress />;
    }

    return categoryGroups[typeIdState]?.map((group, index) => (
      <div key={index}>
        <Typography variant="h3" style={{ margin: '16px 0' }}>
          {group.title}
        </Typography>
        <div className={styles.rowWrap}>
          <CategorySelector
            categories={group.categories}
            handleAdd={(yso) => {
              addSelectedCategory(yso);
            }}
            handleDelete={(yso) => {
              removeSelectedCategory(yso);
            }}
            selected={filters.eventTypes}
          />
        </div>
      </div>
    ));
  };

  const renderKeywordSearch = () => {
    return <KeywordSearch />;
  };

  const renderAudiences = () => {
    if (audiences === null) {
      return <CircularProgress />;
    }

    return (
      <FormGroup row>
        {audiences.map((audience) => (
          <FormControlLabel
            key={audience.yso}
            control={
              <Checkbox
                onChange={(e) => handleAudienceChange(e)}
                checked={filters.audiences?.includes(audience.yso)}
              />
            }
            label={<Typography>{getTranslatedValue(audience.name, currentLang)}</Typography>}
            style={{ width: '250px' }}
            value={audience.yso}
          />
        ))}
      </FormGroup>
    );
  };

  const renderFeatures = () => (
    <FormGroup row>
      {features.map((feature) => (
        <FormControlLabel
          key={getTranslatedValue(feature.label, currentLang)}
          control={
            <Checkbox
              onChange={(e) => handleFeatureChange(e)}
              checked={filters.eventFeatures.includes(feature.value)}
            />
          }
          label={<Typography>{getTranslatedValue(feature.label, currentLang)}</Typography>}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={feature.value}
        />
      ))}
    </FormGroup>
  );

  const renderAgeFilter = () => (
    <FormGroup row>
      <FormControlLabel
        control={<Switch onChange={(e) => handleAgeFilter(e)} checked={Boolean(useAgeFilter)} />}
        label={t('useAgeFilter')}
        value={useAgeFilter}
      />
    </FormGroup>
  );

  const renderAgeSlider = () => (
    <Box sx={{ width: 400 }}>
      <Typography variant="body1">{t('ageGroup')}</Typography>
      <Slider
        getAriaLabel={() => t('ageGroup')}
        valueLabelDisplay="on"
        value={suitableFor.map((val) => +val)}
        min={minAge}
        max={maxAge}
        size="medium"
        onChange={handeAgeGroupChange}
        disableSwap
        marks={marks}
      />
    </Box>
  );

  return (
    <div>
      <Accordion title={`${t('what')}?`} icon={LocalActivityIcon}>
        <Typography variant="h3">{t('contentType')}</Typography>

        <div className={styles.rowWrap}>
          <RadioGroup
            row
            value={typeIdState}
            name="event-type-group"
            onChange={(e) => handleTypeIdChange(e)}
            style={{ textTransform: 'capitalize' }}
          >
            <FormControlLabel
              value={CONTENT_TYPES.EVENTS}
              control={<Radio />}
              label={t('events')}
            />
            <FormControlLabel
              value={CONTENT_TYPES.HOBBIES}
              control={<Radio />}
              label={t('hobbies')}
            />
            <FormControlLabel
              value={CONTENT_TYPES.COURSES}
              control={<Radio />}
              label={t('educations')}
            />
          </RadioGroup>
        </div>

        {renderCategories()}

        <Typography variant="h3" style={{ margin: '16px 0 0 0' }}>
          {t('keywords')}
        </Typography>

        {renderKeywordSearch()}

        <Typography variant="h3" style={{ margin: '16px 0 0 0' }}>
          {t('whom')}
        </Typography>

        {renderAudiences()}

        <Typography variant="h3" style={{ margin: '16px 0 0 0' }}>
          {t('suitableFor')}
        </Typography>

        {renderAgeFilter()}

        {useAgeFilter && renderAgeSlider()}

        <Typography variant="h3" style={{ margin: '16px 0 0 0' }}>
          {t('features')}
        </Typography>

        {renderFeatures()}

        <div className={styles.rowWrap}>
          <OrganizationContainer />
        </div>
      </Accordion>
    </div>
  );
};

export default WhatContainer;
