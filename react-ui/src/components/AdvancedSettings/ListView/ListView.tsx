import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TextField from '@mui/material/TextField';
import filterSlice from "../../../redux/slices/filterSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio, RadioGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';

const ListView = () => {
    const dispatch = useAppDispatch()
    const { setListView, setNumberOfView } = bindActionCreators(filterSlice.actions, dispatch)
      const handleListViewChange = (e:any) => {
        if(e.target.checked) {
          setListView(e.target.value)
        }
      }

      const handleNumOfView = (e:any) => {
        if(e.target != null) {
          setNumberOfView(e.target.value)
        }
      }
    

    return(
      <div>
      <FormControl sx={{padding: 2}}>
        <p>Listausnäkymä</p>
        <RadioGroup 
         aria-labelledby="demo-radio-buttons-group-label"
         defaultValue="grid"
         name="radio-buttons-group">
          <div style={{display:"flex", flexDirection:"row", alignItems: "center"}}>
          <FormControlLabel value="grid" control={<Radio />} label="Grid" onChange={event => handleListViewChange(event)} />
        <ViewModuleIcon />
      <FormControlLabel sx={{paddingLeft:2}}  value="vertical" control={<Radio />} label="Lista (pystysuora)" onChange={event => handleListViewChange(event)} />
      <ViewListIcon />
        <FormControlLabel sx={{paddingLeft:2}}  value="horizontal" control={<Radio />} label="Lista (vaakasuora)" onChange={event => handleListViewChange(event)} />
        <ViewColumnIcon />
        </div>
        
    <TextField
    onChange={event => handleNumOfView(event)} 
    sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { width: '15ch' },
      }}
    type="number"
    margin="normal" 
    InputProps={{
        inputProps: { 
            max: 100, min: 0 
        }
    }}
    label="Näkymien lukumäärä"
/>  
    </RadioGroup>
    </FormControl>
    </div>
    )
}

export default ListView