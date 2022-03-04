import React from "react";

interface EventProps {
  id: string;
  name: {
    fi: string;
  };
}

const eventTestCard = ({ id, name }: EventProps) => {
  return <div>{name.fi}</div>;
};

export default eventTestCard;
