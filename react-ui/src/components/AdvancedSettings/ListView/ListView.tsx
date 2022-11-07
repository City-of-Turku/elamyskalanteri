import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

const ListView = () => {

    const [view, setView] = React.useState('list');

    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
      };
    

    return(
        <div>
        <p>Listausnäkymä</p>
        <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
     
    >
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
        <p>Lista</p>
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
        <ViewModuleIcon />
        <p>Grid</p>
      </ToggleButton>
      <ToggleButton value="quilt" aria-label="quilt">
        <ViewColumnIcon />
        <p>Vaaka</p>
      </ToggleButton>
    </ToggleButtonGroup>

    <TextField 
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
    label="Lukumäärä"
/>

    </div>
    )
}

export default ListView