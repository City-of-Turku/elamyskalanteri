import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Style = () => {
    return(
        <FormControl>
        <p>Tyyli</p>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="vink"
          name="radio-buttons-group"
        >
          <FormControlLabel value="vink" control={<Radio />} label="Vink" /> 
          <FormControlLabel value="naantali" control={<Radio />} label="Naantali" />
          <FormControlLabel value="raisio" control={<Radio />} label="Raisio" />
          <FormControlLabel value="kaarina" control={<Radio />} label="Kaarina" />
          <FormControlLabel value="tai" control={<Radio />} label="TAI" />
          <FormControlLabel value="whitelabel" control={<Radio />} label="White label" />
        </RadioGroup>
      </FormControl>
    )
}

export default Style