import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/rtkHooks";
import { useEventsQuery } from "../../../redux/services/eventApi";
import FilterContainer from "../../filterContainer/filterContainer";
import EventCard from "../events/EventCard";

const EventList = () => {
  const { filters } = useAppSelector((state) => state);

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useEventsQuery({
    page: page,
    searchTerm: filters.name || "",
    keyword: filters.eventTypes.join(),
    features: filters.eventFeatures.join("&"),
    bbox: filters.bbox.north ? Object.values(filters.bbox).join(",") : "",
  });

  useEffect(() => {
    setPage(1);
  }, [filters.name, filters.eventTypes]);

  return (
    <Box sx={{ p: 2 }}>
      <FilterContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "8px 0 24px 0",
        }}
      >
        <Button
          variant={"contained"}
          sx={{ mx: 1 }}
          onClick={() => setPage(page - 1)}
          disabled={!data?.meta.previous}
        >
          Edellinen sivu
        </Button>
        <p>Sivu {page}</p>
        <Button
          variant={"contained"}
          sx={{ mx: 1 }}
          onClick={() => setPage(page + 1)}
          disabled={!data?.meta.next}
        >
          Seuraava sivu
        </Button>
      </div>
      <Grid
        sx={{ flexGrow: 1, alignItems: "strech", justifyContent: "center" }}
        container
        spacing={5}
      >
        {isLoading ||
          (isFetching && (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
              }}
            >
              <CircularProgress />
            </Box>
          ))}
        {!isLoading &&
          !isFetching &&
          !error &&
          data.data?.map((event: any) => {
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
