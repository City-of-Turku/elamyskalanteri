import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { StaticDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import fi from "dayjs/locale/fi"
import { useState } from "react";

const Calendar = () => {

  const [date, setDate] = useState<any>(new Date())

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      locale={fi}
    >
      <StaticDatePicker
        displayStaticWrapperAs={"desktop"}
        openTo={"day"}
        value={date}
        onChange={(newVal) => {
          setDate(newVal)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default Calendar