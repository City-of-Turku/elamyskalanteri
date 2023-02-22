import { Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';
import styles from './Title.module.scss';

const Title = () => {
  const options = useAppSelector((state) => state.options);

  if (options.title || options.description) {
    return (
      <div className={styles.sloganContainer}>
        {options.title && (
          <Typography variant="h1" component="h2">
            {options.title}
          </Typography>
        )}
        {options.description && <Typography variant="body2">{options.description}</Typography>}
      </div>
    );
  }

  return null;
};

export default Title;
