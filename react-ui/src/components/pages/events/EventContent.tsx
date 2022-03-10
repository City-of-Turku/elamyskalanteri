import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEventsQuery } from "../../../redux/services/eventApi";
dayjs.locale("fi");

const EventContent = () => {
  const { data } = useEventsQuery();
  const params: any = useParams();

  const [currentEvent, setCurrentEvent] = useState<any>(null);

  useEffect(() => {
    const curr = data?.data?.find((event) => event.id === params?.id);
    setCurrentEvent(curr);
  }, [data]);

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <ArrowBackIcon />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "center" },
        }}
      >
        <Box
          component="img"
          sx={{
            m: 2,
            width: "100%",
            maxWidth: 906,
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        ></Box>

        <Box component="div" sx={{ textAlign: "center" }}>
          <Typography variant="h6" component="div">
            {dayjs(currentEvent?.start_time).format("DD.MM.YYYY klo HH:mm")}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
            {currentEvent?.name.fi}
          </Typography>

          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: 2,
            }}
          >
            <Typography
              sx={{ display: "flex", flexDirection: "row", pb: 2 }}
              variant="body2"
              color="text.secondary"
            >
              <LocationOnIcon color="action" fontSize="small" />
              &nbsp;{currentEvent?.provider.fi}
            </Typography>

            <Typography
              sx={{ display: "flex", flexDirection: "row" }}
              variant="body2"
              color="text.secondary"
            >
              <LinkIcon color="primary" fontSize="small" />
              {/* {currentEvent?.info_url.fi} */}
              &nbsp; www.testi.fi
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 2,
            maxWidth: 906,
          }}
        >
          <Typography variant="body2">
            {currentEvent?.short_description.fi}
          </Typography>
          <br></br>
          <Divider variant="middle" />
          <br></br>
          <Typography variant="body2">
            {currentEvent?.description.fi}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default EventContent;
