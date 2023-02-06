import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Event } from '../../../types';
import styles from './Event.module.css';

require('dayjs/locale/fi');
const date = 'dd DD.MM.YYYY | HH:mm';

const EventCard = ({
  id,
  name,
  short_description,
  start_time,
  end_time,
  provider,
  images,
}: Event) => {
  const { i18n } = useTranslation();

  const defaultImage2 =
    'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';

  const imageUrl = images[0]?.url ? images[0]?.url : defaultImage2;

  return (
    <Box sx={{ padding: 2 }}>
      <Card
        component="div"
        style={{ border: 'none', overflow: 'hidden' }}
        sx={{
          width: 350,
          height: 450,
          flexWrap: 'wrap',
          display: 'flex',
          maxWidth: { xs: 365, md: 990 },
          // p: 0.5,
          m: 1,
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <Link to={`/event/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <CardMedia
            sx={{ width: 350, height: 190 }}
            component="img"
            src={imageUrl}
            alt={images[0]?.alt_text?.fi ? images[0]?.alt_text?.fi : 'empty-alt-text'}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Typography
                gutterBottom
                variant="subtitle2"
                className={styles.date}
                sx={{
                  p: 0.5,
                  backgroundColor: (theme) => alpha(theme.palette.secondary.dark, 0.1),
                  '& svg': { fontSize: 21 },
                }}
              >
                <EventIcon />
                {dayjs(start_time).locale(i18n.language).format(date)} -{' '}
                {dayjs(end_time).locale(i18n.language).format('HH:mm')}
              </Typography>
              <Typography gutterBottom variant="h5">
                {name?.fi}
              </Typography>
              <Typography
                sx={{ letterSpacing: 1 }}
                gutterBottom
                variant="subtitle2"
                className={styles.locationIcon}
              >
                <LocationOnIcon fontSize="small" />
                {provider?.fi}
              </Typography>
              <Typography sx={{ overflow: 'hidden' }} className={styles.shortDesc} variant="body2">
                {short_description?.fi}
              </Typography>
            </CardContent>
          </Box>
        </Link>
      </Card>
    </Box>
  );
};

export default EventCard;
export { date };
