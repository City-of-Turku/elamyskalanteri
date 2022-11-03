import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AdditionalCategories = () => {
    return (
        <div>
            <p>Lisäluokat</p>
        <FormGroup sx={{fontFamily: "Forma DJR Micro"}}>
          <FormControlLabel control={<Checkbox />} label="MiHi" />
          <FormControlLabel control={<Checkbox />} label="Kivakesä" />
          <FormControlLabel control={<Checkbox />} label="Kivaloma" />
        </FormGroup>
        </div>
      );
}

export default AdditionalCategories