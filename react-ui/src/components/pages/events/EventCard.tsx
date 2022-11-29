import LocationOnIcon from "@mui/icons-material/LocationOn";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { GetEventResponse } from "../../../redux/types/Event";
import default2 from "../../../svg/default2.svg";
import { useTranslation } from "react-i18next";
import styles from "./Event.module.css"
import EventIcon from "@mui/icons-material/Event";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

let index = 0;
let defaultImages: string | any[] = [];
defaultImages[0] = default2;
index = Math.floor(Math.random() * defaultImages.length);

require("dayjs/locale/fi");
const date = "dd DD.MM.YYYY | HH:mm";

const useStyles = makeStyles({
  root: {
    width: 350,
    height:450,
  },
});

const EventCard = ({
  id,
  name,
  short_description,
  start_time,
  end_time,
  provider,
  images
}: GetEventResponse) => {
  const { i18n } = useTranslation();
  const classes = useStyles();

  return (
    <Box sx={{padding:2}}>
    <Card
      component="div"
      className={classes.root}
      style={{ border: "none", overflow:"hidden" }}
      sx={{flexWrap: "wrap", display:"flex", maxWidth:{xs:365, md: 990},
      // p: 0.5,
      m:1,
      "&:hover": {
        boxShadow:6,
      },
      }}
    >
      <Link
        to={`/eventlist/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardMedia
          sx={{width:350, height:190}}
          component="img"
          src={images[0]?.url || defaultImages[index]}
          alt={images[0]?.alt_text?.fi}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{display:"flex",  flexDirection: "column", alignItems:"flex-start"}}>
          <Typography
            gutterBottom
            variant="subtitle2"
            className={styles.date}
            sx={{
              p: 0.5,
              backgroundColor: (theme) =>
              alpha(theme.palette.primary.dark, 0.1),
              "& svg": { fontSize: 21, },
            }}>
            <EventIcon />
            {dayjs(start_time).locale(i18n.language).format(date)} - {dayjs(end_time).locale(i18n.language).format('HH:mm')}
          </Typography>
          <Typography gutterBottom variant="h5">
            {name?.fi}
          </Typography>
          <Typography
            sx={{letterSpacing:1}}
            gutterBottom
            variant="subtitle2"
            className={styles.locationIcon}>
            <LocationOnIcon fontSize="small" />
            {provider?.fi}
          </Typography>
          <Typography
          sx={{overflow:'hidden'}}
            className={styles.shortDesc}
            variant="body2">
            {short_description?.fi}
          </Typography>
        </CardContent>
        </Box>
        </Link>
    </Card>
    </Box>
  );
};

export default EventCard;
export { date, defaultImages, index };