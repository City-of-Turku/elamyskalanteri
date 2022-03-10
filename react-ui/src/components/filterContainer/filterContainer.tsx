import { Chip } from "@mui/material"
import {useEffect, useState} from "react";
import styles from "./FilterContainer.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/rtkHooks";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../redux/slices/filterSlice";
import Accordion from "../Accordion/Accordion";
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Category {
  fi: string,
  yso: string
}

const FilterContainer = () => {

  // These should be ideally fetched from an API...
  const categories = [
    {fi: "Musiikki", yso: "yso:p1808"},
    {fi: "Urheilu", yso: "yso:p965"},
    {fi: "Näyttelyt", yso: "yso:p5121"},
    {fi: "Festivaalit", yso: "yso:p1304"},
    {fi: "Teatteri", yso: "yso:p2625"},
    {fi: "Tanssi", yso: "yso:p1278"},
    {fi: "Keskustelutilaisuudet", yso: "tsl:p40"},
    {fi: "Konsertit", yso: "tsl:p43"}
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

  const dispatch = useAppDispatch()
  const { setName, setEventTypes } = bindActionCreators(filterSlice.actions, dispatch)
  const { filters } = useAppSelector(state => state)

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const sendSearchTerm = () => {
      if (searchTerm.length > 2) {
        setName(searchTerm)
        return
      }
      if (searchTerm.length <= 2) {
        setName("")
      }
    }
    const timer = setTimeout(() => {
      sendSearchTerm()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  const addFilter = (f: Category) => {
    dispatch(setEventTypes(filters.eventTypes.concat(f.yso)))
  }

  const removeFilter = (f: Category) => {
    dispatch(setEventTypes(filters.eventTypes.filter(e => e !== f.yso)))
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
                  active={filters.eventTypes.includes(category.yso)}
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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }
            }
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