import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Radio, RadioGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';
import styles from '../AdvancedSettings.module.css';

const ListView = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setListView, setNumberOfView } = bindActionCreators(filterSlice.actions, dispatch);

  const handleListViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setListView(e.target.value);
    }
  };

  const handleNumOfView = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          defaultValue="grid"
          name="radio-buttons-group"
          onChange={handleListViewChange}
        >
          <div className={styles.listGroup}>
            <FormControlLabel
              value="grid"
              control={<Radio />}
              label={t('grid')}
            />
            <ViewModuleIcon />
          </div>
          <div className={styles.listGroup}>
            <FormControlLabel
              value="vertical"
              control={<Radio />}
              label={t('verticalList')}
            />
            <ViewListIcon />
          </div>
          <div className={styles.listGroup}>
            <FormControlLabel
              value="horizontal"
              control={<Radio />}
              label={t('horizontalList')}
            />
            <ViewColumnIcon />
          </div>
        </RadioGroup>
        <TextField
          onChange={handleNumOfView}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { width: '15ch' },
          }}
          type="number"
          margin="normal"
          InputProps={{
            inputProps: {
              max: 100,
              min: 0,
            },
          }}
          label={t('numberOfViews')}
        />
      </FormControl>
    </div>
  );
};

export default ListView;
