import React from 'react';
import { Event } from '../../types';
import List from '../pages/events/List';

type IProps = {
  events: Event[];
};

const HorizontalList = ({ events }: IProps) => (
  <div>
    {events.map((event) => (
      <List key={event.id} {...event} />
    ))}
  </div>
);

export default HorizontalList;
