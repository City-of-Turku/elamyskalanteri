import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import React from "react";
import EventCard from "../events/EventCard";

export default class EventList extends React.Component {
  state = {
    events: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    fetch(`https://testilinkedevents-api.turku.fi/v1/event/?format=json`)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          events: response.data,
          loading: false,
        })
      )
      .catch((error) =>
        this.setState({
          loading: false,
          error: true,
        })
      );
  }

  render() {
    const { events, loading, error } = this.state;
    return (
      <Box sx={{ p: 5 }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={5}>
          {loading && (
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
          {!loading &&
            !error &&
            events.map((event, e) => (
              <Grid key={e} item>
                {" "}
                <EventCard {...event} />
              </Grid>
            ))}
          {error && <div>Error message</div>}
        </Grid>
      </Box>
    );
  }
}
