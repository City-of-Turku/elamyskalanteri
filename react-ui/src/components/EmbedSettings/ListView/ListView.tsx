import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box, Radio, RadioGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LAYOUT_OPTIONS } from '../../../constants';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import embedSettingsSlice from '../../../redux/slices/embedSettingsSlice';
import styles from './ListView.module.css';

const ListView = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setListView, setNumberOfView } = bindActionCreators(embedSettingsSlice.actions, dispatch);

  const handleListViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setListView(e.target.value);
    }
  };

  const handleResultMaxCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null) {
      setNumberOfView(e.target.value);
    }
  };

  return (
    <div>
      <FormControl sx={{ padding: 2 }}>
        <p>{t('listView')}</p>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue={LAYOUT_OPTIONS.LIST}
          name="radio-buttons-group"
          onChange={handleListViewChange}
        >
          <div className={styles.listGroup}>
            <FormControlLabel
              value={LAYOUT_OPTIONS.LIST}
              control={<Radio />}
              label={t('layoutList')}
            />
            <ViewListIcon />
          </div>
          <div className={styles.listGroup}>
            <FormControlLabel
              value={LAYOUT_OPTIONS.GRID}
              control={<Radio />}
              label={t('layoutGrid')}
            />
            <ViewModuleIcon />
          </div>
          <div className={styles.listGroup}>
            <FormControlLabel
              value={LAYOUT_OPTIONS.COMPACT}
              control={<Radio />}
              label={t('layoutCompact')}
            />
            <ViewAgendaIcon />
          </div>
        </RadioGroup>
        <Box component="p" sx={{ marginTop: 3, marginBottom: 1 }}>
          {t('numberOfViewsTitle')}
        </Box>
        <TextField
          onChange={handleResultMaxCount}
          type="number"
          margin="normal"
          InputProps={{
            inputProps: {
              max: 100,
              min: 1,
            },
          }}
          label={t('numberOfViews')}
        />
      </FormControl>
    </div>
  );
};

export default ListView;
