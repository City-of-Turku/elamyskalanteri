import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';

const AdditionalCategories = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { addEventType, removeEventTypes } = bindActionCreators(filterSlice.actions, dispatch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addEventType(e.target.value);
    } else {
      removeEventTypes([e.target.value]);
    }
  };
  return (
    <FormGroup sx={{ padding: 2 }}>
      <p>{`${t('additionalCategories')}`}</p>
      <FormControlLabel
        control={<Checkbox onChange={(event) => handleChange(event)} />}
        label="MiHi"
        value="system:extra:mihi"
      />
      <FormControlLabel
        control={<Checkbox onChange={(event) => handleChange(event)} />}
        label="Kivakesä"
        value="system:extra:kivakesa"
      />
      <FormControlLabel
        control={<Checkbox onChange={(event) => handleChange(event)} />}
        label="Kivaloma"
        value="system:extra:kivaloma"
      />
    </FormGroup>
  );
};

export default AdditionalCategories;
