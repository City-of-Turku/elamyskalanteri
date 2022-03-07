import { Chip } from "@mui/material"
import { useState } from "react";
import styles from "./FilterContainer.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/rtkHooks";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../redux/slices/filterSlice";

interface Category {
  fi: string,
  term: string
}

const FilterContainer = () => {

  const dispatch = useAppDispatch()
  const { setName } = bindActionCreators(filterSlice.actions, dispatch)
  const { filters } = useAppSelector(state => state)

  // These should be ideally fetched from an API...
  const categories = [
    {fi: "Festivaalit", term: "festival"},
    {fi: "Keskustelutilaisuudet", term: "talks"},
    {fi: "Konsertit", term: "conserts"}
  ]

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (f: Category) => {
    setActiveFilters(activeFilters.concat(f.term))
  }

  const removeFilter = (f: Category) => {
    setActiveFilters(activeFilters.filter(filter => filter !== f.term))
  }

  return (
    <div className={styles.container}>
      <h2>Hae tapahtumia</h2>
      <input
        className={styles.search}
        type="text"
        placeholder={"Hae..."}
        value={filters.name}
        onChange={(e) => setName(e.target.value) }
      />
      <div className={styles.chipContainer}>
        {categories.map(category => (
          <FilterChip
            label={category.fi}
            active={activeFilters.includes(category.term)}
            handleClick={() => addFilter(category)}
            handleDelete={() => removeFilter(category)}
          />
        ))}
      </div>


    </div>
  )

}

export default FilterContainer


const FilterChip = ({label, active, handleClick, handleDelete}: any) => {
  return (
    <>
    {active
      ?
      <Chip
        label={label}
        variant={active ? "filled" : "outlined"}
        sx={{ margin: "4px 4px"}}
        onDelete={() => handleDelete()}
        color={"primary"}
      />
      :
      <Chip
        label={label}
        variant={active ? "filled" : "outlined"}
        sx={{ margin: "4px 4px"}}
        onClick={() => handleClick()}
        color={"primary"}
      />
    }
    </>
  )
}