import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import embedSettingsSlice from '../../../redux/slices/embedSettingsSlice';

const LinkContainer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setLinkContainer, setLinkText } = bindActionCreators(
    embedSettingsSlice.actions,
    dispatch,
  );

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length >= 0) {
      setLinkContainer(e.target.value.trim());
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length >= 0) {
      setLinkText(e.target.value.trim());
    }
  };

  return (
    <div>
      <FormControl sx={{ padding: 2 }}>
        <p>{t('showLink')}</p>
        <div>
          <TextField
            onChange={handleLinkChange}
            id="outlined-basic"
            label={t('siteUrl')}
            variant="outlined"
            margin="normal"
            sx={{ marginRight: 2 }}
          />
          <TextField
            onChange={handleTextChange}
            id="outlined-basic"
            label={t('linkText')}
            variant="outlined"
            margin="normal"
          />
        </div>
      </FormControl>
    </div>
  );
};

export default LinkContainer;
