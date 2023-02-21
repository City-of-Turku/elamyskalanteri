import ClearIcon from '@mui/icons-material/Clear';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { alpha, Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateShortcut, DateShortcutType } from '../../../constants';
import { capitalize } from '../../../functions/capitalize';
import { getApiFormattedDate } from '../../../functions/getFormattedDate';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import filterSlice from '../../../redux/slices/filterSlice';
import Accordion from '../../Accordion/Accordion';
import styles from './WhenContainer.module.scss';

dayjs.extend(customParseFormat);

const WhenContainer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { filters, options } = useAppSelector((state) => state);
  const { startTime, endTime } = filters;
  const { setStartTime, setEndTime } = bindActionCreators(filterSlice.actions, dispatch);
  const [activeShortcut, setActiveShortcut] = useState<DateShortcutType | null>(null);
  const today = dayjs();
  const hasActiveStartDate = options.showPastEvents
    ? !!startTime
    : startTime !== getApiFormattedDate(today);
  const hasActiveDateSearch = hasActiveStartDate || !!endTime;

  const dateShortcuts = [
    {
      range: DateShortcut.TODAY,
      label: t('today'),
    },
    {
      range: DateShortcut.TOMORROW,
      label: t('tomorrow'),
    },
    {
      range: DateShortcut.THIS_WEEK,
      label: t('thisWeek'),
    },
    {
      range: DateShortcut.CURRENT_MONTH,
      label: t('currentMonth'),
    },
  ];

  const dateShortcutReset = {
    range: DateShortcut.RESET,
    label: t('resetDates'),
  };

  const handleShortcutClick = (shortcut: DateShortcutType) => {
    switch (shortcut) {
      case DateShortcut.TODAY:
        handleStartChange(today);
        handleEndChange(today);
        setActiveShortcut(DateShortcut.TODAY);
        break;
      case DateShortcut.TOMORROW:
        handleStartChange(today.add(1, 'day'));
        handleEndChange(today.add(1, 'day'));
        setActiveShortcut(DateShortcut.TOMORROW);
        break;
      case DateShortcut.THIS_WEEK:
        handleStartChange(today.startOf('week'));
        handleEndChange(today.endOf('week'));
        setActiveShortcut(DateShortcut.THIS_WEEK);
        break;
      case DateShortcut.CURRENT_MONTH:
        handleStartChange(today.startOf('month'));
        handleEndChange(today.endOf('month'));
        setActiveShortcut(DateShortcut.CURRENT_MONTH);
        break;
      case DateShortcut.RESET:
        handleStartChange(options.showPastEvents ? null : today);
        handleEndChange(null);
        setActiveShortcut(null);
        break;
      default:
        break;
    }
  };

  const handleStartChange = (value: Dayjs | null) => {
    if (!value) {
      setActiveShortcut(null);
      return setStartTime(null);
    }
    if (dayjs(value).isValid()) {
      setActiveShortcut(null);
      return setStartTime(getApiFormattedDate(value));
    }
  };

  const handleEndChange = (value: Dayjs | null) => {
    if (!value) {
      setActiveShortcut(null);
      return setEndTime(null);
    }
    if (dayjs(value).isValid()) {
      setActiveShortcut(null);
      return setEndTime(getApiFormattedDate(value));
    }
  };

  const getStartValue = (): Dayjs | null => {
    if (startTime) {
      return dayjs(startTime);
    }
    return null;
  };

  const getEndValue = (): Dayjs | null => {
    if (endTime) {
      return dayjs(endTime);
    }
    return null;
  };

  const renderShortcutButtons = () =>
    dateShortcuts.map(({ range, label }) => (
      <Button
        key={range}
        onClick={() => handleShortcutClick(range)}
        variant="contained"
        color="secondary"
        sx={{
          borderRadius: 0,
          clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)',
          fontWeight: 'normal',
          textTransform: 'unset',
          fontSize: '1em',
          backgroundColor:
            activeShortcut === range
              ? theme.palette.secondary.main
              : alpha(theme.palette.primary.light, 0.1),
          color:
            activeShortcut === range
              ? theme.palette.getContrastText(theme.palette.secondary.main)
              : theme.palette.secondary.main,
          '&:hover, &:focus': {
            color: theme.palette.getContrastText(theme.palette.primary.dark),
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        {activeShortcut === range && (
          <Box component="span" sx={visuallyHidden}>
            {t('activeShortcut')}:{' '}
          </Box>
        )}
        {capitalize(label)}
      </Button>
    ));

  return (
    <div>
      <Accordion title={`${t('when')}?`} icon={EventAvailableIcon}>
        <Box display="flex" flexWrap="wrap" rowGap={1} mb={1}>
          {renderShortcutButtons()}
        </Box>
        <Grid container spacing={3} sx={{ paddingTop: 2 }}>
          <Grid item component="div" sx={{ flexGrow: 1 }}>
            <DatePicker
              label={t('startDate')}
              value={getStartValue()}
              onChange={(newValue) => handleStartChange(newValue)}
              className={styles.datePicker}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="eceStartDate"
                  variant="outlined"
                  helperText={`${t('useFormatOf')} ${params?.inputProps?.placeholder}`}
                />
              )}
            />
          </Grid>
          <Grid item component="div" sx={{ flexGrow: 1 }}>
            <DatePicker
              label={t('endDate')}
              value={getEndValue()}
              onChange={(newValue) => handleEndChange(newValue)}
              className={styles.datePicker}
              minDate={getStartValue()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="eceEndDate"
                  variant="outlined"
                  helperText={`${t('useFormatOf')} ${params?.inputProps?.placeholder}`}
                />
              )}
            />
          </Grid>
        </Grid>
        {hasActiveDateSearch && (
          <Box sx={{ marginTop: 1 }}>
            <Button
              onClick={() => handleShortcutClick(dateShortcutReset.range)}
              variant="text"
              color="inherit"
              startIcon={<ClearIcon />}
              sx={{
                borderRadius: 0,
                clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)',
                textTransform: 'unset',
                fontWeight: 'normal',
                fontSize: '1em',
                paddingX: 2,
                color: theme.palette.secondary.main,
                '&:hover, &:focus': {
                  color: theme.palette.secondary.dark,
                },
              }}
            >
              {capitalize(dateShortcutReset.label)}
            </Button>
          </Box>
        )}
      </Accordion>
    </div>
  );
};

export default WhenContainer;
