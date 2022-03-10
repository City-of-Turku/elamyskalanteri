import { Chip } from "@mui/material"
import { useState } from "react";
import styles from "./FilterContainer.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/rtkHooks";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../redux/slices/filterSlice";
import Accordion from "../Accordion/Accordion";
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
    {fi: "Kaikki", term: ""},
    {fi: "Musiikki", term: "music"},
    {fi: "Urheilu", term: "sports"},
    {fi: "Näyttelyt", term: "exhibitions"},
    {fi: "Festivaalit", term: "festival"},
    {fi: "Teatteri", term: "theater"},
    {fi: "Tanssi", term: "dance"},
    {fi: "Keskustelutilaisuudet", term: "talks"},
    {fi: "Konsertit", term: "conserts"}
  ]

  const places = [
    {fi: "Kaikki"},
    {fi: "Turku"},
    {fi: "Raisio"},
    {fi: "Naantali"},
    {fi: "Kaarina"},
    {fi: "Lieto"},
    {fi: "Aura"},
    {fi: "Rusko"}
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
      <h2 style={{ fontWeight: 300, marginBottom: "16px"}}>Löydä parhaimmat jutut</h2>
      <div className={styles.searchContainer}>
        <div style={{ borderBottom: "1px solid lightgray"}}>
          <Accordion title={"Mitä?"}>
            <p style={{ margin: "0 4px 4px 4px"}}><b>KATEGORIA</b></p>
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
          </Accordion>
        </div>
        <div style={{ borderBottom: "1px solid lightgray"}}>
          <Accordion title={"Missä?"} icon={LocationOnIcon}>
            <p style={{ margin: "0 4px 4px 4px"}}>
              <b>
                PAIKKAKUNTA
              </b>
            </p>
            {places.map(place => (
              <FilterChip
                label={place.fi}
                active={false}
              />
            ))}
          </Accordion>
        </div>
        <div>
          <input
            className={styles.search}
            type="search"
            placeholder={"Hae (nimi, paikka, aihe)"}
            value={filters.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        sx={{ margin: "4px 4px", backgroundColor: "#C2CEDB"}}
        onDelete={() => handleDelete()}

      />
      :
      <Chip
        label={label}
        variant={active ? "filled" : "outlined"}
        sx={{ margin: "4px 4px"}}
        onClick={() => handleClick()}
      />
    }
    </>
  )
}