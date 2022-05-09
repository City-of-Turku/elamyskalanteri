import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from '@mui/material/CardActions';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import * as React from "react"; 
import { Link } from "react-router-dom";
import {GetEventResponse} from '../../../redux/types/Event';
import default2 from '../../../svg/default2.svg';
import EventIcon from "@mui/icons-material/Event";

let index = 0;
let defaultImages: string | any[] = [];

defaultImages[0] = default2;

index = Math.floor(Math.random() * defaultImages.length);

require("dayjs/locale/fi");
const date = "dd DD.MM.YYYY | HH:mm "

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 390,
    padding: "2em"
  },
  media: {
    maxWidth: 340,
    height: 130,

  },
});

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton onClick={onClose} aria-label="close"
          sx={{position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[900]}}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const EventCard = ({
  id,
  name,
  short_description,
  start_time,
  location_extra_info,
  provider,
  images,
  description,
}: GetEventResponse) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ border: "none", boxShadow: "none" }} sx={{   '&:hover': {
      opacity: [0.9, 0.8, 0.7]},}}>
      <Link to={`/eventlist/${id}`} style={{ textDecoration: "none", color: "black" }}>
        <CardMedia sx={{ boxShadow: 2 }} className={classes.media} component="img"
            src={images[0]?.url || (defaultImages[index])} alt="Tapahtuman kuva"/>
          <CardContent>
            <Typography gutterBottom variant="subtitle2" component="div" sx={{
                //mt: 1.5,
                //p: 0.5,
                //borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                "& svg": {
                  fontSize: 22,
                  mr: 0.5,
                },
              }}>
            <EventIcon />
              {dayjs(start_time).format(date)}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            > 
              {name?.fi}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{ display: "flex", flexDirection: "row", letterSpacing: '0.01em' }}
            >
              <LocationOnIcon fontSize="small" />
              {provider?.fi}
            </Typography>
            <Typography sx={{pt: 1, overflow:'hidden', lineHeight: '20.8px', maxHeight: 65,}} variant="body2">{short_description?.fi}</Typography>
          </CardContent>
      </Link>
      <CardActions sx={{paddingLeft:2, display: 'block', position:'absolute'}}>
      {/* <Button variant="contained" onClick={handleClickOpen} >
        Lue lisää
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box
          component="img"
          src={
            images[0]?.url ||
            (defaultImages[index])
          }
        />
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {name?.fi}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom sx={{ fontWeight: "bold", fontFamily: "forma-djr-micro, sans-serif" }}>
            {" "}
            {dayjs(start_time).format(date)}
          </Typography>
          <Typography gutterBottom variant="body2">{description?.fi}</Typography>
          <Typography gutterBottom color="text.secondary" variant="body2">
            {location_extra_info?.fi}
          </Typography>
          <Typography gutterBottom></Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
      </CardActions>
    </Card>
  );
};

export default EventCard;
export {date, defaultImages, index};