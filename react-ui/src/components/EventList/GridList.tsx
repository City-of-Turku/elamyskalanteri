import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';
import EventCard from '../pages/events/EventCard';

const GridList = ({ events }: any) => {
  const options = useAppSelector((state) => state.options);
  let slice = events.slice(0, options.numOfView);
  if (slice.length === 0) {
    slice = events;
  }
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 0.5 }}></Box>
      <Grid
        sx={{
          flexGrow: 1,
          alignItems: 'strech',
          justifyContent: 'center',
          p: 6,
        }}
        container
      >
        {slice.map((event: any) => (
          <div key={event.id}>
            <div>
              <Grid key={event.id} item>
                <EventCard {...event} />
              </Grid>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default GridList;
