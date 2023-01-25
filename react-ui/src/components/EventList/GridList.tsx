import Grid from '@mui/material/Grid';
import React from 'react';
import EventCard from '../pages/events/EventCard';

const GridList = ({ events }: any) => (
  <Grid
    sx={{
      flexGrow: 1,
      alignItems: 'strech',
      justifyContent: 'center',
      py: 4,
    }}
    container
  >
    {events.map((event: any) => (
      <Grid key={event.id} item>
        <EventCard {...event} />
      </Grid>
    ))}
  </Grid>
);

export default GridList;
