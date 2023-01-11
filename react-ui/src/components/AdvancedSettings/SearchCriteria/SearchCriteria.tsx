import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';

const SearchCriteria = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setSearchCriteria } = bindActionCreators(filterSlice.actions, dispatch);

  const handleChange = (e: any) => {
    if (e.target.checked) {
      setSearchCriteria(e.target.value);
    }
  };

  return (
    <div>
      <FormControl sx={{ padding: 2 }}>
        <p>{`${t('hideSearchCriteria')}`}</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="true"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label={`${t('yes')}`}
            onChange={(event) => handleChange(event)}
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label={`${t('no')}`}
            onChange={(event) => handleChange(event)}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SearchCriteria;
