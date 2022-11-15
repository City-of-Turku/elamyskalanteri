import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";
import filterSlice from "../../../redux/slices/filterSlice";

const TextFields = () => {

  const dispatch = useAppDispatch()
  const { setEmbedTitle, setEmbedDesc } = bindActionCreators(filterSlice.actions, dispatch)

  const handleTitleChange = (e:any) => {
    if(e.target.value.trim().length >= 0) {
      setEmbedTitle(e.target.value.trim())
    }
  }

  const handleDescChange = (e:any) => {
    if(e.target.value.trim().length >= 0) {
      setEmbedDesc(e.target.value.trim())
    }
  }

    return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange={title => handleTitleChange(title)} id="outlined-basic" label="Otsikko" variant="outlined" margin="normal" />
      <TextField
          onChange={desc => handleDescChange(desc)}
          id="outlined-multiline-static"
          label="Lyhyt esittely"
          multiline
          rows={4}
          margin="normal" 
        />
        {/* <TextField id="outlined-basic" label="Linkki tapahtumaan" variant="outlined" margin="normal"  />
        <TextField id="outlined-basic" label="Linkin teksti" variant="outlined" margin="normal"  /> */}
    </Box>
    )
}

export default TextFields