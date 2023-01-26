import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCoords } from '../../../functions/boundingBox';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';

const LocationContainer = () => {
  const theme = useTheme();
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

    const handleCoords = (pos: { coords: any }, d: number) => {
      const coords = getCoords(pos, d);
      setBbox(coords);
    };
  };

  return (
    <div>
      <b
        style={{
          color: theme.palette.primary.dark,
          fontSize: 18,
          fontFamily: 'halogen, sans-serif',
          fontWeight: 900,
          textTransform: 'capitalize',
        }}
      >
        <p>{t('near')}</p>
      </b>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography sx={{ fontFamily: 'forma-djr-micro, sans-serif' }}>{`${t(
              'under',
            )} 1 km`}</Typography>
          }
          labelPlacement={'end'}
          style={{ width: '140px' }}
          value={1}
          checked={activeCheckbox === 1}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null);
              setBbox({ north: null, east: null, south: null, west: null });
              return;
            }
            setActiveCheckbox(Number(e.target.value));
            handleLocation(1);
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography sx={{ fontFamily: 'forma-djr-micro, sans-serif' }}>{`${t(
              'under',
            )} 3 km`}</Typography>
          }
          labelPlacement={'end'}
          style={{ width: '140px' }}
          value={2}
          checked={activeCheckbox === 2}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null);
              setBbox({ north: null, east: null, south: null, west: null });
              return;
            }
            setActiveCheckbox(Number(e.target.value));
            handleLocation(3);
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography sx={{ fontFamily: 'forma-djr-micro, sans-serif' }}>{`${t(
              'under',
            )} 5 km`}</Typography>
          }
          labelPlacement={'end'}
          style={{ width: '140px' }}
          value={3}
          checked={activeCheckbox === 3}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null);
              setBbox({ north: null, east: null, south: null, west: null });
              return;
            }
            setActiveCheckbox(Number(e.target.value));
            handleLocation(5);
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography sx={{ fontFamily: 'forma-djr-micro, sans-serif' }}>{`${t(
              'under',
            )} 10 km`}</Typography>
          }
          labelPlacement={'end'}
          style={{ width: '140px' }}
          value={4}
          checked={activeCheckbox === 4}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null);
              setBbox({ north: null, east: null, south: null, west: null });
              return;
            }
            setActiveCheckbox(Number(e.target.value));
            handleLocation(10);
          }}
        />
      </FormGroup>
    </div>
  );
};

export default LocationContainer;
