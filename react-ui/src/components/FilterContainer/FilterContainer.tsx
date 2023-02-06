import React from 'react';
import styles from './FilterContainer.module.css';
import SearchBox from './SearchBox/SearchBox';
import WhatContainer from './WhatContainer/WhatContainer';
import WhenContainer from './WhenContainer/WhenContainer';
import WhereContainer from './WhereContainer/WhereContainer';

const FilterContainer = () => (
  <div className={styles.container}>
    <div className={styles.innerContainer}>
      <div className={styles.searchContainer}>
        <WhatContainer />
        <div className={styles.divider} />
        <WhereContainer />
        <div className={styles.divider} />
        <WhenContainer />
        <div className={styles.divider} />
        <SearchBox />
      </div>
    </div>
  </div>
);

export default FilterContainer;
