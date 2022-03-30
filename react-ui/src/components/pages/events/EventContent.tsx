import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import {useHistory, useParams} from "react-router-dom";
import { useEventQuery } from "../../../redux/services/eventApi";
import * as queryString from "querystring";

dayjs.locale("fi");

const Img = styled("img")({
  maxWidth: "100%",
});

const useStyles = makeStyles({
  root: {
    border: "none",
    boxShadow: "none",
    // width: 500,
    // height: 400,
  },
  media: {
    width: 935,
  },
  content: {},
  sideInfoTitle: {
    fontSize: "default",
    fontWeight: "bold",
  },
  sideInfoContent: {
    fontSize: "subtitle1",
    fontWeight: "light",
    lineHeight: 2,
    letterSpacing: 1,
    padding: 5,
  },
});

const EventContent = () => {
  const classes = useStyles();
  const params: any = useParams();
  const history = useHistory()
  console.log("hash: ", window.location.hash)
  const { data, isLoading, isFetching, error } = useEventQuery(params?.id);
  return (
    <div>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          padding: "2px",
        }}
      >
        <ArrowBackIcon />
      </Link>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Img
            className={classes.root}
            alt="complex"
            src={
              data?.images[0]?.url ||
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            }
          />
        </div>
      </Grid>
      <Grid component="div" container spacing={5} className={classes.root}>
        <Grid item xs={20} sm container>
          <Grid item xs container direction="column" spacing={2} p={6}>
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
                &nbsp;{" "}
                <Link
                  href={`${data?.info_url?.fi}`}
                  target="_blank"
                  rel="noopener"
                  style={{ textDecoration: "none", color: "primary" }}
                >
                  {data?.info_url?.fi || "www.testi.fi"}
                </Link>
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

          <Grid component="div" item p={6}>
            <Typography className={classes.sideInfoTitle}>Hinta</Typography>
            <Typography component="div" className={classes.sideInfoContent}>
              {data?.offers[0]?.price?.fi || "-"}
            </Typography>
            <Typography className={classes.sideInfoTitle}>Ikäraja</Typography>
            <Typography className={classes.sideInfoContent} component="div">
              Alle 12 v.
            </Typography>
            <Typography className={classes.sideInfoTitle}>
              Järjestäjä
            </Typography>
            <Typography className={classes.sideInfoContent} component="div">
              {data?.provider?.fi}
            </Typography>
            <Typography className={classes.sideInfoTitle}>
              Tutustu lisää
            </Typography>
            <Typography
              className={classes.sideInfoContent}
              component="div"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              Facebook Instagram Twitter Video
            </Typography>
            <Typography className={classes.sideInfoTitle}>
              Jaa kaverille
            </Typography>
            <Typography
              className={classes.sideInfoContent}
              component="div"
            ></Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventContent;
