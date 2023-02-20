import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTENT_TYPES, features } from '../../../constants';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { useKeywordSetQuery } from '../../../redux/services/keywordApi';
import filterSlice from '../../../redux/slices/filterSlice';
import { Category, EventKeyword } from '../../../types';
import Accordion from '../../Accordion/Accordion';
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

  // Bind setFeatures to dispatch, so it can be called without dispatch
  const {
    addFeature,
    removeFeature,
    addEventType,
    removeEventTypes,
    addAudience,
    removeAudience,
    setTypeId,
  } = bindActionCreators(filterSlice.actions, dispatch);

  const [typeIdState, setTypeIdState] = useState(filters.typeId);
  const [categoryGroups, setCategoryGroups] = useState<{
    [key: string]: Array<CategoryDescriptor>;
  }>({});
  const [audiences, setAudiences] = useState<Array<Category> | null>(null);
  const [organizer, setOrganizer] = useState<string | null>(null);

  const prevOrganizerRef = useRef<string | null>(null);

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

  const handleOrganizerChange = (organizerId: string | null) => {
    setOrganizer(organizerId);
  };

  const addSelectedCategory = (yso: string) => {
    addEventType(yso);
  };

  const removeSelectedCategory = (yso: string) => {
    removeEventTypes([yso]);
  };

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
    if (organizer !== prevOrganizerRef.current) {
      if (prevOrganizerRef.current !== null) {
        removeEventTypes([prevOrganizerRef.current]);
      }
      if (organizer != null) {
        addEventType(organizer);
      }
      prevOrganizerRef.current = organizer;
    }
  }, [organizer, addEventType, removeEventTypes]);

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
          {t('whom')}
        </Typography>

        {renderAudiences()}

        <Typography variant="h3" style={{ margin: '16px 0 0 0' }}>
          {t('features')}
        </Typography>

        {renderFeatures()}

        <div className={styles.rowWrap}>
          <OrganizationContainer onChange={(newId) => handleOrganizerChange(newId)} />
        </div>
      </Accordion>
    </div>
  );
};

export default WhatContainer;
