import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

dayjs.locale("fi");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 450,
    border: "none",
    boxShadow: "none",
  },
  media: {
    height: 140,
  },
});

interface EventProps {
  id: string;
  name: {
    fi: string;
  };
  short_description: {
    fi: string;
  };
  start_time: Date;
  location_extra_info: {
    fi: string;
  };
  info_url: {
    fi: string;
  };
  provider: {
    fi: string;
  };
  description: {
    fi: string;
  };
}

const EventCard = ({
  id,
  name,
  short_description,
  start_time,
  location_extra_info,
  info_url,
  provider,
}: EventProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link
        to={`/eventlist/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle2" component="div">
              {dayjs(start_time).format("DD.MM.YYYY klo HH:mm")}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {name?.fi}
            </Typography>

            <Typography
              gutterBottom
              color="text.secondary"
              variant="body2"
              component="div"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <LocationOnIcon color="action" fontSize="small" />
              {provider?.fi}
            </Typography>
            <Typography variant="body2">{short_description.fi}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions></CardActions>
    </Card>
  );
};

export default EventCard;
