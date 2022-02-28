import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function EventContent() {
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
          <Typography variant="h4" gutterBottom component="div">
            Tapahtuma
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            1.1.2022 klo 12:00, Paikka / osoite
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            laoreet metus. Quisque lobortis tristique imperdiet. Ut commodo
            vehicula ipsum, sed euismod turpis laoreet non.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              py: 3,
            }}
          >
            Ota yhteyttä / Ilmoittaudu tapahtumaan: <br></br>
            Maija Meikäläinen <br></br>
            0401234567 <br></br>
            maija.meikäläinen@email.com
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default EventContent;
