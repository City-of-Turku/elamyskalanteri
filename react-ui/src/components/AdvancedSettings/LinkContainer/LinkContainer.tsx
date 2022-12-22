import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import filterSlice from "../../../redux/slices/filterSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";

const LinkContainer = () => {
    const dispatch = useAppDispatch()
    const { setLinkContainer } = bindActionCreators(filterSlice.actions, dispatch)

    const handleChange = (e:any) => {
        if(e.target.value.trim().length >=0) {
            setLinkContainer(e.target.value.trim())
        }
    }
    return (
    <div>
        {/* <FormControl sx={{padding: 2}}>
        <p>Näytä linkki</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="true"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="true" control={<Radio />} label="Kyllä" />
          <FormControlLabel value="false" control={<Radio />} label="Ei" />
        </RadioGroup>
      </FormControl> */}
      <div>
        <TextField onChange={event => handleChange(event)} id="outlined-basic" label="Linkki sivustolle" variant="outlined" margin="normal"  />
        {/* <TextField id="outlined-basic" label="Linkin teksti" variant="outlined" margin="normal"  /> */}
        </div>
    </div>
    )

}

export default LinkContainer