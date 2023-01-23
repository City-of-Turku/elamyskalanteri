import { ThemeProvider } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import EventContent from './components/pages/events/EventContent';
import EventList from './components/pages/events/EventList';
import { checkUsedAttributes } from './functions/checkUsedAttributes';
import { getTheme } from './functions/getTheme';
import { useAppDispatch } from './hooks/rtkHooks';
import filterSlice from './redux/slices/filterSlice';
import optionsSlice from './redux/slices/optionsSlice';
import TranslationProvider from './translations/TranslationProvider';
import { appDataAttributes } from './types';

type AppProps = {
  data: appDataAttributes;
};

const App = (props: AppProps) => {
  const dispatch = useAppDispatch();
  const { data } = props;
  const {
    setDescription,
    setLanguageSelection,
    setLinkContainer,
    setLinkText,
    setListView,
    setNumOfView,
    setShowSearch,
    setTheme,
    setTitle,
  } = bindActionCreators(optionsSlice.actions, dispatch);
  const {
    setAudience,
    setEndTime,
    setEventTypes,
    setFeatures,
    setSearch,
    setStartTime,
    setTypeId,
  } = bindActionCreators(filterSlice.actions, dispatch);

  checkUsedAttributes(data);

  useEffect(() => {
    setAudience(data.audience ? [data.audience] : []);
    setDescription(data.description);
    setEndTime(data.timeEnd ? dayjs(data.timeEnd).format('YYYY-MM-DD') : null);
    setEventTypes(data.keywords ? [data.keywords] : []);
    setFeatures(data.features ? [data.features] : []);
    setLanguageSelection(data.language);
    setLinkContainer(data.linkUrl);
    setLinkText(data.linkText);
    setListView(data.layout);
    setNumOfView(
      isNaN(parseInt(data.numOfVisibleResults)) ? null : parseInt(data.numOfVisibleResults),
    );
    setSearch(data.search);
    setShowSearch(data.showSearch === 'true' ? true : false);
    setStartTime(data.timeStart ? dayjs(data.timeStart).format('YYYY-MM-DD') : null);
    setTheme(data.theme);
    setTitle(data.title);
    setTypeId(data.typeId);
    // TODO
    // setOpenInNewWindow(data.openInNewWindow === 'true' ? true : false);
    // setshowEmbedTool(data.showEmbedTool === 'true' ? true : false);
  });

  return (
    <TranslationProvider selectedLanguage={data.language}>
      <ThemeProvider theme={getTheme(data.theme)}>
        <HashRouter hashType={'noslash'}>
          <Switch>
            <Route exact path={'/'} component={EventList} />
            <Route path="/event/:id" component={EventContent} />
          </Switch>
        </HashRouter>
      </ThemeProvider>
    </TranslationProvider>
  );
};

export default App;
