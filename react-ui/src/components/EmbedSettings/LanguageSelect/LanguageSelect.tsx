import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import embedSettingsSlice from '../../../redux/slices/embedSettingsSlice';

const LanguageSelect = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setLanguageSelection } = bindActionCreators(embedSettingsSlice.actions, dispatch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setLanguageSelection(e.target.value);
    }
  };

  return (
    <FormControl sx={{ padding: 2 }}>
      <p>{`${t('language')}`}</p>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="fi"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="fi" control={<Radio />} label="FI" />
        <FormControlLabel value="sv" control={<Radio />} label="SV" />
        <FormControlLabel value="en" control={<Radio />} label="EN" />
      </RadioGroup>
    </FormControl>
  );
};

export default LanguageSelect;
