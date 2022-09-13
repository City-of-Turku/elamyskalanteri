import LocationOnIcon from "@mui/icons-material/LocationOn";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { GetEventResponse } from "../../../redux/types/Event";
import default2 from "../../../svg/default2.svg";
import { useTranslation } from "react-i18next";
import { Event } from '@mui/icons-material';
import styles from "./Event.module.css"
import EventDialog  from './Dialog/EventDialog';

let index = 0;
let defaultImages: string | any[] = [];
defaultImages[0] = default2;
index = Math.floor(Math.random() * defaultImages.length);

require("dayjs/locale/fi");
const date = "dd DD.MM.YYYY | HH:mm ";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 390,
    padding: "2em",
  },
  media: {
    maxWidth: 300,
  },
});


const EventCard = ({
  id,
  name,
  short_description,
  start_time,
  provider,
  images,
}: GetEventResponse) => {
  const { i18n } = useTranslation();
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      style={{ border: "none", boxShadow: "none" }}
      sx={{
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Link
        to={`/eventlist/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardMedia
          sx={{ boxShadow: 2 }}
          className={classes.media}
          component="img"
          src={images[0]?.url || defaultImages[index]}
          alt={images[0]?.alt_text?.fi}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle2"
            className={styles.date}
            sx={{
              "& svg": { fontSize: 22, mr: 0.5 },
            }}>
            {/* <Event /> */}
            {dayjs(start_time).locale(i18n.language).format(date)}
          </Typography>
          <Typography gutterBottom variant="h5">
            {name?.fi}
          </Typography>
          <Typography
            sx={{letterSpacing:2}}
            gutterBottom
            variant="subtitle2"
            className={styles.locationIcon}>
            <LocationOnIcon fontSize="small" />
            {provider?.fi}
          </Typography>
          <Typography
            className={styles.shortDesc}
            variant="body2">
            {short_description?.fi}
          </Typography>
        </CardContent>
        </Link>
    </Card>
  );
};

export default EventCard;
export { date, defaultImages, index };