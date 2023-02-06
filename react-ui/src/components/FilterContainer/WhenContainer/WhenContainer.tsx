import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { styled } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useContext } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-day-picker/dist/style.css';
import { useTranslation } from 'react-i18next';
import { getFormattedDate } from '../../../functions/getFormattedDate';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';
import { CurrentLanguageContext } from '../../../translations/TranslationProvider';
import Accordion from '../../Accordion/Accordion';
import styles from './WhenContainer.module.scss';
dayjs.extend(customParseFormat);

const StyledCalendar = styled(Calendar)<CalendarProps>(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const WhenContainer = () => {
  const currentLang = useContext(CurrentLanguageContext);
  const { filters } = useAppSelector((state) => state);
  const { startTime, endTime } = filters;
  const dispatch = useAppDispatch();
  const { setStartTime, setEndTime } = bindActionCreators(filterSlice.actions, dispatch);
  const { t } = useTranslation();

  const handleChange = (values: [Date] | [Date, Date]) => {
    values[0] && setStartTime(getFormattedDate(values[0]));
    values[1] && setEndTime(getFormattedDate(values[1]));
  };

  // TODO: Leave this commented out piece of code here until we have decided how
  // the calendar component should work
  // useEffect(() => {
  //   // If only endTime has been provided, also add startTime to prevent errors with
  //   // the calendar component. Use today as the start date if the end date is not
  //   // in the past. Otherwise assign start date to be the same as end date.
  //   if (endTime && !startTime) {
  //     const today = new Date();
  //     const comparisonDate = new Date(endTime);

  //     if (comparisonDate.getTime() < today.getTime()) {
  //       setStartTime(getFormattedDate(comparisonDate));
  //     }
  //     setStartTime(getFormattedDate(today));
  //   }
  // }, [endTime, startTime, setStartTime]);

  const getValue = () => {
    if (!startTime) {
      return null;
    }

    if (!endTime) {
      return new Date(dayjs(startTime).toString());
    }

    return [new Date(dayjs(startTime).toString()), new Date(dayjs(endTime).toString())];
  };

  return (
    <div className={styles.container}>
      <Accordion title={`${t('when')}?`} icon={EventAvailableIcon}>
        <StyledCalendar
          className={styles.customCalendar}
          onChange={handleChange}
          value={getValue()}
          locale={currentLang}
          selectRange
        />
      </Accordion>
    </div>
  );
};

export default WhenContainer;
