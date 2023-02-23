import PrevIcon from '@mui/icons-material/NavigateBefore';
import NextIcon from '@mui/icons-material/NavigateNext';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LAYOUT_OPTIONS } from '../../constants';
import { arrayFromCommaList } from '../../functions/arrayFromCommaList';
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

const DEFAULT_PAGE_SIZE = 20; // number of events per page

const EventList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const history = createBrowserHistory();
  const { filters, options, appState } = useAppSelector((state) => state);
  const {
    setAudience,
    setLocalities,
    setSearch,
    setEventTypes,
    setFeatures,
    setStartTime,
    setEndTime,
    setTypeId,
    setExtraKeyword,
  } = bindActionCreators(filterSlice.actions, dispatch);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const { attributesLoaded } = appState;
  const { listView, numOfVisibleResults, showSearch, showEmbedTool } = options;
  const shouldUpdateUrl = showSearch;
  const allowPagination = showSearch;
  const hideResultCount = !showSearch;
  const resultsPerPage = numOfVisibleResults || DEFAULT_PAGE_SIZE;
  const resultsRef = useRef<HTMLDivElement>(null);

  // Use a ref to store the previous filters value and determine if they have changed
  const previousFiltersRef = useRef(filters);
  const filtersWereUpdated = previousFiltersRef.current !== filters;

  // Update the previous filters value after each render
  useEffect(() => {
    previousFiltersRef.current = filters;
  });

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

      // Get query object from window location search
      const query = queryString.parse(window.location.search);

      const queryHasValue = (value: string): boolean => {
        if (Object.keys(query).includes(value)) {
          return true;
        }
        return false;
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
        setAudience(arrayFromCommaList(query.audiences));
      }

      if (queryHasValue('localities')) {
        setLocalities(arrayFromCommaList(query.localities));
      }

      if (queryHasValue('type_id')) {
        setTypeId(query.type_id);
      }

      if (queryHasValue('extra_keyword')) {
        setExtraKeyword(query.extra_keyword);
      }

      setFirstLoadDone(true);
    }
  }, [
    firstLoadDone,
    attributesLoaded,
    setEndTime,
    setEventTypes,
    setFeatures,
    setSearch,
    setStartTime,
    setTypeId,
    shouldUpdateUrl,
    setAudience,
    setLocalities,
    setExtraKeyword,
  ]);

  // Replace URL with new filters
  useEffect(() => {
    // Wait until first load is done and data-attributes are in place.
    // See if we should update the url
    if (!firstLoadDone || !shouldUpdateUrl || !attributesLoaded) return;
    history.replace(parseQuery(filters));
  }, [firstLoadDone, filters, history, attributesLoaded, shouldUpdateUrl]);

  const [page, setPage] = useState(1);
  const [loadInitiatedByPagination, setLoadInitiatedByPagination] = useState(false);
  const {
    data: events,
    error,
    isSuccess,
    isLoading,
    isFetching,
  } = useEventsQuery(
    {
      page: filtersWereUpdated ? 1 : page, // Reset page to 1 if filters were updated
      searchTerm: filters.search || '',
      keyword: filters.eventTypes,
      features: Array.isArray(filters.eventFeatures) ? filters.eventFeatures.join('&') : '',
      latitude: filters.maxDistance.latitude ? filters.maxDistance.latitude.toString() : '',
      longitude: filters.maxDistance.longitude ? filters.maxDistance.longitude.toString() : '',
      radius: filters.maxDistance.radius ? filters.maxDistance.radius.toString() : '',
      start_time: filters.startTime ? dayjs(filters.startTime).format('YYYY-MM-DD') : '',
      end_time: filters.endTime ? dayjs(filters.endTime).format('YYYY-MM-DD') : '',
      audiences: filters.audiences,
      type_id: filters.typeId ? filters.typeId : '',
      page_size: resultsPerPage,
      localities: filters.localities,
      extraKeyword: filters.extraKeyword || '',
    },
    { skip: !firstLoadDone },
  );

  const visibleEvents = events?.data;
  const eventsMeta = events?.meta;
  const pageCount = eventsMeta?.total_pages || 1;
  const showPagination = allowPagination && pageCount > 1;
  const hasNextPage = !!eventsMeta?.next;
  const hasPrevPage = !!eventsMeta?.previous;
  const resultCount = eventsMeta?.count;

  // Reset page number back to #1 when updating any filters
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handlePageChange = (page: number) => {
    setPage(page);
    setLoadInitiatedByPagination(true);
  };

  // Scroll to results when pagination is used
  useEffect(() => {
    if (isLoading || isFetching) return;
    if (loadInitiatedByPagination && isSuccess) {
      setTimeout(() => {
        return resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      setLoadInitiatedByPagination(false);
    }
  }, [loadInitiatedByPagination, isLoading, isFetching, isSuccess]);

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

  const renderError = <Typography variant="h3">{t('errorWhileLoadingEvents')}</Typography>;

  const renderNoResults = <Typography variant="body2">{t('noEventsFound')}</Typography>;

  const renderPaginationCurrentPage = `${t('page')} ${page} / ${pageCount}`;

  const renderPagination = () => {
    if (!showPagination) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 1,
          marginBottom: 4,
        }}
      >
        <Button
          sx={{
            paddingY: 1,
            paddingX: 0,
            borderRadius: 0,
            clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)',
          }}
          onClick={() => handlePageChange(page - 1)}
          disableElevation
          variant="contained"
          color="secondary"
          disabled={!hasPrevPage}
          aria-label={t('previousPage')}
        >
          <PrevIcon />
        </Button>
        <Box sx={{ paddingY: 1, paddingX: 0.5, marginX: 2, textAlign: 'center' }}>
          {renderPaginationCurrentPage}
        </Box>
        <Button
          sx={{
            paddingY: 1,
            paddingX: 0,
            borderRadius: 0,
            clipPath: 'polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%)',
          }}
          onClick={() => handlePageChange(page + 1)}
          disableElevation
          variant="contained"
          color="secondary"
          disabled={!hasNextPage}
          aria-label={t('nextPage')}
        >
          <NextIcon />
        </Button>
      </Box>
    );
  };

  const renderResultCount = () => {
    if (hideResultCount || !resultCount) return null;

    const currPageText = showPagination ? <> &ndash; {renderPaginationCurrentPage}</> : '';

    const resultCountText = (
      // We cannot use i18next plural features here.
      // See https://github.com/i18next/i18next-scanner/issues/228
      <span>
        {resultCount} {resultCount === 1 ? t('resultCount') : t('resultCountPlural')}
        {currPageText}
      </span>
    );

    return (
      <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.7 }}>
        {resultCountText}
      </Typography>
    );
  };

  return (
    <>
      <Title />
      {showSearch && (
        <Box sx={{ maxWidth: theme.breakpoints.values.md, margin: 'auto' }}>
          <FilterContainer />
          {showEmbedTool && <EmbedCode />}
        </Box>
      )}
      <Grid
        component="div"
        ref={resultsRef}
        sx={{
          paddingTop: showSearch ? 4 : 0,
          paddingBottom: showSearch ? 3 : 0,
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
            {renderResultCount()}
            {renderEvents(visibleEvents)}
            {renderPagination()}
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
