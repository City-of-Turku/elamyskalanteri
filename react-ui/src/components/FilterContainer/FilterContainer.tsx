import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CalendarContainer from '../Calendar/CalendarContainer';
import styles from './FilterContainer.module.css';
import SearchBox from './SearchBox/SearchBox';
import WhatContainer from './WhatContainer/WhatContainer';
import WhereContainer from './WhereContainer/WhereContainer';

const FilterContainer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <>
          <div className={styles.searchContainer}>
            <WhatContainer />
            <div className={styles.divider} />
            <WhereContainer />
            <div className={styles.divider} />
            <SearchBox />
          </div>
        </>
        <div className={styles.calendarContainer}>
          <div className={styles.whenRow}>
            <div
              style={{ backgroundColor: theme.palette.primary.main }}
              className={styles.iconWrapper}
            >
              <EventAvailableIcon sx={{ fontSize: 32, color: '#ffffff' }} />
            </div>
            <h3 style={{ color: theme.palette.primary.dark }}>{t('when')}?</h3>
          </div>
          <CalendarContainer />
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
