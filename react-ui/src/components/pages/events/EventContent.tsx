import EventIcon from '@mui/icons-material/Event';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fi';
import 'dayjs/locale/sv';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useEventQuery } from '../../../redux/services/eventApi';
import { date } from '../events/EventCard';

const styles = {
  root: {
    border: 'none',
    boxShadow: 'none',
  },
  media: {
    maxWidth: '100%',
    boxShadow: '0px 40px 40px -40px rgba(25, 55, 115, 0.4)',
    borderRadius: '2px',
  },
  box: {
    clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)',
    backgroundColor: '#fff',
    padding: '3px 8px 3px 8px',
    borderRadius: '2px',
  },
};

const EventContent = () => {
  const { t, i18n } = useTranslation();
  const params: any = useParams();
  const history = useHistory();
  const { data, isLoading, isFetching, error } = useEventQuery(params?.id);
  const defaultImage2 =
    'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';

  const imageUrl = data?.images[0]?.url ? data?.images[0]?.url : defaultImage2;

  return (
    <div>
      <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            style={{ width: 983 }}
            sx={{ ...styles.media }}
            component="img"
            src={imageUrl}
            alt={data?.images[0]?.alt_text?.fi}
          />
        </div>
      </Grid>
      <Grid
        container
        p={4}
        justifyContent="center"
        component="div"
        sx={{ ...styles.root }}
        spacing={8}
      >
        <Grid component="div" item xs={5} sx={{ display: 'inline-table' }}>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              mt: 1.5,
              pb: 3,
              borderRadius: '5px',
              fontWeight: 'bold',
              display: 'flex',
              fontSize: 15,
              alignItems: 'center',
              '& svg': {
                fontSize: 21,
                mr: 0.5,
              },
            }}
          >
            <EventIcon />
            {dayjs(data?.start_time).locale(i18n.language).format(date)} -{' '}
            {dayjs(data?.end_time).locale(i18n.language).format('HH:mm')}
          </Typography>
          <Typography variant="h4" component="div" sx={{ pb: 3 }}>
            {data?.name?.fi}
          </Typography>
          <Typography sx={{ display: 'flex', flexDirection: 'row', pb: 1 }} variant="subtitle2">
            <LocationOnIcon fontSize="small" />
            &nbsp;{data?.provider?.fi}
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pb: 4,
              cursor: 'pointer',
            }}
            variant="subtitle2"
          >
            <LinkIcon fontSize="small" />
            &nbsp;{' '}
            <Link
              href={`${data?.info_url?.fi}`}
              target="_blank"
              rel="noopener"
              sx={{ textDecoration: 'none', pb: 2, color: 'primary.dark' }}
            >
              {data?.info_url?.fi}
              {data?.info_url?.fi === null && { display: 'none' }}
            </Link>
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
              maxWidth: 700,
              pb: 4,
              letterSpacing: 0.01,
              fontStyle: 'regular',
            }}
            variant="body2"
          >
            {data?.short_description?.fi}
          </Typography>
          <Divider textAlign="left" sx={{ width: 143 }} />
          <Typography
            sx={{
              fontWeight: 'light',
              fontSize: 'default',
              maxWidth: 623,
              pt: 4,
            }}
            variant="body2"
          >
            {data?.description?.fi}
          </Typography>
        </Grid>
        <Grid component="div" item>
          <Grid
            width={340}
            minHeight={300}
            sx={{
              p: 4,
              backgroundColor: 'primary.dark',
              pt: 5,
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="h6">{`${t('price')}`}</Typography>
            <Typography component="div" variant="subtitle1">
              {data?.offers[0]?.price?.fi || '-'}
            </Typography>
            <Typography variant="h6">{`${t('age')}`}</Typography>
            <Typography component="div" variant="subtitle1">
              {data?.audience_min_age === null && <p>Ikärajaton</p>}
              {data?.audience_min_age && <p>{data?.audience_min_age} vuotta</p>}
            </Typography>
            <Typography variant="h6">{`${t('provider')}`}</Typography>
            <Typography component="div" variant="subtitle1">
              {data?.provider[i18n.language]}
            </Typography>
            <Typography variant="h6">{`${t('more')}`}</Typography>
            <Typography variant="subtitle1" component="div">
              <ul style={{ listStyle: 'none' }}>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Video</li>
              </ul>
            </Typography>
            <Box sx={{ display: 'flex', paddingBottom: 25 }}>
              <LinkIcon sx={{ ...styles.box, color: 'primary.dark' }} />
              <WhatsAppIcon sx={{ ...styles.box, color: 'primary.dark' }} />
              <FacebookIcon sx={{ ...styles.box, color: 'primary.dark' }} />
              <TwitterIcon sx={{ ...styles.box, color: 'primary.dark' }} />
              <LinkedInIcon sx={{ ...styles.box, color: 'primary.dark' }} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventContent;
