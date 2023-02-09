import { Box } from '@mui/material';
import React from 'react';
import { LAYOUT_OPTIONS } from '../../../constants';
import { Event } from '../../../types';
import EventCard from '../EventCard/EventCard';

type IProps = {
  events: Event[];
};

const CompactView = ({ events }: IProps) => (
  <Box
    component="ul"
    sx={{
      paddingLeft: 0,
      listStyle: 'none',
      py: 2,
      maxWidth: '700px',
      width: '100%',
      margin: 0,
    }}
    className="event-calendar-embed-compact"
  >
    {events.map((event) => (
      <Box key={event.id} component="li" sx={{ width: '100%', pb: 3 }}>
        <EventCard event={event} layout={LAYOUT_OPTIONS.COMPACT} />
      </Box>
    ))}
  </Box>
);

export default CompactView;
