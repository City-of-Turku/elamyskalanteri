import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { useEventQuery } from "../../../redux/services/eventApi";

dayjs.locale("fi");

const Img = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const EventContent = () => {
  const params: any = useParams();
  const { data, isLoading, isFetching, error } = useEventQuery(params?.id);

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <ArrowBackIcon />
      </Link>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "center" },
        }}
      >
        <Img
          alt="complex"
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={20} sm container>
          <Grid item xs container direction="column" spacing={2} p={5}>
            <Grid item xs={2}>
              <Typography
                component="div"
                sx={{ fontSize: 18, pb: 2, fontWeight: "bold" }}
              >
                {dayjs(data?.start_time).format("LLL")}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", pb: 2 }}
              >
                {data?.name?.fi}
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "row", pb: 1 }}
                variant="body2"
                color="text.secondary"
              >
                <LocationOnIcon color="action" fontSize="small" />
                &nbsp;{data?.provider?.fi}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pb: 1,
                  cursor: "pointer",
                }}
                variant="body2"
                color="text.secondary"
              >
                <LinkIcon color="primary" fontSize="small" />
                {/* {currentEvent?.info_url.fi} */}
                &nbsp; www.testi.fi
              </Typography>

              <Grid item>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 15,
                    maxWidth: 800,
                    pb: 2,
                    letterSpacing: 1,
                  }}
                  variant="body2"
                >
                  {data?.short_description?.fi}
                </Typography>
                <Divider textAlign="left" />
                <Typography
                  sx={{
                    fontWeight: "light",
                    fontSize: "default",
                    maxWidth: 800,
                    pt: 2,
                    letterSpacing: 1,
                  }}
                  variant="body2"
                >
                  {data?.description?.fi}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item p={5}>
            <Typography sx={{ fontWeight: "bold", fontSize: "default" }}>
              Hinta
            </Typography>
            <Typography variant="subtitle1" component="div">
              Liput 12€
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "default" }}>
              Ikäraja
            </Typography>
            <Typography variant="subtitle1" component="div">
              Alle 12 v.
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "default" }}>
              Järjestäjä
            </Typography>
            <Typography variant="subtitle1" component="div">
              Lorem ipsum Ry.
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "default" }}>
              Tutustu lisää
            </Typography>
            <Typography variant="subtitle1" component="div">
              Facebook Instagram Twitter Video
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "default" }}>
              Jaa kaverille
            </Typography>
            <Typography variant="subtitle1" component="div"></Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventContent;
