import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
import { date } from '../events/EventCard';

const List = ({ id, name, short_description, start_time, provider, images, end_time }: Event) => {
  const { i18n } = useTranslation();
  const defaultImage2 =
    'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';

  const imageUrl = images[0]?.url ? images[0]?.url : defaultImage2;
  return (
    <Link to={`/event/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card
        sx={{
          overflow: 'hidden',
          display: 'flex',
          width: '100%',
          maxWidth: { xs: 465, md: 990 },
          m: 1,
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <CardMedia component="img" sx={{ width: 155 }} src={imageUrl} />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              p: 0.5,
              backgroundColor: (theme) => alpha(theme.palette.primary.dark, 0.1),
              borderRadius: '5px',
              color: 'primary.dark',
              display: 'flex',
              alignItems: 'center',
              '& svg': {
                fontSize: 21,
              },
            }}
          >
            <EventIcon />
            {dayjs(start_time).locale(i18n.language).format(date)} -{' '}
            {dayjs(end_time).locale(i18n.language).format('HH:mm')}
          </Typography>
          <Typography sx={{ fontSize: 19, mt: 1 }} variant="h5">
            {name?.fi}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              display: 'flex',
              pt: 0.5,
              pb: 0.5,
              fontSize: 14,
              mt: 1,
            }}
          >
            <LocationOnIcon fontSize="small" />
            {provider?.fi}
          </Typography>
          <Typography variant="body2">{short_description?.fi}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default List;
