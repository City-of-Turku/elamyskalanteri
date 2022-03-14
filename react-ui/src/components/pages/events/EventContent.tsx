import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { useEventQuery } from "../../../redux/services/eventApi";

dayjs.locale("fi");

const EventContent = () => {
  const params: any = useParams();
  const { data, isLoading, isFetching, error } = useEventQuery(params?.id);

  return (
    <div>
      <div id="block1">
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

          <Box
            component="div"
            sx={{
              width: "58%",
              display: "flex",
              flexDirection: "column",
              maxWidth: 906,
            }}
          >
            <Typography variant="h6" component="div">
              {dayjs(data?.start_time).format("LLL")}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold", pb: 2 }}
            >
              {data?.name?.fi}
            </Typography>
            <Box component="div">
              <Typography
                sx={{ display: "flex", flexDirection: "row", pb: 1 }}
                variant="body2"
                color="text.secondary"
              >
                <LocationOnIcon color="action" fontSize="small" />
                &nbsp;{data?.provider?.fi}
              </Typography>

              <Typography
                sx={{ display: "flex", flexDirection: "row", pb: 1 }}
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
              maxWidth: 906,
              p: 4,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "default" }}>
              {data?.short_description?.fi}
            </Typography>
            <br></br>
            <Divider textAlign="left" />
            <br></br>
            <Typography sx={{ fontWeight: "light", fontSize: "default" }}>
              {data?.description?.fi}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default EventContent;
