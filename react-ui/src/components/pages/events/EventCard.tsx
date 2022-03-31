import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

dayjs.locale("fi");
const date = "DD.MM.YYYY"

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
    height: 400,
    border: "none",
    boxShadow: "none",
    padding: "0.5em"
  },
  media: {
    maxWidth: 345,
    height: 132,
  },
});


const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[900],
          }}
        >
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
    <Card className={classes.root}>
      <Link
        to={`/eventlist/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            src={
              images[0]?.url ||
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            }
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle2" component="div">
              {dayjs(start_time).format(date)}
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
            <Typography variant="body2"></Typography>
          </CardContent>
        </CardActionArea>
      </Link>

      <Button variant="outlined" onClick={handleClickOpen}>
        Lue lisää
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box
          component="img"
          alt="The house from the offer."
          src={
            images[0]?.url ||
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          }
        />
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {name?.fi}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom sx={{ fontWeight: "bold" }}>
            {" "}
            {dayjs(start_time).format(date)}
          </Typography>
          <Typography gutterBottom>{short_description?.fi}</Typography>
          <Typography gutterBottom color="text.secondary">
            {location_extra_info?.fi}
          </Typography>
          <Typography gutterBottom></Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </Card>
  );
};

export default EventCard;
export {date};