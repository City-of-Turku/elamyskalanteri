import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import filterSlice from "../../../redux/slices/filterSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { t } = useTranslation();
    const dispatch = useAppDispatch()
    const { setLanguageSelection } = bindActionCreators(filterSlice.actions, dispatch)

  const handleChange = (e:any) => {
    if(e.target.checked) {
        setLanguageSelection(e.target.value)
    }
  };

    return(
        // <div>
        //     <FormControl variant="standard" sx={{ m: 2, minWidth: 90 }}>
        //         <p>Kielivalinta</p>
        //             <Select
        //             labelId="demo-simple-select-standard-label"
        //             id="demo-simple-select-standard"
        //             defaultValue="fi"
        //             onChange={event => handleChange(event)}
        //             >
        //             <MenuItem value="fi" onChange={event => handleChange(event)}>FI</MenuItem>
        //             <MenuItem value="sv" onChange={event => handleChange(event)}>SV</MenuItem>
        //             <MenuItem value="en" onChange={event => handleChange(event)}>EN</MenuItem>
        //             </Select>
        // </FormControl>
        // </div>
        <FormControl sx={{padding: 2}}>
        <p>{`${t("language")}`}</p>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue="fi"
          name="radio-buttons-group"
        >
          <FormControlLabel value="fi" control={<Radio />} label="FI" onChange={event => handleChange(event)} /> 
          <FormControlLabel value="sv" control={<Radio />} label="SV" onChange={event => handleChange(event)} />
          <FormControlLabel value="en" control={<Radio />} label="EN" onChange={event => handleChange(event)} />
        </RadioGroup>
      </FormControl>
    )
}

export default LanguageSelect