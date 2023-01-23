import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
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
  const { t, i18n } = useTranslation();
  const options = useAppSelector((state) => state.options);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const queryString = require('query-string');

  const { filters } = useAppSelector((state) => state);
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

  useEffect(() => {
    if (!firstLoadDone) {
      const query = queryString.parse(window.location.hash.replaceAll('?', ''));

      if (Object.keys(query).includes('text')) {
        setSearch(query.text);
      }
      if (Object.keys(query).includes('keywords')) {
        const keywordArray = query.keywords.split(',');
        setEventTypes(keywordArray);
      }
      if (Object.keys(query).includes('features')) {
        const featureArray = query.features.split(',');
        console.log('feature array: ', featureArray);
        setFeatures(featureArray);
      }

      if (Object.keys(query).includes('start_time')) {
        setStartTime(query.start_time);
      }

      if (Object.keys(query).includes('end_time')) {
        setEndTime(query.end_time);
      }

      if (Object.keys(query).includes('audiences')) {
        const audienceArray = query.audiences.split(',');
        audienceArray.forEach((item: string) => addAudience(item));
      }

      if (Object.keys(query).includes('type_id')) {
        setTypeId(query.type_id);
      } else if (props.typeId) {
        setTypeId(props.typeId);
      }

      setFirstLoadDone(true);
    }
  }, []);

  useEffect(() => {
    if (!firstLoadDone) return;
    history.push(parseQuery(filters));
  }, [filters]);

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useEventsQuery({
    page: page,
    searchTerm: filters.search || '',
    keyword: filters.eventTypes,
    features: Array.isArray(filters.eventFeatures) ? filters.eventFeatures.join('&') : '',
    bbox: filters.bbox.north ? Object.values(filters.bbox).join(',') : '',
    start_time: filters.startTime ? dayjs(filters.startTime).format('YYYY-MM-DD') : '',
    end_time: filters.endTime ? dayjs(filters.endTime).format('YYYY-MM-DD') : '',
    audiences: filters.audiences,
    type_id: filters.typeId ? filters.typeId : '',
  });

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.eventTypes]);

  let listComponent;
  switch (options.listView) {
    case 'grid':
      listComponent = <GridList events={data?.data} />;
      break;
    case 'vertical':
      listComponent = <VerticalList events={data?.data} />;
      break;
    case 'horizontal':
      listComponent = <HorizontalList events={data?.data} />;
      break;
    default:
      listComponent = <GridList events={data?.data} />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Title />
      {options.showSearch && (
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
          <Box sx={{ position: 'absolute', left: '50%', top: '50%' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <h2>{`${t('noEventsFound')}`}</h2>
        ) : (
          <div>
            {listComponent}
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
              >{`${t('loadMore')}`}</Button>
            </div>
          </div>
        )}
      </Grid>
      <LinkContainer />
    </Box>
  );
};

export default EventList;
