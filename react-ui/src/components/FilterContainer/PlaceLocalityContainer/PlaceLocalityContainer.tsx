import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';
import { Locality, Translatable } from '../../../types';
import FilterChip from '../FilterChip/FilterChip';

type IProps = {
  localities: Locality[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

const PlaceLocalityContainer = ({ localities, isLoading, isError, isSuccess }: IProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state);
  const { addLocalities, removeLocalities } = bindActionCreators(filterSlice.actions, dispatch);
  const selected = filters.localities;
  const currentLang = i18n.language;

  const localityOptions = localities?.map((locality) => ({
    value: locality[currentLang as keyof Translatable]
      ? locality[currentLang as keyof Translatable]
      : locality.fi,
    label: getTranslatedValue(locality, i18n.language),
  }));

  return (
    <div>
      {!isLoading && isError && <div>{t('errorLoadingLocalities')}</div>}
      {isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {isSuccess && localityOptions && !!localityOptions.length && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px 4px' }}>
          {localityOptions.map((locality, index) => (
            <FilterChip
              key={index}
              label={locality.label || ''}
              active={selected.includes(locality.value)}
              handleClick={() => addLocalities(locality.value)}
              handleDelete={() => removeLocalities(locality.value)}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default PlaceLocalityContainer;
