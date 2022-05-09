import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import  {date}  from '../events/EventCard';
import {GetEventResponse} from '../../../redux/types/Event';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


const useStyles = makeStyles({
  root: {
    width: 795,
    height: 220,
  },
});


const List = ({id, name, short_description, start_time, provider}: GetEventResponse) => {
  const classes = useStyles();
  
  return (
    <div>
    <Link
      to={`/eventlist/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card
        className={classes.root}
        sx={{
          maxWidth:{xs:365, md: 990},
          
          flexDirection: 'column',
          p: 0.5,
          m: 2,
        }}
      >
         <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            m: 0.5,
          }}
        >
        <Typography
          variant="subtitle2"
            sx={{
              p: 0.5,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.dark, 0.1),
              borderRadius: "5px",
              color: "primary.dark",
              display: "flex",
              fontSize: 15,
              alignItems: "center",
              "& svg": {
                fontSize: 21,
                mr: 0.5,
              },
            }}
          >
            <EventIcon />
            {dayjs(start_time).format(date)}
          </Typography>
          <Typography component="span" sx={{ fontSize: 18, mt: 1 }} variant="h5">
            {name?.fi}
          </Typography>
          <Typography
            variant="subtitle2"
            component="span"
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 0.5,
              pb: 0.5,
              fontSize: 14,
              mt: 1,
            }}
          >
            <LocationOnIcon fontSize="small" />
            {provider?.fi}
          </Typography>
          
            <Typography variant="body2">
              {short_description?.fi}
            </Typography>
          <CardActions>
            <Button sx={{fontSize:15}}>Lue lisää</Button>
          </CardActions>
          </CardContent>
      </Card>
    </Link>
    </div>
  );
};

export default List;
