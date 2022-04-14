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
import  {date, defaultImages, index}  from '../events/EventCard';
import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

dayjs.locale("fi");

const useStyles = makeStyles({
  root: {
    border: "none",
    boxShadow: "none",
  },
  media: {
    maxWidth: '100%',
    //height: 400,
  },
  box: {
    clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)', 
    backgroundColor: '#fff',
    padding: '3px 8px 3px 8px',
    borderRadius: '2px',
  }
});

const EventContent = () => {
  const params: any = useParams();
  const history = useHistory()
  console.log("hash: ", window.location.hash)
  const { data, isLoading, isFetching, error } = useEventQuery(params?.id);
   const classes = useStyles();
  return (
    <div>
      <Link
        href="/"
        sx={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          p:1,
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
          <CardMedia
            style={{width: 983}}
            className={classes.media}
            component="img"
            src={
              data?.images[0]?.url ||
              (defaultImages[index])
            }
          />
        </div>
      </Grid>
      <Grid p={4} justifyContent="center" alignItems="center" component="div" container className={classes.root} spacing={5}>
            <Grid component="div" item width={600} height={580} sx={{display: 'inline-table'}} xs={5}>
              <Typography
                component="div"
                sx={{ pb: 2, fontWeight: 400, letterSpacing: 0.01}}
              >
                {dayjs(data?.start_time).format(date)}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", pb: 2 }}
              >
                {data?.name?.fi}
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "row", pb: 1, color: 'primary.dark' }}
                variant="body2"
              >
                <LocationOnIcon fontSize="small" />
                &nbsp;{data?.provider?.fi}
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pb: 1,
                  cursor: "pointer",
                  color: "primary.dark"
                }}
                variant="body2"
              >
                <LinkIcon fontSize="small" />
                &nbsp;{" "}
                <Link
                  href={`${data?.info_url?.fi}`}
                  target="_blank"
                  rel="noopener"
                  sx={{color: "primary.dark", textDecoration: "none"}}
                >
                  {data?.info_url?.fi || "www.testi.fi"}
                </Link>
              </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: 16,
                    maxWidth: 700,
                    pb: 2,
                    letterSpacing: 0.01,
                  }}
                >
                  {data?.short_description?.fi}
                </Typography>
                <Divider textAlign="left" sx={{width: 143}}  />
                <Typography
                  sx={{
                    fontWeight: "light",
                    fontSize: "default",
                    maxWidth: 623,
                    pt: 2,
                  }}
                  variant="body2"
                >
                  {data?.description?.fi}
                </Typography>
            </Grid>
          <Grid component="div" item p={2}>
            <Box width={294} height={435} sx={{
                p:2,
                backgroundColor: 'primary.dark'
              }}>
            <Typography variant="h6">Hinta</Typography>
            <Typography component="div" variant="subtitle1">
              {data?.offers[0]?.price?.fi || "-"}
            </Typography>
            <Typography  variant="h6">Ikäraja</Typography>
            <Typography component="div" variant="subtitle1">
              Alle 12 v.
            </Typography>
            <Typography  variant="h6">
              Järjestäjä
            </Typography>
            <Typography component="div" variant="subtitle1">
              {data?.provider?.fi}
            </Typography>
            <Typography variant="h6"> 
              Tutustu lisää
            </Typography>
            <Typography
            variant="subtitle1"
              component="div"
            >
              <ul style={{listStyle: 'none'}}>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Video</li>
              </ul>
            </Typography>
            <Box sx={{display: 'flex', paddingBottom: 25 }}>
              <LinkIcon className={classes.box} sx={{color: 'primary.dark'}}/>
              <WhatsAppIcon className={classes.box} sx={{color: 'primary.dark'}}/>
              <FacebookIcon className={classes.box} sx={{color: 'primary.dark'}}/>
              <TwitterIcon className={classes.box}  sx={{color: 'primary.dark'}}/>
              <LinkedInIcon className={classes.box} sx={{color: 'primary.dark'}}/>
              </Box>
            </Box>
          </Grid>
      </Grid>
    </div>
  );
};

export default EventContent;
