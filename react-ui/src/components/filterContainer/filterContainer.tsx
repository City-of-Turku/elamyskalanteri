import {Chip, Icon, TextField} from "@mui/material"
import {useEffect, useState} from "react";
import styles from "./FilterContainer.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/rtkHooks";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../redux/slices/filterSlice";
import Accordion from "../Accordion/Accordion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDayjs from "@mui/lab/AdapterDayjs"
import fi from "dayjs/locale/fi"
import { StaticDatePicker } from "@mui/lab";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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
  const { filters } = useAppSelector(state => state)
  const { setName, setEventTypes } = bindActionCreators(filterSlice.actions, dispatch)

  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState<any>(new Date())

  useEffect(() => {
    // Updates redux store after user has stopped typing (limits API calls..)
    const sendSearchTerm = () => {
      // Update search terms only when query is longer than 2 chars
      if (searchTerm.length > 2) {
        setName(searchTerm)
        return
      }
      // If the query is smaller than 3 chars, just make it blank.
      if (searchTerm.length <= 2) {
        setName("")
      }
    }
    // Controls timeout, after which user's query will be sent to the server
    const timer = setTimeout(() => {
      sendSearchTerm()
    }, 1000)

    // cleans the timeout after component unmounts
    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  // Adds even type to the redux store
  const addFilter = (f: Category) => {
    dispatch(setEventTypes(filters.eventTypes.concat(f.yso)))
  }

  // Filters event type from the redux store
  const removeFilter = (f: Category) => {
    dispatch(setEventTypes(filters.eventTypes.filter(e => e !== f.yso)))
  }

  return (
    <div className={styles.container}>
      <h2 style={{ fontWeight: 300, marginBottom: "16px"}}>Löydä parhaimmat jutut</h2>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center"}}>
        <div style={{ border: "1px solid lightgrey", borderRadius: "16px", padding: "24px 16px"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <h3 style={{ margin: "0 0 0 24px"}}>Milloin?</h3>
            <Icon component={EventAvailableIcon} style={{ fontSize: 32}} />
          </div>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            locale={fi}
          >
            <StaticDatePicker
              displayStaticWrapperAs={"desktop"}
              openTo={"day"}
              value={date}
              onChange={(newVal) => {
                setDate(newVal)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
          <div>
            <div className={styles.searchContainer}>
              <div style={{ borderBottom: "1px solid lightgray"}}>
                <Accordion title={"Mitä?"} icon={LocalActivityIcon}>
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
                <Accordion
                  title={"Missä?"}
                  icon={LocationOnIcon}
                >
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
              <div className={styles.inputWrapper}>
                <input
                  className={styles.search}
                  type="text"
                  placeholder={"Hae (nimi, paikka, aihe)"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Icon
                  component={SearchIcon}
                  style={{fontSize: 32}}
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  )

}

export default FilterContainer


const FilterChip = ({label, active, handleClick, handleDelete}: any) => {

  // Displays outlined chip for inactive filter and a deletable for active filter
  // Had to be done like this because onClick and onDelete control the visuals of the chip

  return (
    <>
    {active
      ?
      <Chip
        label={label}
        variant={active ? "filled" : "outlined"}
        sx={{ margin: "4px 4px", backgroundColor: "#C2CEDB" }}
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