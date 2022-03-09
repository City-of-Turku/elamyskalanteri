import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEventsQuery } from "../../../redux/services/eventApi";

const EventContent = () => {
  const { data } = useEventsQuery();
  const params: any = useParams();

  const [currentEvent, setCurrentEvent] = useState<any>(null);

  useEffect(() => {
    const curr = data?.data?.find((event) => event.id === params?.id);
    setCurrentEvent(curr);
  }, [data]);

  return (
    <div className="CardContent">
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
            m: 5,
            width: "100%",
            maxWidth: 906,
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        ></Box>
        <Box
          component="div"
          sx={{
            m: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom component="div">
            {currentEvent?.start_time}
          </Typography>
          <Typography variant="h4" gutterBottom component="div">
            {currentEvent?.name.fi}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LocationOnIcon color="action" fontSize="small" />
          <Typography sx={{ pl: 2 }} variant="body2" color="text.secondary">
            {currentEvent?.location_extra_info.fi}
          </Typography>

          <Link href="#" underline="none" variant="body2">
            <LinkIcon fontSize="small" />
            {/* {currentEvent?.info_url.fi || null} */}
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            laoreet metus. Quisque lobortis tristique imperdiet. Ut commodo
            vehicula ipsum, sed euismod turpis laoreet non.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default EventContent;
