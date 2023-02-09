import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import React from 'react';
import { LAYOUT_OPTIONS } from '../../../constants';
import { Event } from '../../../types';
import EventCard from '../EventCard/EventCard';

type IProps = {
  events: Event[];
};

const GridView = ({ events }: IProps) => {
  const theme = useTheme();

  return (
    <Grid
      sx={{ py: 4, maxWidth: theme.breakpoints.values.xl }}
      rowSpacing={5}
      columnSpacing={3}
      justifyContent="center"
      container
      className="event-calendar-embed-grid"
    >
      {events.map((event) => (
        <Grid key={event.id} item sx={{ width: '100%', maxWidth: ['100%', '50%', 320] }}>
          <EventCard event={event} layout={LAYOUT_OPTIONS.GRID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridView;
