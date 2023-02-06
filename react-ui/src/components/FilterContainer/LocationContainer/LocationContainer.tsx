import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCoords, Position } from '../../../functions/boundingBox';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';

const LocationContainer = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  // Bind setBbox to dispatch, so it can be called without dispatch
  const { setBbox } = bindActionCreators(filterSlice.actions, dispatch);

  const [activeCheckbox, setActiveCheckbox] = useState<number | null>(null);

  const handleLocation = (d: number) => {
    const location = navigator.geolocation;
    location.getCurrentPosition(
      (pos) => handleCoords(pos, d),
      () => console.error('Could not locate'),
      { timeout: 5000 },
    );

    const handleCoords = (pos: Position, d: number) => {
      const coords = getCoords(pos, d);
      setBbox(coords);
    };
  };

  return (
    <div>
      <Typography variant="h3" style={{ margin: '0 0 16px 0' }}>
        {t('near')}
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  setBbox({ north: null, east: null, south: null, west: null });
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocation(1);
              }}
            />
          }
          label={`${t('under')} 1 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={1}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  setBbox({ north: null, east: null, south: null, west: null });
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocation(3);
              }}
            />
          }
          label={`${t('under')} 3 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={2}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  setBbox({ north: null, east: null, south: null, west: null });
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocation(5);
              }}
            />
          }
          label={`${t('under')} 5 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={3}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  setBbox({ north: null, east: null, south: null, west: null });
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocation(10);
              }}
            />
          }
          label={`${t('under')} 10 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={4}
        />
      </FormGroup>
    </div>
  );
};

export default LocationContainer;
