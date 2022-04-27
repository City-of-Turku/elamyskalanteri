
import {useEffect, useState} from "react";
import 'react-day-picker/dist/style.css'
import { useTheme } from "@mui/styles";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CalendarStyle.css"
import dayjs from "dayjs";


const CalendarContainer = () => {

  const [date, setDate] = useState<any>([dayjs(new Date()), dayjs(new Date())])
  const theme = useTheme()

  useEffect(() => {
    console.log("date(s) selected")

  }, [date])

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