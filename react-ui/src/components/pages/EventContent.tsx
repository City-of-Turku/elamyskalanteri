import EventIcon from '@mui/icons-material/Event';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { CardMedia, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getFormattedDateTime } from '../../functions/getFormattedDate';
import { getLocationTitle } from '../../functions/getLocation';
import { getTranslatedValue } from '../../functions/getTranslatedValue';
import { useEventQuery } from '../../redux/services/eventApi';

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
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, isFetching, error } = useEventQuery(id, { skip: !id });
  const currentLang = i18n.language;

  if (isLoading || isFetching) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h2">{t('errorLoadingEvent')}</Typography>;
  }

  if (!event) {
    return <Typography variant="h2">{t('noEventData')}</Typography>;
  }

  const renderHTML = (value: string): JSX.Element | undefined => {
    if (!value) return;
    return (
      <span
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
      />
    );
  };

  const eventImageUrl = event.images[0]?.url;
  const eventImageAltText =
    event.images[0]?.alt_text && getTranslatedValue(event.images[0].alt_text, currentLang);
  const eventName = event.name && getTranslatedValue(event.name, currentLang);
  const eventProvider = event.provider && getTranslatedValue(event.provider, currentLang);
  const eventInfoUrl = event.info_url && getTranslatedValue(event.info_url, currentLang);
  const eventShortDescription =
    event.short_description && getTranslatedValue(event.short_description, currentLang);
  const eventDescription = event.description && getTranslatedValue(event.description, currentLang);
  const eventOfferIsFree = event.offers[0]?.is_free;
  const eventOfferPrice =
    event.offers[0]?.price && getTranslatedValue(event.offers[0].price, currentLang);
  const eventOfferDescription =
    event.offers[0]?.description && getTranslatedValue(event.offers[0].description, currentLang);
  const eventAudienceMinAge = event.audience_min_age;
  const locationTitle = getLocationTitle(
    event.location,
    event.location_extra_info,
    event.is_virtualevent,
    currentLang,
  );
  const formattedDateTime = getFormattedDateTime(
    event.start_time,
    event.end_time,
    currentLang,
    true,
  );

  return (
    <div>
      {eventImageUrl && (
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 1000,
            margin: 'auto',
          }}
        >
          <CardMedia
            style={{ width: 'auto' }}
            sx={{ ...styles.media }}
            component="img"
            src={eventImageUrl}
            alt={eventImageAltText}
          />
        </Grid>
      )}
      <Grid
        container
        p={4}
        justifyContent="center"
        component="div"
        sx={{ ...styles.root }}
        spacing={8}
      >
        <Grid component="div" item xs={5} sx={{ wordWrap: 'break-word' }}>
          {eventName && (
            <Typography variant="h2" component="h1" sx={{ mt: 2, mb: 3 }}>
              {eventName}
            </Typography>
          )}
          {formattedDateTime && (
            <Typography
              variant="subtitle2"
              component="div"
              sx={{
                pb: 2,
                borderRadius: '5px',
                fontWeight: 'bold',
                display: 'flex',
                fontSize: 15,
                alignItems: 'center',
                textTransform: 'capitalize',
                '& svg': {
                  fontSize: 21,
                  mr: 0.5,
                },
              }}
            >
              <EventIcon />
              {formattedDateTime}
            </Typography>
          )}

          {locationTitle && (
            <Typography
              sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}
              variant="subtitle2"
              component="div"
            >
              <LocationOnIcon fontSize="small" />
              &nbsp;{locationTitle}
            </Typography>
          )}
          {eventInfoUrl && (
            <Typography
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pb: 2,
                cursor: 'pointer',
              }}
              variant="subtitle2"
              component="div"
            >
              <LinkIcon fontSize="small" />
              &nbsp;{' '}
              <Link
                href={eventInfoUrl}
                target="_blank"
                rel="noopener"
                sx={{ textDecoration: 'none', color: 'secondary.main' }}
              >
                {eventInfoUrl}
              </Link>
            </Typography>
          )}
          {eventShortDescription && (
            <Typography sx={{ fontSize: 18, pt: 2, pb: 4 }} variant="body2">
              {renderHTML(eventShortDescription)}
            </Typography>
          )}
          <Divider textAlign="left" sx={{ width: 143 }} />
          {eventDescription && (
            <Typography sx={{ pt: 3 }} variant="body1">
              {renderHTML(eventDescription)}
            </Typography>
          )}
        </Grid>
        <Grid component="div" item>
          <Grid
            width={340}
            minHeight={300}
            sx={{
              p: 4,
              pt: 5,
              backgroundColor: 'secondary.main',
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="subtitle1" component="h2" sx={{ color: '#fff' }}>
              {t('price')}
            </Typography>
            <Typography variant="body1" component="div" sx={{ color: '#fff' }}>
              {eventOfferIsFree && <div>{t('free')}</div>}
              {eventOfferPrice && <div>{eventOfferPrice}</div>}
              {eventOfferDescription && renderHTML(eventOfferDescription)}
            </Typography>

            <Typography variant="subtitle1" component="h2" sx={{ mt: 3, color: '#fff' }}>
              {t('age')}
            </Typography>
            <Typography variant="body1" component="div" sx={{ color: '#fff' }}>
              {eventAudienceMinAge === null && <div>{t('noAgeRestriction')}</div>}
              {eventAudienceMinAge && (
                <div>
                  {eventAudienceMinAge} {t('years')}
                </div>
              )}
            </Typography>

            <Typography variant="subtitle1" component="h2" sx={{ mt: 3, color: '#fff' }}>
              {t('provider')}
            </Typography>
            <Typography variant="body1" component="div" sx={{ color: '#fff' }}>
              {eventProvider || '-'}
            </Typography>

            <Typography variant="subtitle1" component="h2" sx={{ mt: 3, color: '#fff' }}>
              {t('more')}
            </Typography>
            <Typography variant="body1" component="div" sx={{ color: '#fff' }}>
              <ul>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Video</li>
              </ul>
            </Typography>
            <Box sx={{ display: 'flex', paddingBottom: 16 }}>
              <LinkIcon sx={{ ...styles.box, color: 'secondary.main' }} />
              <WhatsAppIcon sx={{ ...styles.box, color: 'secondary.main' }} />
              <FacebookIcon sx={{ ...styles.box, color: 'secondary.main' }} />
              <TwitterIcon sx={{ ...styles.box, color: 'secondary.main' }} />
              <LinkedInIcon sx={{ ...styles.box, color: 'secondary.main' }} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventContent;
