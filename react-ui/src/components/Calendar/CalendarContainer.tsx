import { makeStyles, useTheme } from '@mui/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-day-picker/dist/style.css';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import filterSlice from '../../redux/slices/filterSlice';
import i18n from '../../translations/i18n';
import './CalendarStyle.css';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const CalendarContainer = () => {
  const theme: any = useTheme();

  const useStyles = makeStyles({
    root: {
      color: theme.palette.primary.dark,
    },
  });

  const classes = useStyles();
  const { filters } = useAppSelector((state) => state);
  const [date, setDate] = useState<any>([filters.startTime, filters.endTime]);
  const dispatch = useAppDispatch();
  const { setStartTime, setEndTime } = bindActionCreators(filterSlice.actions, dispatch);

  // Set start and end date from redux state
  useEffect(() => {
    if (date[0] !== null && date[1] !== null) {
      setStartTime(dayjs(date[0]).format('YYYY-MM-DD'));
      setEndTime(dayjs(date[1]).format('YYYY-MM-DD'));
    }
  }, [date]);

  useEffect(() => {
    if (date[0] !== null || date[1] !== null) {
      return;
    }
    if (filters.startTime === null && filters.endTime === null) {
      return;
    }

    const date1 = new Date(dayjs(filters.startTime).toString());
    const date2 = new Date(dayjs(filters.endTime).toString());

    const dateArray = [date1, date2];

    setDate(dateArray);
  }, [filters.startTime, filters.endTime]);

  return (
    <>
      <Calendar
        className={classes.root}
        onChange={setDate}
        value={date}
        locale={i18n.language}
        selectRange
      />
    </>
  );
};

export default CalendarContainer;
