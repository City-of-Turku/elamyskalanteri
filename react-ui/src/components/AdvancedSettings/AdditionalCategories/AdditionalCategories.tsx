import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import filterSlice from "../../../redux/slices/filterSlice";

const AdditionalCategories = () => {
    const dispatch = useAppDispatch()
    const { addEventType, removeEventTypes } = bindActionCreators(filterSlice.actions, dispatch)

    const handleChange = (e:any) => {
      if (e.target.checked) {
        // @ts-ignore
        addEventType(e.target.value)
      }
      else {
        // @ts-ignore
        removeEventTypes([e.target.value])
      }
    }
    return (
        <div>
            <p>Lisäluokat</p>
        <FormGroup sx={{fontFamily: "Forma DJR Micro"}}>
          <FormControlLabel control={<Checkbox />} label="MiHi" value="system:extra:mihi" onChange={event => handleChange(event)} />
          <FormControlLabel control={<Checkbox />} label="Kivakesä" value="system:extra:kivakesa" onChange={event => handleChange(event)} />
          <FormControlLabel control={<Checkbox />} label="Kivaloma" value="system:extra:kivaloma" onChange={event => handleChange(event)} />
        </FormGroup>
        </div>
      );
}

export default AdditionalCategories