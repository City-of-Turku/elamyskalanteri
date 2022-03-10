import { CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/rtkHooks";
import eventSlice from "../../../redux/slices/eventSlice";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
}

const EventCard = ({
  id,
  name,
  short_description,
  start_time,
  location_extra_info,
  info_url,
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
            <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {name?.fi}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "center" }}
            >
              {new Date(start_time).toLocaleDateString("fi")}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{ textAlign: "center" }}
            >
              {location_extra_info?.fi}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {short_description?.fi}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions></CardActions>
    </Card>
  );
};

export default EventCard;
