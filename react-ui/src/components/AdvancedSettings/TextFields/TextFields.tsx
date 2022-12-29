import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/rtkHooks";
import filterSlice from "../../../redux/slices/filterSlice";
import { useTranslation } from "react-i18next";

const TextFields = () => {
  const { t } = useTranslation();
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
      <TextField onChange={title => handleTitleChange(title)} id="outlined-basic" label={`${t("title")}`} variant="outlined" margin="normal" />
      <TextField
          onChange={desc => handleDescChange(desc)}
          id="outlined-multiline-static"
          label={`${t("shortDecription")}`}
          multiline
          rows={4}
          margin="normal" 
        />
    </Box>
    )
}

export default TextFields