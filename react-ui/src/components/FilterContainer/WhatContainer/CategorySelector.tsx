import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { Category } from '../../../types';
import FilterChip from '../FilterChip/FilterChip';
import styles from './WhatContainer.module.css';

export type ICategorySelectorProps = {
  categories: Category[];
  selected: string[];
  handleDelete: (yso: string) => void;
  handleAdd: (yso: string) => void;
};

export const CategorySelector = (props: ICategorySelectorProps) => {
  const { categories, selected, handleAdd, handleDelete } = props;
  const { i18n } = useTranslation();

  if (!categories) return null;

  return (
    <div className={styles.chipContainer}>
      {categories.map((category) => (
        <FilterChip
          key={category.yso}
          label={getTranslatedValue(category.name, i18n.language) || ''}
          active={selected.includes(category.yso)}
          handleClick={() => handleAdd(category.yso)}
          handleDelete={() => handleDelete(category.yso)}
        />
      ))}
    </div>
  );
};
