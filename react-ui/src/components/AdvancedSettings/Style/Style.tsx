import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import filterSlice from "../../../redux/slices/filterSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";
import { useTranslation } from "react-i18next";

const Style = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { setStyle } = bindActionCreators(filterSlice.actions, dispatch)

    const handleChange = (e:any) => {
      if(e.target.checked) {
        setStyle(e.target.value)
      }
    }

    return(
        <FormControl sx={{padding: 2}}>
        <p>{`${t("style")}`}</p>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue="vink"
          name="radio-buttons-group"
        >
          <FormControlLabel value="vink" control={<Radio />} label="Vink" onChange={event => handleChange(event)} /> 
          <FormControlLabel value="naantali" control={<Radio />} label={`${t("naantali")}`} onChange={event => handleChange(event)} />
          <FormControlLabel value="raisio" control={<Radio />} label={`${t("raisio")}`} onChange={event => handleChange(event)} />
          <FormControlLabel value="kaarina" control={<Radio />} label={`${t("kaarina")}`} onChange={event => handleChange(event)} />
          <FormControlLabel value="tai" control={<Radio />} label={`${t("tai")}`} onChange={event => handleChange(event)} />
          <FormControlLabel value="whitelabel" control={<Radio />} label={`${t("whiteLabel")}`} onChange={event => handleChange(event)} />
        </RadioGroup>
      </FormControl>
    )
}

export default Style