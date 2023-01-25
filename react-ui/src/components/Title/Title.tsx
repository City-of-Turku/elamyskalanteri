import { Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';
import styles from './Title.module.css';

const Title = () => {
  const options = useAppSelector((state) => state.options);

  return (
    <>
      <div className={styles.sloganContainer}>
        <div>
          {options.title && (
            <Typography className={styles.sloganTitle} variant="h2">
              {options.title}
            </Typography>
          )}
        </div>
        <div>
          {options.description && (
            <Typography className={styles.sloganDesc} variant="subtitle2">
              {options.description}
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default Title;
