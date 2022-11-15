import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import filterSlice from "../../../redux/slices/filterSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";

const Style = () => {
  const dispatch = useAppDispatch()
    const { setStyle } = bindActionCreators(filterSlice.actions, dispatch)

    const handleChange = (e:any) => {
      if(e.target.checked) {
        setStyle(e.target.value)
      }
    }

    return(
        <FormControl sx={{padding: 2}}>
        <p>Tyyli</p>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="vink"
          name="radio-buttons-group"
        >
          <FormControlLabel value="vink" control={<Radio />} label="Vink" onChange={event => handleChange(event)} /> 
          <FormControlLabel value="naantali" control={<Radio />} label="Naantali" onChange={event => handleChange(event)} />
          <FormControlLabel value="raisio" control={<Radio />} label="Raisio" onChange={event => handleChange(event)} />
          <FormControlLabel value="kaarina" control={<Radio />} label="Kaarina" onChange={event => handleChange(event)} />
          <FormControlLabel value="tai" control={<Radio />} label="TAI" onChange={event => handleChange(event)} />
          <FormControlLabel value="whitelabel" control={<Radio />} label="Mustavalkoinen" onChange={event => handleChange(event)} />
        </RadioGroup>
      </FormControl>
    )
}

export default Style