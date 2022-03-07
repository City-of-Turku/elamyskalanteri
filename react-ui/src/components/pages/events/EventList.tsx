import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import {
  useEventQuery,
  useEventsQuery
} from "../../../redux/services/eventApi";
import EventCard from "../events/EventCard";

const EventList = () => {
  const { data, error, isLoading } = useEventsQuery();
  console.log("data", data);


  return (
    <Box sx={{ p: 5 }}>
      <Grid sx={{ flexGrow: 1 }} container spacing={5}>
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!isLoading &&
          !error &&
          data?.data.map((event: any) => {
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

export const EventDetail = ({ id }: { id: string }) => {
  const { data } = useEventQuery(id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default EventList;
