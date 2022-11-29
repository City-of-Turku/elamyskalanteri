import Grid from "@mui/material/Grid";
import EventCard from "../pages/events/EventCard";
import Box from "@mui/material/Box";

const GridList = ({events}: any) => {
    return (
        <div>
          <Box sx={{ display: "flex", justifyContent: "center", p: 0.5 }}></Box>
        <Grid
          sx={{
            flexGrow: 1,
            alignItems: "strech",
            justifyContent: "center",
            p: 6,
          }}
          container
        >
              {events?.map((event: any) => (
              <div key={event.id}>
                <div>
                    <Grid key={event.id} item>
                     <EventCard {...event} />
                    </Grid>
                </div>
              </div>
            ))}
          </Grid>
        </div>
    )
}

export default GridList