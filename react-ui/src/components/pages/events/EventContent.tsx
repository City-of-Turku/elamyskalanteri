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
import EventIcon from "@mui/icons-material/Event";
import {useTranslation} from "react-i18next";

dayjs.locale("fi");

const useStyles = makeStyles({
  root: {
    border: "none",
    boxShadow: "none",
  },
  media: {
    maxWidth: '100%',
    //height: 400,
    boxShadow: '0px 40px 40px -40px rgba(25, 55, 115, 0.4)',
    borderRadius: '2px',
  },
  box: {
    clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)', 
    backgroundColor: '#fff',
    padding: '3px 8px 3px 8px',
    borderRadius: '2px',
  }
});

const EventContent = () => {
  const { t, i18n } = useTranslation()
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
      <Grid container p={4} justifyContent="center" component="div" className={classes.root} spacing={8}>
            <Grid component="div" item xs={5} sx={{display: 'inline-table'}}>
              <Typography variant="subtitle2"
                component="div"
                sx={{  mt: 1.5,
                  pb: 2,
                  borderRadius: "5px",
                  fontWeight: "bold",
                  display: "flex",
                  fontSize: 15,
                  alignItems: "center",
                  "& svg": {
                    fontSize: 21,
                    mr: 0.5,
                  },}}
              >
                <EventIcon />
                {dayjs(data?.start_time).format(date)}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ pb: 3 }}
              >
                {data?.name?.fi}
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "row", pb: 1, color: 'primary.dark', fontWeight: 'bold' }}
                variant="body2"
              >
                <LocationOnIcon fontSize="small" />
                &nbsp;{data?.provider?.fi}
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pb: 4,
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
                  sx={{color: "primary.dark", textDecoration: "none", fontWeight: 'bold', pb: 2}}
                >
                  {data?.info_url?.fi || "www.testi.fi"}
                </Link>
              </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: 16,
                    maxWidth: 700,
                    pb: 4,
                    letterSpacing: 0.01,
                    fontFamily: "forma-djr-micro, sans-serif",
                    fontStyle: 'regular'
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
                    pt: 4,
                    fontFamily: "forma-djr-micro, sans-serif",
                  }}
                  variant="body2"
                >
                  {data?.description?.fi}
                </Typography>
            </Grid>
          <Grid component="div" item>
            <Grid width={340} minHeight={300} sx={{
                p:4,
                backgroundColor: 'primary.dark',
                pt: 5,
                wordWrap: 'break-word',
              }}>
            <Typography variant="h6">{`${t("price")}`}</Typography>
            <Typography component="div" variant="subtitle1">
              {data?.offers[0]?.price?.fi || "-"}
            </Typography>
            <Typography  variant="h6">{`${t("age")}`}</Typography>
            <Typography component="div" variant="subtitle1">
              Alle 12 v.
            </Typography>
            <Typography  variant="h6">
            {`${t("provider")}`}
            </Typography>
            <Typography component="div" variant="subtitle1">
              {data?.provider?.fi}
            </Typography>
            <Typography variant="h6"> 
            {`${t("more")}`}
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
            </Grid>
          </Grid>
      </Grid>
    </div>
  );
};

export default EventContent;
