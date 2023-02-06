import Grid from '@mui/material/Grid';
import React from 'react';
import { Event } from '../../types';
import EventCard from '../pages/events/EventCard';

type IProps = {
  events: Event[];
};

const GridList = ({ events }: IProps) => (
  <Grid
    sx={{
      flexGrow: 1,
      alignItems: 'strech',
      justifyContent: 'center',
      py: 4,
    }}
    container
  >
    {events.map((event) => (
      <Grid key={event.id} item>
        <EventCard {...event} />
      </Grid>
    ))}
  </Grid>
);

export default GridList;
