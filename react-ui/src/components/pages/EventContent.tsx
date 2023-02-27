import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { CardMedia, Chip, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import DOMPurify from 'dompurify';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EVENT_EXTERNAL_LINKS } from '../../constants';
import { capitalize } from '../../functions/capitalize';
import { getFormattedDateTime } from '../../functions/getFormattedDate';
import { getLocationTitle } from '../../functions/getLocation';
import { getTranslatedValue } from '../../functions/getTranslatedValue';
import { useEventQuery } from '../../redux/services/eventApi';
import { useKeywordSetQuery } from '../../redux/services/keywordApi';
import { EventOffer, KeywordSet } from '../../types';
import styles from './EventContent.module.scss';

const EventContent = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Get the event ID from the URL path by splitting the path using the forward slash as a separator,
  // and getting the last element of the resulting array.
  const eventId = window.location.pathname.split('/').pop() || '';
  const { data: event, isLoading, isFetching, error } = useEventQuery(eventId, { skip: !eventId });

  const {
    data: keywordSetData,
    isLoading: isLoadingKeywordSetData,
    isFetching: isFetchingKeywordSetData,
    isSuccess: isSuccessKeywordSetData,
  } = useKeywordSetQuery();
  const keywordSets = keywordSetData?.data || [];

  if (isLoading || isFetching || isLoadingKeywordSetData || isFetchingKeywordSetData) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        {t('errorLoadingEvent')}
      </Typography>
    );
  }

  if (!event) {
    return (
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        {t('noEventData')}
      </Typography>
    );
  }

  const mapKeywordSet = (keywordSets: KeywordSet[], id: string, locale = 'fi') => {
    const keywordSet = keywordSets.find((keywordSet) => keywordSet.id === id);
    const keywords = keywordSet?.keywords;
    if (keywords) {
      return keywords.map((item) => {
        const label = getTranslatedValue(item.name, locale) || '';
        return {
          value: item['@id'],
          // we don't want yso parentheses visible in keyword sets, so only pick the part before them
          label: label.split(' (')[0],
          name: item.name,
        };
      });
    } else {
      return [];
    }
  };

  const getCurrentTypeSet = (typeId: string) => {
    const EVENT_TYPE = {
      GENERAL: 'General',
      COURSE: 'Course',
      HOBBIES: 'Hobbies',
    };

    switch (typeId) {
      case EVENT_TYPE.HOBBIES:
        return 'turku:hobbytopics';
      case EVENT_TYPE.COURSE:
        return 'turku:coursetopics';
      case EVENT_TYPE.GENERAL:
      default:
        return 'turku:topic_content';
    }
  };

  const renderHTML = (value: string, noFormatting?: boolean): JSX.Element | undefined => {
    if (!value) return;
    return (
      <span
        style={{ whiteSpace: noFormatting ? 'normal' : 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
      />
    );
  };

  // Main keywords
  const mainCategoryValues =
    isSuccessKeywordSetData && !!keywordSets.length
      ? mapKeywordSet(keywordSets, getCurrentTypeSet(event.type_id), currentLang).map(
          (item) => item.value,
        )
      : [];
  const mainCategoryKeywords =
    mainCategoryValues &&
    event.keywords.filter((keyword) => mainCategoryValues.includes(keyword['@id']));

  // Secondary keywords
  const secondaryCategoryValues =
    isSuccessKeywordSetData && !!keywordSets.length
      ? mapKeywordSet(keywordSets, 'turku:topic_type', currentLang).map((item) => item.value)
      : [];
  const secondaryCategoryKeywords =
    secondaryCategoryValues &&
    event.keywords.filter((keyword) => secondaryCategoryValues.includes(keyword['@id']));

  const mainAndSecondaryCategoryKeywords = [...mainCategoryKeywords, ...secondaryCategoryKeywords];

  // Rest of the keywords
  const mainAndSecondaryCategoryValues = [...mainCategoryValues, ...secondaryCategoryValues];
  const nonMainCategoryKeywords =
    isSuccessKeywordSetData && !!mainAndSecondaryCategoryValues.length
      ? event.keywords.filter((keyword) => !mainAndSecondaryCategoryValues.includes(keyword['@id']))
      : [];

  // Event image
  const eventImageUrl = event.images[0]?.url;
  const eventImageAltText =
    event.images[0]?.alt_text && getTranslatedValue(event.images[0].alt_text, currentLang);

  // Event name and descriptions
  const eventName = event.name && getTranslatedValue(event.name, currentLang);
  const eventShortDescription =
    event.short_description && getTranslatedValue(event.short_description, currentLang);
  const eventDescription = event.description && getTranslatedValue(event.description, currentLang);

  // Event info URL
  const eventInfoUrl = event.info_url && getTranslatedValue(event.info_url, currentLang);

  // Event provider
  const eventProvider = event.provider && getTranslatedValue(event.provider, currentLang);

  // Event start and end times
  const formattedDateTime = getFormattedDateTime(
    event.start_time,
    event.end_time,
    currentLang,
    true,
  );

  // Virtual event data
  const isVirtualEvent = event.is_virtualevent;
  const virtualeventUrl = event.virtualevent_url;

  // Event location
  const locationTitle = getLocationTitle(
    event.location,
    event.location_extra_info,
    isVirtualEvent,
    currentLang,
  );

  // Event prices
  const eventOffers = event.offers;

  // Event videos
  const videos = event.videos;

  // Event audience
  const audience = event.audience;

  // event enrolment
  const enrolmentStarts = event.enrolment_start_time;
  const enrolmentEnds = event.enrolment_end_time;
  const enrolmentUrl = event.enrolment_url;

  // Event audience
  const maxAttendeeCapacity = event.maximum_attendee_capacity;
  const minAttendeeCapacity = event.minimum_attendee_capacity;

  // Event languages
  const eventLanguages = event.in_language;

  // Get age limit text
  const getAgeLimit = () => {
    const minAge = event.audience_min_age;
    const maxAge = event.audience_max_age;

    if (minAge && maxAge) {
      return `${minAge} - ${maxAge} ${t('yearsOld')}`;
    } else if (minAge) {
      return `${t('olderThan')} ${minAge} ${t('yearsOld')}`;
    } else if (maxAge) {
      return `${t('youngerThan')} ${maxAge} ${t('yearsOld')}`;
    } else {
      return t('noAgeRestriction');
    }
  };

  const getSocialMediaLinks = () => {
    const externalLinks = event.external_links;

    if (!externalLinks.length) return null;

    const getLinkVisibleName = (name: string) => {
      switch (name) {
        case EVENT_EXTERNAL_LINKS.FACEBOOK:
          return 'Facebook';
        case EVENT_EXTERNAL_LINKS.INSTAGRAM:
          return 'Instagram';
        case EVENT_EXTERNAL_LINKS.TWITTER:
          return 'Twitter';
        default:
          return name;
      }
    };

    return externalLinks.map((link) => (
      <div key={link.name}>
        <Link
          color="secondary"
          href={link.link}
          target="_blank"
          rel="noreferrer"
          className={styles.sidebarLink}
        >
          {getLinkVisibleName(link.name)} <OpenInNewIcon fontSize="small" />
        </Link>
      </div>
    ));
  };

  const renderPrice = (price: EventOffer['price']) => {
    const priceValue = getTranslatedValue(price);

    if (!priceValue) return null;

    const formattedPrice = priceValue.replace('.', ',');
    return `${formattedPrice} €`;
  };

  return (
    <div>
      <Grid
        container
        component="div"
        py={[2, 4]}
        px={[2, 4, 5]}
        gap={[2, 4]}
        className={styles.header}
        sx={{
          maxWidth: eventImageUrl ? 1200 : 1064,
          margin: 'auto',
          wordWrap: 'break-word',
        }}
      >
        <div className={styles.headerTexts}>
          {!!eventName && (
            <Typography variant="h2" component="h1" sx={{ mt: 0, mb: 2 }}>
              {eventName}
            </Typography>
          )}

          {!!eventShortDescription && (
            <Typography variant="body2">{renderHTML(eventShortDescription, true)}</Typography>
          )}

          {!!formattedDateTime && (
            <Typography
              variant="body1"
              component="div"
              sx={{
                mt: 3,
                display: 'flex',
                textTransform: 'capitalize',
              }}
            >
              <EventIcon sx={{ width: 36 }} />
              {formattedDateTime}
            </Typography>
          )}

          {!!locationTitle && (
            <Typography
              sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}
              variant="body1"
              component="div"
            >
              <LocationOnIcon sx={{ width: 36 }} />
              <div>
                {locationTitle}
                {event.location && event.location_extra_info && (
                  <Box component="div" sx={{ mt: 1 }}>
                    {getTranslatedValue(event.location_extra_info, currentLang)}
                  </Box>
                )}
              </div>
            </Typography>
          )}

          {!!mainAndSecondaryCategoryKeywords.length && (
            <div className={styles.chipContainer}>
              {mainAndSecondaryCategoryKeywords.map((keyword) => (
                <Chip
                  key={keyword.id}
                  label={
                    <Typography
                      sx={{ color: 'inherit', fontSize: 14, fontWeight: 700, lineHeight: 1 }}
                    >
                      {getTranslatedValue(keyword.name, currentLang)}
                    </Typography>
                  }
                  variant={'filled'}
                  className={styles.chip}
                  color="secondary"
                  sx={{ color: theme.palette.secondary.main }}
                />
              ))}
            </div>
          )}
        </div>
        {!!eventImageUrl && (
          <div className={styles.imageWrap}>
            <CardMedia
              className={styles.image}
              component="img"
              src={eventImageUrl}
              alt={eventImageAltText}
            />
          </div>
        )}
      </Grid>

      <Grid
        container
        component="div"
        sx={{
          border: 'none',
          boxShadow: 'none',
          maxWidth: 1000,
          margin: 'auto',
        }}
        gap={5}
        px={[2, 4, 4, 0]}
        pb={[1, 1, 4, 4]}
        flexWrap={['wrap', 'wrap', 'nowrap', 'nowrap']}
      >
        <Grid
          component="div"
          item
          py={[0, 0, 5]}
          sx={{ wordWrap: 'break-word' }}
          className={styles.descriptionColumn}
          flexBasis="auto"
        >
          {!!eventDescription && (
            <>
              <Typography component="h2" variant="h3">
                {t('description')}
              </Typography>
              <Typography sx={{ pt: 3 }} variant="body1">
                {renderHTML(eventDescription)}
              </Typography>
            </>
          )}

          {!!audience.length && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {t('audience')}
              </Typography>
              <div className={styles.chipContainer}>
                {audience.map((audience) => (
                  <Chip
                    key={audience.id}
                    label={
                      <Typography
                        sx={{ color: 'inherit', fontSize: 14, fontWeight: 700, lineHeight: 1 }}
                      >
                        {capitalize(getTranslatedValue(audience.name, currentLang) || '-')}
                      </Typography>
                    }
                    variant={'filled'}
                    className={styles.chip}
                    color="secondary"
                    sx={{ color: theme.palette.secondary.main }}
                  />
                ))}
              </div>
            </Box>
          )}

          {!!nonMainCategoryKeywords.length && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {t('otherKeywords')}
              </Typography>
              <div className={styles.chipContainer}>
                {nonMainCategoryKeywords.map((keyword) => (
                  <Chip
                    key={keyword.id}
                    label={
                      <Typography
                        sx={{ color: 'inherit', fontSize: 14, fontWeight: 700, lineHeight: 1 }}
                      >
                        {capitalize(getTranslatedValue(keyword.name, currentLang) || '-')}
                      </Typography>
                    }
                    variant={'filled'}
                    className={styles.chip}
                    color="secondary"
                    sx={{ color: theme.palette.secondary.main }}
                  />
                ))}
              </div>
            </Box>
          )}
        </Grid>

        <Grid
          component="div"
          item
          mt={[3, 3, 5]}
          mb={1}
          sx={{ borderLeft: ['none', 'none', '1px solid #D1D7E2'] }}
          className={styles.sideBarColumn}
          flexGrow={0}
        >
          <Grid
            minWidth={[0, 300, 300, 300]}
            sx={{
              pl: [0, 0, 5],
              wordWrap: 'break-word',
            }}
          >
            {((isVirtualEvent && !!virtualeventUrl) || !!eventInfoUrl) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                  {t('links')}
                </Typography>
                {isVirtualEvent && !!virtualeventUrl && (
                  <Typography variant="body1" component="div">
                    <Link
                      color="secondary"
                      href={virtualeventUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.sidebarLink}
                    >
                      {t('virtualEventLink')} <OpenInNewIcon fontSize="small" />
                    </Link>
                  </Typography>
                )}
                {!!eventInfoUrl && (
                  <Typography variant="body1" component="div">
                    <Link
                      color="secondary"
                      href={eventInfoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.sidebarLink}
                    >
                      {t('eventInfoLink')} <OpenInNewIcon fontSize="small" />
                    </Link>
                  </Typography>
                )}
              </Box>
            )}

            {!!eventOffers.length &&
              eventOffers.map((offer, index) => (
                <Box sx={{ mb: 3 }} key={index}>
                  <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                    {eventOffers.length === 1 ? t('pricing') : `${t('priceInfo')} ${index + 1}`}
                  </Typography>
                  <Typography variant="body1" component="div" key={index} className={styles.prices}>
                    {offer.is_free && <div>{t('free')}</div>}
                    {offer.price && <div>{renderPrice(offer.price)}</div>}
                    {offer.description &&
                      renderHTML(getTranslatedValue(offer.description, currentLang) || '')}
                    {!!offer.payment_methods.length && (
                      <div>
                        <span>{t('paymentMethods')}: </span>
                        {offer.payment_methods.map((paymentMethod) => (
                          <span key={paymentMethod.id} className={styles.paymentMethod}>
                            {getTranslatedValue(paymentMethod.name, currentLang) || ''}
                          </span>
                        ))}
                      </div>
                    )}
                    {offer.info_url && !!getTranslatedValue(offer.info_url) && (
                      <div>
                        <Link
                          color="secondary"
                          href={getTranslatedValue(offer.info_url)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.sidebarLink}
                        >
                          {t('offerTicketsUrl')} <OpenInNewIcon fontSize="small" />
                        </Link>
                      </div>
                    )}
                  </Typography>
                </Box>
              ))}

            {(!!enrolmentStarts || !!enrolmentEnds || !!enrolmentUrl) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                  {t('enrolment')}
                </Typography>
                {!!enrolmentUrl && (
                  <Typography variant="body1" component="div">
                    <Link
                      color="secondary"
                      href={enrolmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.sidebarLink}
                    >
                      {t('enrolmentLink')} <OpenInNewIcon fontSize="small" />
                    </Link>
                  </Typography>
                )}
                {!!enrolmentStarts && (
                  <Typography variant="body1" component="div">
                    {t('enrolmentStarts')}:{' '}
                    {getFormattedDateTime(enrolmentStarts, null, currentLang)}
                  </Typography>
                )}
                {!!enrolmentEnds && (
                  <Typography variant="body1" component="div">
                    {t('enrolmentEnds')}: {getFormattedDateTime(enrolmentEnds, null, currentLang)}
                  </Typography>
                )}
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                {t('ageRestrictions')}
              </Typography>
              <Typography variant="body1" component="div">
                {getAgeLimit()}
              </Typography>
            </Box>

            {(!!minAttendeeCapacity || !!maxAttendeeCapacity) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                  {t('attendeeCapacity')}
                </Typography>
                {!!minAttendeeCapacity && (
                  <Typography variant="body1" component="div">
                    {t('minAttendeeCapacity')}: {minAttendeeCapacity}
                  </Typography>
                )}
                {!!maxAttendeeCapacity && (
                  <Typography variant="body1" component="div">
                    {t('maxAttendeeCapacity')}: {maxAttendeeCapacity}
                  </Typography>
                )}
              </Box>
            )}

            {!!eventLanguages.length && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                  {t('eventLanguages')}
                </Typography>
                <Typography variant="body1" component="div">
                  {eventLanguages.map((language) => (
                    <span className={styles.language} key={language.id}>
                      {getTranslatedValue(language.name, currentLang)}
                    </span>
                  ))}
                </Typography>
              </Box>
            )}

            {!!eventProvider && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                  {t('provider')}
                </Typography>
                <Typography variant="body1" component="div">
                  {eventProvider}
                </Typography>
              </Box>
            )}

            {!!videos.length && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                  {t('videos')}
                </Typography>
                <Typography variant="body1" component="div">
                  {videos.map((video, index) => (
                    <Typography variant="body1" component="div" key={`${video.url}-${index}`}>
                      <Link
                        color="secondary"
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.sidebarLink}
                      >
                        {getTranslatedValue(video.name, currentLang) || `${t('video')} ${index}`}{' '}
                        <OpenInNewIcon fontSize="small" />
                      </Link>
                    </Typography>
                  ))}
                </Typography>
              </Box>
            )}

            {!!getSocialMediaLinks() && (
              <Box>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold' }}>
                  {t('socialMedia')}
                </Typography>
                {getSocialMediaLinks()}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventContent;
