import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/rtkHooks";
import filterSlice from "../../../redux/slices/filterSlice";
import {bindActionCreators} from "@reduxjs/toolkit";
import styles from "./SearchBox.module.css";
import SearchIcon from "@mui/icons-material/Search";
import {useTheme} from "@mui/styles";
import {useTranslation} from "react-i18next";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import FormGroup from "@mui/material/FormGroup";
/*
 * Renders an input box with borders and padding. (The style is very specific...)
 * When the user stops typing (aka "debounce"), dispatches the search query to the redux store
 * Debounce timing can be adjusted by changing DEBOUNCE_TIMEOUT
 * DEBOUNCE_TIMEOUT should be somewhere in the range of 100 - 1000 in order to work as intended
 * Values too low break the idea of debounce as well as values too big make it unusable for the end-user
 * Minimum amount of characters needed before the search term is dispatched can be adjusted with MIN_CHARS
 * MIN_CHARS has a typical value of 3, but in certain cases it can be adjusted
 * (e.g. there is a need to show search results that consists of 2 letters => MIN_CHARS = 2)
 * Otherwise it is advised not to tamper with this value.
 */

const SearchBox = () => {
  const theme: any = useTheme()
  const useStyles = makeStyles({
  input: {
    "&::placeholder": {
       color: theme.palette.primary.dark,
       fontFamily: theme.palette.typography,
       fontWeight: 900
    },
 },
});
  const classes = useStyles();
  
  const { t } = useTranslation()

  // debouncing timeout in ms
  const DEBOUNCE_TIMEOUT = 1000
  // minimum amount of characters needed before the search term is dispatched
  const MIN_CHARS = 3

  const dispatch = useAppDispatch()

  // Destruct state to const
  const { filters } = useAppSelector(state => state)

  // Destruct slice's actions to const
  const { setSearch } = bindActionCreators(filterSlice.actions, dispatch)

  const [searchTerm, setSearchTerm] = useState(filters.search)

  useEffect(() => {
    setSearchTerm(filters.search)
  }, [filters.search])


  useEffect(() => {
    const updateSearchTerm = () => {
      // If the search term is at least the length of specified chars, dispatch it
      if (searchTerm.length && searchTerm.length >= MIN_CHARS) {
        // Search does not like whitespace at either end so trim those away
        setSearch(searchTerm.trim())
      }
      // If the search term is less than specified, dispatch empty search term
      else {
        setSearch("")
      }
    }

    // Debounce timeout
    const timer = setTimeout(() => {
      updateSearchTerm()
    }, DEBOUNCE_TIMEOUT)

    // Clears the timeout after component unmounts
    return () => {
      clearTimeout(timer)
    }

  }, [searchTerm])

  return (
    <div>
    <div className={styles.inputWrapper} style={{color: theme.palette.primary.dark}}>
        <div
        className={styles.iconWrapper}
        style={{ backgroundColor: theme.palette.primary.main }}>
        <SearchIcon sx={{ fontSize: 32, color: "#ffffff" }}/>
      </div>
      <div style={{fontFamily: 'halogen', color: theme.palette.primary.dark}} className={styles.title}>
        <p>{`${t("search")}`}</p>
      </div> 
    </div> 
      <FormGroup row>
      <TextField aria-label={t("search")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" sx={{paddingLeft: "90px", paddingBottom:"20px", width:"calc(100% - 32px)"}} variant="standard" />
      </FormGroup>
    </div>
  )
}

export default SearchBox