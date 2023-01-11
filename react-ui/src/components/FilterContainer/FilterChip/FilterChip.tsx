import { Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import styles from './FilterChip.module.css';

interface IProps {
  label: string;
  active?: boolean;
  handleClick?: () => void;
  handleDelete?: () => void;
}

/*
 * Displays either outlined chip or deletable chip based on active status
 * MUI's chips change visual whether they are provided with `onDelete` or `onClick` prop
 */

const FilterChip = ({ label, active, handleClick, handleDelete }: IProps) => {
  const theme: any = useTheme();

  return (
    <>
      {active ? (
        <Chip
          label={
            <Typography sx={{ fontFamily: 'forma-djr-micro, sans-serif' }}>{label}</Typography>
          }
          variant={active ? 'filled' : 'outlined'}
          className={styles.chip}
          color="primary"
          sx={{ backgroundColor: theme.palette.primary.dark, color: '#ffffff', fontSize: 16 }}
          onDelete={() => (handleDelete ? handleDelete() : null)}
        />
      ) : (
        <Chip
          label={
            <Typography sx={{ fontFamily: 'forma-djr-micro, sans-serif' }}>{label}</Typography>
          }
          variant={active ? 'filled' : 'outlined'}
          onClick={() => (handleClick ? handleClick() : null)}
          className={styles.chip}
          sx={{
            color: theme.palette.primary.dark,
            backgroundColor: 'rgba(242, 202, 153, 0.2);',
            fontSize: 16,
          }}
        />
      )}
    </>
  );
};

export default FilterChip;
