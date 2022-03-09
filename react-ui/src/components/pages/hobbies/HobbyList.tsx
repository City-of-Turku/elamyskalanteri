import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useHobbiesQuery } from "../../../redux/services/hobbyApi";
import HobbyCard from "../hobbies/HobbyCard";

const HobbyList = () => {
  const { data, error, isLoading } = useHobbiesQuery();

  return (
    <Box sx={{ p: 5 }}>
      <Grid
        sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
        container
        spacing={5}
      >
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
          data?.data.map((hobby: any) => {
            return (
              <Grid key={hobby.id} item>
                <HobbyCard {...hobby} />
              </Grid>
            );
          })}
        {error && <h2>Something went wrong</h2>}
      </Grid>
    </Box>
  );
};

export default HobbyList;
