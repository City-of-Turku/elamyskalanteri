import { alpha, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();

  return (
    <>
      {active ? (
        <Chip
          label={<Typography sx={{ color: 'inherit' }}>{label}</Typography>}
          variant={active ? 'filled' : 'outlined'}
          className={styles.chip}
          color="secondary"
          sx={{ backgroundColor: theme.palette.secondary.main, color: '#fff', fontSize: 16 }}
          onDelete={() => (handleDelete ? handleDelete() : null)}
        />
      ) : (
        <Chip
          label={<Typography sx={{ color: 'inherit' }}>{label}</Typography>}
          variant={active ? 'filled' : 'outlined'}
          onClick={() => (handleClick ? handleClick() : null)}
          className={styles.chip}
          sx={{
            color: theme.palette.secondary.main,
            // backgroundColor: 'rgba(242, 202, 153, 0.2);',
            backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.08),
            fontSize: 16,
          }}
        />
      )}
    </>
  );
};

export default FilterChip;
