import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext } from 'react';
import { CurrentLanguageContext } from '../../translations/TranslationProvider';
import styles from './FilterContainer.module.scss';
import SearchBox from './SearchBox/SearchBox';
import WhatContainer from './WhatContainer/WhatContainer';
import WhenContainer from './WhenContainer/WhenContainer';
import WhereContainer from './WhereContainer/WhereContainer';

const FilterContainer = () => {
  const currentLang = useContext(CurrentLanguageContext);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.searchContainer}>
          <WhatContainer />
          <div className={styles.divider} />
          <WhereContainer />
          <div className={styles.divider} />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang}>
            <WhenContainer />
          </LocalizationProvider>
          <div className={styles.divider} />
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
