import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import embedSettingsSlice from '../../../redux/slices/embedSettingsSlice';

const ShowPastEvents = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setShowPastEvents } = bindActionCreators(embedSettingsSlice.actions, dispatch);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPastEvents((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <FormControl sx={{ padding: 2 }}>
        <p>{`${t('showPastEvents')}`}</p>
        <RadioGroup
          row
          defaultValue="false"
          name="show-past-events-radio-buttons"
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label={`${t('yes')}`} />
          <FormControlLabel value="false" control={<Radio />} label={`${t('no')}`} />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ShowPastEvents;
