import { Card, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { LayoutOptions, LAYOUT_OPTIONS } from '../../../constants';
import { useAppSelector } from '../../../hooks/rtkHooks';
import { Event } from '../../../types';
import styles from './EventCard.module.scss';
import EventCardContent from './EventCardContent';
import EventCardImage from './EventCardImage';

const baseUrl =
  process.env.REACT_APP_EVENT_DETAIL_BASE_URL || 'https://elamyskalenteri.turku.fi/event/';

type IProps = {
  event: Event;
  layout: LayoutOptions;
};

const EventCard = ({ event, layout }: IProps) => {
  const { id } = event;
  const theme = useTheme();
  const isList = layout === LAYOUT_OPTIONS.LIST;
  const isCompact = layout === LAYOUT_OPTIONS.COMPACT;
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { options } = useAppSelector((state) => state);
  const { openInNewWindow } = options;

  const renderContent = () => {
    const defaultLayout = (
      <>
        <EventCardImage event={event} layout={layout} isSmallScreen={smallScreen} />
        <EventCardContent event={event} layout={layout} isSmallScreen={smallScreen} />
      </>
    );

    if (isList || isCompact) {
      if (!smallScreen) {
        return (
          <Box sx={{ width: '100%', display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                flexShrink: 0,
                width: isCompact ? 180 : mediumScreen ? 200 : 275,
              }}
            >
              <EventCardImage event={event} layout={layout} isSmallScreen={smallScreen} />
            </Box>
            <Box sx={{ minWidth: 0, alignSelf: 'center' }}>
              <EventCardContent event={event} layout={layout} isSmallScreen={smallScreen} />
            </Box>
          </Box>
        );
      }
      return defaultLayout;
    }
    return defaultLayout;
  };

  return openInNewWindow ? (
    <a href={`${baseUrl}${id}`} target="_blank" rel="noreferrer" className={styles.link}>
      <Card
        variant="elevation"
        elevation={0}
        sx={{
          width: '100%',
          borderRadius: 1,
          overflow: 'visible',
        }}
      >
        {renderContent()}
      </Card>
    </a>
  ) : (
    <a href={`${baseUrl}${id}`} className={styles.link}>
      <Card
        variant="elevation"
        elevation={0}
        sx={{
          width: '100%',
          borderRadius: 1,
          overflow: 'visible',
        }}
      >
        {renderContent()}
      </Card>
    </a>
  );
};

export default EventCard;
