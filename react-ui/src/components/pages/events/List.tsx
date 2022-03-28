import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 1200,
    height: 200,
  },
});

interface Props {
  id: string;
  name: {
    fi: string;
  };
  short_description: {
    fi: string;
  };
  start_time: Date;
  provider: {
    fi: string;
  };
}

const List = ({ id, name, short_description, start_time, provider }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <Link
        to={`/eventlist/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box
          className={classes.root}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            bgcolor: "background.paper",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: 2,
            fontWeight: "bold",
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
            <Box component="span" sx={{ fontSize: 18, mt: 1 }}>
              {name?.fi}
            </Box>
            <Typography
              component="span"
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 0.5,
                pb: 0.5,
                fontSize: 14,
                mt: 1,
                color: "text.secondary",
                fontWeight: "light",
              }}
            >
              <LocationOnIcon color="action" fontSize="small" />
              {provider?.fi}
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                p: 0.5,
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.1),
                borderRadius: "5px",
                color: "primary.main",
                fontWeight: "medium",
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
              {dayjs(start_time).format("LLL")}
            </Box>
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
            <Typography sx={{ textAlign: "left", mr: 10 }}>
              {short_description?.fi}
              Tapahtuman kuvaus
            </Typography>
          </Box>
          <Box component="div">
            <Button></Button>
          </Box>
        </Box>
      </Link>
    </div>
  );
};

export default List;
