import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutOptions, LAYOUT_OPTIONS } from '../../../constants';
import { capitalize } from '../../../functions/capitalize';
import { Event } from '../../../types';
import styles from './EventCard.module.scss';

type IProps = {
  event: Event;
  layout: LayoutOptions;
  isSmallScreen: boolean;
};

const EventCardImage = ({ event, layout, isSmallScreen }: IProps) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const { images, start_time } = event;
  const eventImage = images.find((image) => image.url);
  const isGrid = layout === LAYOUT_OPTIONS.GRID;

  const startDay = dayjs(start_time).isValid() && dayjs(start_time).locale(currentLang).format('D');
  const startMonth =
    dayjs(start_time).isValid() && dayjs(start_time).locale(currentLang).format('MMM');
  const eventImageUrl = eventImage?.url || undefined;

  return (
    <Box
      className={styles.imageWrapper}
      sx={{
        backgroundImage: eventImageUrl && `url(${eventImageUrl}) !important`,
        paddingTop: isGrid || isSmallScreen ? '62.5%' : 0,
      }}
    >
      <div className={styles.imageDateWrapper}>
        {startDay && startMonth && (
          <div className={styles.imageDate}>
            <Typography
              variant="h3"
              component="div"
              sx={{ color: theme.palette.secondary.main, lineHeight: 1.2, fontWeight: 900 }}
            >
              {startDay}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ color: theme.palette.secondary.main, lineHeight: 1.2, fontSize: '90%' }}
            >
              {capitalize(startMonth)}
            </Typography>
          </div>
        )}
      </div>
    </Box>
  );
};

export default EventCardImage;
