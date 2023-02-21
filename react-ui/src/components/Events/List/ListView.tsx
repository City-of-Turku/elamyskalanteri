import { Box, useTheme } from '@mui/material';
import React from 'react';
import { LAYOUT_OPTIONS } from '../../../constants';
import { Event } from '../../../types';
import EventCard from '../EventCard/EventCard';

type IProps = {
  events: Event[];
};

const ListView = ({ events }: IProps) => {
  const theme = useTheme();

  return (
    <Box
      component="ul"
      sx={{
        paddingLeft: 0,
        listStyle: 'none !important',
        py: 4,
        maxWidth: theme.breakpoints.values.md,
        width: '100%',
        margin: 'auto',
      }}
      className="event-calendar-embed-list"
    >
      {events.map((event) => (
        <Box key={event.id} component="li" sx={{ width: '100%', pb: 3 }}>
          <EventCard event={event} layout={LAYOUT_OPTIONS.LIST} />
        </Box>
      ))}
    </Box>
  );
};

export default ListView;
