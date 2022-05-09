import { useEffect, useState } from "react";
import 'react-day-picker/dist/style.css'
import { useTheme } from "@mui/styles";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CalendarStyle.css"
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks/rtkHooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import filterSlice from "../../redux/slices/filterSlice";
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const CalendarContainer = () => {

  const { filters } = useAppSelector(state => state)
  const [date, setDate] = useState<any>([filters.startTime, filters.endTime])
  const dispatch = useAppDispatch()
  const { setStartTime, setEndTime } = bindActionCreators(filterSlice.actions, dispatch)


  // Set start and end date from redux state
  useEffect(() => {
    if (date[0] !== null && date[1] !== null) {
      // @ts-ignore
      setStartTime(dayjs(date[0]).format("YYYY-MM-DD"))
      // @ts-ignore
      setEndTime(dayjs(date[1]).format("YYYY-MM-DD"))
    }
  }, [date])

  useEffect(() => {

    if (date[0] !== null || date[1] !== null) { return }
    if (filters.startTime === null && filters.endTime === null) { return }

    const date1 = new Date(dayjs(filters.startTime).toString())
    const date2 = new Date(dayjs(filters.endTime).toString())

    const dateArray = [date1, date2]

    setDate(dateArray)

  }, [filters.startTime, filters.endTime])

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