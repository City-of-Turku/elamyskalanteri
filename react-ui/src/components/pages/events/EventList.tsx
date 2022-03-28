import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Button, ToggleButton } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/rtkHooks";
import { useEventsQuery } from "../../../redux/services/eventApi";
import FilterContainer from "../../filterContainer/filterContainer";
import EventCard from "./EventCard";
import List from "./List";

const EventList = () => {
  const { filters } = useAppSelector((state) => state);
  const [view, setView] = useState(true);

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
    <div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "8px 0 24px 0",
          }}
        >
          <ToggleButtonGroup orientation="horizontal" exclusive>
            <ToggleButton
              value="module"
              aria-label="module"
              onClick={() => setView(true)}
            >
              {" "}
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton
              value="list"
              aria-label="list"
              onClick={() => setView(false)}
            >
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        ></Box>
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
                <div>
                  <div>
                    {view ? (
                      <Grid key={event.id} item>
                        <EventCard {...event} />
                      </Grid>
                    ) : (
                      <Grid key={event.id} item>
                        <List {...event} />
                      </Grid>
                    )}
                  </div>
                  <Box p={5}></Box>
                </div>
              );
            })}
          {error && <h2>Something went wrong</h2>}
        </Grid>
      </Box>
    </div>
  );
};

export default EventList;
