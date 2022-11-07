import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from "../AdvancedSettings.module.css";

const SearchCriteria = () => {
    return (
        <div>
        <FormControl>
        <p>Hakuehtojen piilotus</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel className={styles.container} value="kyllä" control={<Radio />} label="Kyllä" />
          <FormControlLabel value="ei" control={<Radio />} label="Ei" />
        </RadioGroup>
      </FormControl>
      </div>
    )
}

export default SearchCriteria