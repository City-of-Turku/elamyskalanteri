import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { filterByEventType } from "../../../functions/sorters";
import { useAppSelector } from "../../../hooks/rtkHooks";
import { useEventsQuery } from "../../../redux/services/eventApi";
import FilterContainer from "../../filterContainer/filterContainer";
import EventCard from "../events/EventCard";

const EventList = () => {
  const { data, error, isLoading } = useEventsQuery();

  console.log(data);

  const [filteredData, setFilteredData] = useState<any>([]);

  const { filters } = useAppSelector((state) => state);

  useEffect(() => {
    let res: any;
    res = filterByEventType(data?.data, filters.eventTypes);
    res = res?.filter((r: any) =>
      r.name.fi.toLowerCase().includes(filters.name.toLowerCase())
    );
    setFilteredData(res);
  }, [data, filters]);

  return (
    <Box sx={{ p: 2 }}>
      <FilterContainer />
      <Grid
        sx={{ flexGrow: 1, alignItems: "strech", justifyContent: "center" }}
        container
        spacing={5}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!isLoading &&
          !error &&
          filteredData?.map((event: any) => {
            return (
              <Grid key={event.id} item>
                <EventCard {...event} />
              </Grid>
            );
          })}
        {error && <h2>Something went wrong</h2>}
      </Grid>
    </Box>
  );
};

export default EventList;
