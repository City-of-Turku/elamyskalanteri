import { styled } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useContext, useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-day-picker/dist/style.css';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import filterSlice from '../../redux/slices/filterSlice';
import { CurrentLanguageContext } from '../../translations/TranslationProvider';
import './CalendarStyle.css';
dayjs.extend(customParseFormat);

const StyledCalendar = styled(Calendar)<CalendarProps>(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

const CalendarContainer = () => {
  const currentLang = useContext(CurrentLanguageContext);
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
  }, [date, setEndTime, setStartTime]);

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
  }, [filters.startTime, filters.endTime, date]);

  return (
    <>
      <StyledCalendar onChange={setDate} value={date} locale={currentLang} selectRange />
    </>
  );
};

export default CalendarContainer;
