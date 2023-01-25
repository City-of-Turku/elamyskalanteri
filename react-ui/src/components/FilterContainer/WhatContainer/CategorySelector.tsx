import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FilterChip from '../FilterChip/FilterChip';
import styles from './WhatContainer.module.css';

export interface ICategory {
  name: {
    fi: string;
    en: string;
    sv: string;
  };
  yso: string;
}

interface ICategorySelectorProps {
  title: string;
  categories: ICategory[];
  isLoading: boolean;
  selected: string[];
  handleDelete(yso: string): any;
  handleAdd(yso: string): any;
}

export const CategorySelector = (props: ICategorySelectorProps) => {
  const { i18n } = useTranslation();
  const theme: any = useTheme();

  return (
    <>
      <p
        style={{
          color: theme.palette.primary.dark,
          fontSize: 18,
          fontFamily: 'halogen, sans-serif',
          fontWeight: 900,
          //textTransform: "capitalize",
        }}
      >
        <b>{props.title}</b>
      </p>
      <div className={styles.chipContainer}>
        {props.isLoading && <CircularProgress />}
        {props.categories &&
          props.categories.map((category: ICategory) => (
            <FilterChip
              key={category.yso}
              label={category.name[i18n.language as keyof typeof category.name]}
              active={props.selected.includes(category.yso)}
              handleClick={() => props.handleAdd(category.yso)}
              handleDelete={() => props.handleDelete(category.yso)}
            />
          ))}
      </div>
    </>
  );
};
