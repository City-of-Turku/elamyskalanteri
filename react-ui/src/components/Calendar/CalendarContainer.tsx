//import AdapterDayjs from "@mui/lab/AdapterDayjs";
//import { StaticDatePicker } from "@mui/lab";
//import { TextField } from "@mui/material";
//import LocalizationProvider from "@mui/lab/LocalizationProvider";
//import fi from "dayjs/locale/fi"
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'
import fi from "date-fns/locale/fi"
import { useTheme } from "@mui/styles";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CalendarStyle.css"


const CalendarContainer = () => {

  const [date, setDate] = useState<any>([new Date(), new Date()])
  const theme = useTheme()

  return (
    <>
      <Calendar
        onChange={setDate}
        value={date}
        locale={"fi-FI"}
        selectRange
      />
    </>
  )
}

export default CalendarContainer