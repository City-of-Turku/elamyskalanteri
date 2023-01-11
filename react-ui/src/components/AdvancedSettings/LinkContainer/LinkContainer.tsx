import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';

const LinkContainer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setLinkContainer, setLinkText } = bindActionCreators(filterSlice.actions, dispatch);

  const handleLinkChange = (e: any) => {
    if (e.target.value.trim().length >= 0) {
      setLinkContainer(e.target.value.trim());
    }
  };

  const handleTextChange = (e: any) => {
    if (e.target.value.trim().length >= 0) {
      setLinkText(e.target.value.trim());
    }
  };

  return (
    <div>
      <FormControl sx={{ padding: 2 }}>
        <p>{`${t('showLink')}`}</p>
        <div>
          <TextField
            onChange={(event) => handleLinkChange(event)}
            id="outlined-basic"
            label={`${t('siteUrl')}`}
            variant="outlined"
            margin="normal"
          />
          <TextField
            onChange={(event) => handleTextChange(event)}
            id="outlined-basic"
            label={`${t('linkText')}`}
            variant="outlined"
            margin="normal"
          />
        </div>
      </FormControl>
    </div>
  );
};

export default LinkContainer;
