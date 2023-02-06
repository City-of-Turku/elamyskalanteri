import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';

const TextFields = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setEmbedTitle, setEmbedDesc } = bindActionCreators(filterSlice.actions, dispatch);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length >= 0) {
      setEmbedTitle(e.target.value.trim());
    }
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length >= 0) {
      setEmbedDesc(e.target.value.trim());
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={handleTitleChange}
        id="outlined-basic"
        label={`${t('title')}`}
        variant="outlined"
        margin="normal"
      />
      <TextField
        onChange={handleDescChange}
        id="outlined-multiline-static"
        label={`${t('shortDecription')}`}
        multiline
        rows={4}
        margin="normal"
      />
    </Box>
  );
};

export default TextFields;
