import { Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';
import styles from './Title.module.css';

const Title = () => {
  const options = useAppSelector((state) => state.options);

  if (options.title || options.description) {
    return (
      <div className={styles.sloganContainer}>
        {options.title && (
          <div>
            <Typography className={styles.sloganTitle} variant="h2">
              {options.title}
            </Typography>
          </div>
        )}
        {options.description && (
          <div>
            <Typography className={styles.sloganDesc} variant="body1">
              {options.description}
            </Typography>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Title;
