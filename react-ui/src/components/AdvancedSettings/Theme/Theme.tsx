import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';

const Theme = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setTheme } = bindActionCreators(filterSlice.actions, dispatch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme(e.target.value);
    }
  };

  return (
    <FormControl sx={{ padding: 2 }}>
      <p>{`${t('style')}`}</p>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="whitelabel"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="whitelabel" control={<Radio />} label={t('whiteLabel')} />
        <FormControlLabel value="vink" control={<Radio />} label="Vink" />
        <FormControlLabel value="turku" control={<Radio />} label={t('turku')} />
        <FormControlLabel value="naantali" control={<Radio />} label={t('naantali')} />
        <FormControlLabel value="raisio" control={<Radio />} label={t('raisio')} />
        <FormControlLabel value="kaarina" control={<Radio />} label={t('kaarina')} />
        <FormControlLabel value="tai" control={<Radio />} label={t('tai')} />
      </RadioGroup>
    </FormControl>
  );
};

export default Theme;
