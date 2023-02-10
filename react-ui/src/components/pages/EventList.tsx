import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { LAYOUT_OPTIONS } from '../../constants';
import { parseQuery } from '../../functions/urlParser';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { useEventsQuery } from '../../redux/services/eventApi';
import filterSlice from '../../redux/slices/filterSlice';
import { Event } from '../../types';
import CompactView from '../Events/Compact/CompactView';
import GridView from '../Events/Grid/GridView';
import ListView from '../Events/List/ListView';
import EmbedCode from '../FilterContainer/EmbedCode/EmbedCode';
import FilterContainer from '../FilterContainer/FilterContainer';
import LinkContainer from '../Link/LinkContainer';
import Title from '../Title/Title';

interface EventListProps {
  typeId?: string;
}

const EventList = (props: EventListProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { typeId } = props;
  const { filters, options, appState } = useAppSelector((state) => state);
  const {
    setSearch,
    setEventTypes,
    setFeatures,
    setStartTime,
    setEndTime,
    addAudience,
    setTypeId,
  } = bindActionCreators(filterSlice.actions, dispatch);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const { attributesLoaded } = appState;
  const { listView, numOfView, showSearch } = options;
  const shouldUpdateUrl = showSearch;
  const allowPagination = showSearch;

  // This useEffect is meant to update filters based on browser's query parameters in the URL.
  // When the user lands on the page and query parameters are set, it will use those instead
  // of the ones set as data-attributes
  useEffect(() => {
    // Don't do anything if we are not supposed to update the URL or if the data attribute
    // filters are not yet applied
    if (shouldUpdateUrl === null || shouldUpdateUrl === undefined || !attributesLoaded) return;

    // Check if first load is not yet done
    if (!firstLoadDone) {
      // Early exit if shouldUpdateUrl is set as "false"
      if (!shouldUpdateUrl) return setFirstLoadDone(true);

      // Get query object from window location hash
      const query = queryString.parse(window.location.hash.replaceAll('?', ''));

      const queryHasValue = (value: string): boolean => {
        if (Object.keys(query).includes(value)) {
          return true;
        }
        return false;
      };

      const arrayFromCommaList = (value: unknown): [] | string[] => {
        if (typeof value === 'string') {
          return value?.split(',');
        }
        return [];
      };

      if (queryHasValue('text')) {
        setSearch(query.text);
      }
      if (queryHasValue('keywords')) {
        setEventTypes(arrayFromCommaList(query.keywords));
      }
      if (queryHasValue('features')) {
        setFeatures(arrayFromCommaList(query.features));
      }
      if (queryHasValue('start_time')) {
        setStartTime(query.start_time);
      }
      if (queryHasValue('end_time')) {
        setEndTime(query.end_time);
      }
      if (queryHasValue('audiences')) {
        const audienceArray = arrayFromCommaList(query.audiences);
        audienceArray.forEach((item: string) => addAudience(item));
      }
      if (queryHasValue('type_id')) {
        setTypeId(query.type_id);
      } else if (typeId) {
        setTypeId(typeId);
      }

      setFirstLoadDone(true);
    }
  }, [
    addAudience,
    firstLoadDone,
    attributesLoaded,
    setEndTime,
    setEventTypes,
    setFeatures,
    setSearch,
    setStartTime,
    setTypeId,
    shouldUpdateUrl,
    typeId,
  ]);

  // Replace URL with new filters
  useEffect(() => {
    // Wait until first load is done and data-attributes are in place.
    // See if we should update the url
    if (!firstLoadDone || !shouldUpdateUrl || !attributesLoaded) return;
    history.replace(parseQuery(filters));
  }, [firstLoadDone, filters, history, attributesLoaded, shouldUpdateUrl]);

  const [page, setPage] = useState(1);
  const {
    data: events,
    error,
    isLoading,
    isFetching,
  } = useEventsQuery(
    {
      page: page,
      searchTerm: filters.search || '',
      keyword: filters.eventTypes,
      features: Array.isArray(filters.eventFeatures) ? filters.eventFeatures.join('&') : '',
      bbox: filters.bbox.north ? Object.values(filters.bbox).join(',') : '',
      start_time: filters.startTime ? dayjs(filters.startTime).format('YYYY-MM-DD') : '',
      end_time: filters.endTime ? dayjs(filters.endTime).format('YYYY-MM-DD') : '',
      audiences: filters.audiences,
      type_id: filters.typeId ? filters.typeId : '',
    },
    { skip: !firstLoadDone },
  );

  let visibleEvents = events?.data;
  const hasRestrictedAmountOfResults =
    visibleEvents && numOfView && visibleEvents.length > numOfView;

  if (hasRestrictedAmountOfResults) {
    visibleEvents = events?.data.slice(0, numOfView);
  }

  const eventsMeta = events?.meta;
  const hasNextPage = !!eventsMeta?.next;

  // Reset page number back to #1 when updating any filters
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const renderEvents = (events: Event[]) => {
    switch (listView) {
      case LAYOUT_OPTIONS.GRID:
        return <GridView events={events} />;
      case LAYOUT_OPTIONS.LIST:
        return <ListView events={events} />;
      case LAYOUT_OPTIONS.COMPACT:
        return <CompactView events={events} />;
    }
  };

  const renderSpinner = (
    <Box>
      <CircularProgress />
    </Box>
  );

  const renderLoadMoreButton = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '8px 0 24px 0',
      }}
    >
      <Button onClick={() => setPage(page + 1)} variant="contained" color="secondary">
        {t('loadMore')}
      </Button>
    </div>
  );

  const renderError = <Typography variant="h2">{t('errorWhileLoadingEvents')}</Typography>;

  const renderNoResults = <Typography variant="h2">{t('noEventsFound')}</Typography>;

  return (
    <>
      <Title />
      {showSearch && (
        <Box sx={{ maxWidth: theme.breakpoints.values.md, margin: 'auto' }}>
          <FilterContainer />
          <EmbedCode />
        </Box>
      )}
      <Grid
        sx={{
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        container
      >
        {isLoading || isFetching ? (
          renderSpinner
        ) : error ? (
          renderError
        ) : visibleEvents && !!visibleEvents.length ? (
          <>
            {renderEvents(visibleEvents)}
            {allowPagination && hasNextPage && renderLoadMoreButton}
          </>
        ) : (
          renderNoResults
        )}
      </Grid>
      <LinkContainer />
    </>
  );
};

export default EventList;
