import React from "react";
import { useEventsQuery } from "../../../redux/services/eventApi";

const EventTestList = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useEventsQuery();
  console.log(data);
  return (
    <div>
      <h1>Tapahtumat</h1>
      {isLoading && <h2>Loading</h2>}
      {isFetching && <h2>fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.data.map((event) => {
            return (
              <div key={event.id}>
                <span>{event.name.fi}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventTestList;
