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
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  root: {
    width: 1000,
    //height: 400,
    flexWrap: 'nowrap',
  },
});

const List = ({id, name, short_description, start_time, provider}: GetEventResponse) => {
  const classes = useStyles();
  return (
    <Link
      to={`/eventlist/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card style={{ height: '100%'}}
        className={classes.root}
        sx={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 2,
          fontWeight: "bold",
          '&:hover': {
            opacity: [0.9, 0.8, 0.7]},
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            m: 3,
            minWidth: { md: 350 },
          }}
        >
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
          <Typography
          variant="subtitle2"
            sx={{
              mt: 1.5,
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
        </Box>
        <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              m: 3,
              minWidth: { md: 350 },
            }}
          >
            <Typography sx={{ justifyContent:"center", alignContent:"center" }} variant="body2">
              {short_description?.fi}
            </Typography>
          </Box>
          <Box component="div">
            <Button></Button>
          </Box>
      </Card>
    </Link>

  );
};

export default List;
