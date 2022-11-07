import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../AdvancedSettings.module.css';

const TextFields = () => {
    return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // '& .MuiTextField-root': { width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Otsikko" variant="outlined" margin="normal" />
      <TextField
          id="outlined-multiline-static"
          label="Lyhyt esittely"
          multiline
          rows={4}
          margin="normal" 
        />
        <TextField id="outlined-basic" label="Linkki tapahtumaan" variant="outlined" margin="normal"  />
        <TextField id="outlined-basic" label="Linkin teksti" variant="outlined" margin="normal"  />
    </Box>
    )
}

export default TextFields