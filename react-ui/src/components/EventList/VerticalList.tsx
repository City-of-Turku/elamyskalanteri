import React from 'react';
import List from '../pages/events/List';

const VerticalList = ({ events }: any) => (
  <div>
    {events.map((event: any) => (
      <List key={event.id} {...event} />
    ))}
  </div>
);

export default VerticalList;
