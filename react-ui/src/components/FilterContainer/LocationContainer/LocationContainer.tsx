import { Alert, Checkbox, CircularProgress, FormControlLabel, FormGroup } from '@mui/material';
import { Box } from '@mui/system';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice, { initialState } from '../../../redux/slices/filterSlice';

const LocationContainer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { setMaxDistance } = bindActionCreators(filterSlice.actions, dispatch);
  const [activeCheckbox, setActiveCheckbox] = useState<number | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>('');
  const initialMaxDistance = initialState.maxDistance;

  const handleSetMaxDistance = (pos: GeolocationPosition, radius: number) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const maxDistance = {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
    };
    dispatch(setMaxDistance(maxDistance));
  };

  const handleLocationChange = (radius: number) => {
    setIsLoadingLocation(true);

    const location = navigator.geolocation;

    location.getCurrentPosition(
      (pos) => {
        handleSetMaxDistance(pos, radius);
        setLocationError('');
        setIsLoadingLocation(false);
      },
      () => {
        // Error handling
        navigator.permissions
          .query({
            name: 'geolocation',
          })
          .then((result) => {
            if (result.state === 'denied') {
              setLocationError(t('locationPermissionsDenied'));
            } else {
              setLocationError(t('couldNotLocate'));
            }
            setIsLoadingLocation(false);
          });
      },
      {
        // maximum age in milliseconds of a possible cached position that is acceptable to return.
        maximumAge: 60000, // 1 minute
      },
    );
  };

  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  dispatch(setMaxDistance(initialMaxDistance));
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocationChange(1000); // 1 km
              }}
            />
          }
          disabled={isLoadingLocation}
          label={`${t('under')} 1 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={1}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  dispatch(setMaxDistance(initialMaxDistance));
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocationChange(3000); // 3 km
              }}
            />
          }
          disabled={isLoadingLocation}
          label={`${t('under')} 3 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={3}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 5}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  dispatch(setMaxDistance(initialMaxDistance));
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocationChange(5000);
              }}
            />
          }
          disabled={isLoadingLocation}
          label={`${t('under')} 5 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={5}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={activeCheckbox === 10}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  setActiveCheckbox(null);
                  dispatch(setMaxDistance(initialMaxDistance));
                  return;
                }
                setActiveCheckbox(Number(e.target.value));
                handleLocationChange(10000);
              }}
            />
          }
          disabled={isLoadingLocation}
          label={`${t('under')} 10 km`}
          labelPlacement={'end'}
          style={{ width: '140px', textTransform: 'capitalize' }}
          value={10}
        />
        {isLoadingLocation && <CircularProgress />}
      </FormGroup>
      {locationError && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" sx={{ lineHeight: 'unset' }}>
            {locationError}
          </Alert>
        </Box>
      )}
    </div>
  );
};

export default LocationContainer;
