import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { parseQuery } from '../../../functions/urlParser';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { useEventsQuery } from '../../../redux/services/eventApi';
import filterSlice from '../../../redux/slices/filterSlice';
import GridList from '../../EventList/GridList';
import HorizontalList from '../../EventList/HorizontalList';
import VerticalList from '../../EventList/VerticalList';
import EmbedCode from '../../FilterContainer/EmbedCode/EmbedCode';
import FilterContainer from '../../FilterContainer/FilterContainer';
import LinkContainer from '../../Link/LinkContainer';
import Title from '../../Title/Title';

interface EventListProps {
  typeId?: string;
}

const EventList = (props: EventListProps) => {
  const theme: any = useTheme();
  const { t } = useTranslation();
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
  const hasEvents = !!visibleEvents && !!visibleEvents.length;

  // Reset page number back to #1 when updating any filters
  useEffect(() => {
    setPage(1);
  }, [filters]);

  let renderListComponent = <GridList events={visibleEvents} />;
  switch (listView) {
    case 'grid':
      renderListComponent = <GridList events={visibleEvents} />;
      break;
    case 'vertical':
      renderListComponent = <VerticalList events={visibleEvents} />;
      break;
    case 'horizontal':
      renderListComponent = <HorizontalList events={visibleEvents} />;
      break;
  }

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
      <Button
        onClick={() => setPage(page + 1)}
        sx={{
          backgroundColor: theme.palette.primary.dark,
          '&:hover': { backgroundColor: theme.palette.primary.main },
        }}
        variant="contained"
      >
        {t('loadMore')}
      </Button>
    </div>
  );

  const renderError = <h2>{t('errorWhileLoadingEvents')}</h2>;

  const renderNoResults = <h2>{t('noEventsFound')}</h2>;

  return (
    <Box sx={{ p: 2 }}>
      <Title />
      {showSearch && (
        <>
          <FilterContainer />
          <EmbedCode />
        </>
      )}
      <Grid
        sx={{
          flexGrow: 1,
          alignItems: 'strech',
          justifyContent: 'center',
          position: 'relative',
        }}
        container
      >
        {isLoading || isFetching ? (
          renderSpinner
        ) : error ? (
          renderError
        ) : hasEvents ? (
          <>
            {renderListComponent}
            {allowPagination && hasNextPage && renderLoadMoreButton}
          </>
        ) : (
          renderNoResults
        )}
      </Grid>
      <LinkContainer />
    </Box>
  );
};

export default EventList;
