import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CardContent, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutOptions, LAYOUT_OPTIONS } from '../../../constants';
import { getFormattedDateTime } from '../../../functions/getFormattedDate';
import { getLocationTitle } from '../../../functions/getLocation';
import { getTranslatedValue } from '../../../functions/getTranslatedValue';
import { truncate } from '../../../functions/truncateString';
import { Event } from '../../../types';
import styles from './EventCardContent.module.scss';

type IProps = {
  event: Event;
  layout: LayoutOptions;
  isSmallScreen: boolean;
};

const EventCardContent = ({ event, layout, isSmallScreen }: IProps) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const {
    description,
    end_time,
    is_virtualevent,
    location,
    location_extra_info,
    name,
    short_description,
    start_time,
  } = event;
  const isCompact = layout === LAYOUT_OPTIONS.COMPACT;
  const isGrid = layout === LAYOUT_OPTIONS.GRID;

  const getDescription = () => {
    let desc: string | undefined;
    if (short_description && getTranslatedValue(short_description, currentLang)) {
      desc = getTranslatedValue(short_description, currentLang);
    } else if (description && getTranslatedValue(description, currentLang)) {
      desc = getTranslatedValue(description, currentLang);
    }
    if (desc) {
      return truncate(desc, isGrid ? 100 : 150);
    }
    return null;
  };

  const locationTitle = getLocationTitle(
    location,
    location_extra_info,
    is_virtualevent,
    currentLang,
  );
  const formattedDateTime = getFormattedDateTime(start_time, end_time, currentLang);

  const cardContentPaddingY = isSmallScreen || isCompact ? '16px !important' : '24px !important';

  return (
    <CardContent sx={{ paddingX: isSmallScreen ? 1 : 2, paddingY: cardContentPaddingY }}>
      {formattedDateTime && (
        <Typography
          sx={{ paddingBottom: 1, color: theme.palette.secondary.main, fontSize: '0.92em' }}
          variant="body1"
          component="div"
        >
          {formattedDateTime}
        </Typography>
      )}
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontSize: isCompact ? theme.typography.h4.fontSize : theme.typography.h3.fontSize,
          overflowWrap: 'break-word',
        }}
        variant="h3"
      >
        {getTranslatedValue(name, currentLang)}
      </Typography>
      {!isCompact && (
        <>
          {locationTitle && (
            <Typography
              sx={{ paddingTop: 1, paddingBottom: 2, color: theme.palette.secondary.main }}
              variant="subtitle1"
              component="div"
              className={styles.location}
            >
              <LocationOnIcon fontSize="small" />
              <span>{locationTitle}</span>
            </Typography>
          )}
          {getDescription() && (
            <Typography
              className={styles.shortDesc}
              variant="body1"
              sx={{ overflowWrap: 'break-word' }}
            >
              {getDescription()}
            </Typography>
          )}
        </>
      )}
    </CardContent>
  );
};

export default EventCardContent;
