import { ThemeProvider } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import CSSVariableProvider from './components/CSSVariableProvider/CSSVariableProvider';
import EventContent from './components/pages/EventContent';
import EventList from './components/pages/EventList';
import { arrayFromCommaList } from './functions/arrayFromCommaList';
import { checkUsedAttributes } from './functions/checkUsedAttributes';
import { getApiFormattedDate } from './functions/getFormattedDate';
import { getLayoutOption } from './functions/getLayoutOption';
import { getTheme } from './functions/getTheme';
import { useAppDispatch } from './hooks/rtkHooks';
import { setAttributesLoaded } from './redux/slices/appStateSlice';
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
    setNumOfVisibleResults,
    setOpenInNewWindow,
    setShowEmbedTool,
    setShowPastEvents,
    setShowSearch,
    setTheme,
    setTitle,
  } = bindActionCreators(optionsSlice.actions, dispatch);
  const {
    setAudience,
    setEndTime,
    setEventTypes,
    setFeatures,
    setLocalities,
    setSearch,
    setStartTime,
    setTypeId,
  } = bindActionCreators(filterSlice.actions, dispatch);

  checkUsedAttributes(data);

  useEffect(() => {
    const showPastEvents = data.showPastEvents === 'true' ? true : false;
    const startTime = getApiFormattedDate(data.timeStart);
    const endTime = getApiFormattedDate(data.timeEnd);

    // Apply options
    setDescription(data.description);
    setLanguageSelection(data.language);
    setLinkContainer(data.linkUrl);
    setLinkText(data.linkText);
    setListView(getLayoutOption(data.layout));
    setNumOfVisibleResults(
      isNaN(parseInt(data.numOfVisibleResults)) ? null : parseInt(data.numOfVisibleResults),
    );
    setOpenInNewWindow(data.openInNewWindow === 'true' ? true : false);
    setShowEmbedTool(data.showEmbedTool === 'true' ? true : false);
    setShowPastEvents(showPastEvents);
    setShowSearch(data.showSearch === 'true' ? true : false);
    setTheme(data.theme);
    setTitle(data.title);

    // Apply filters
    setAudience(data.audience ? arrayFromCommaList(data.audience) : []);
    setEndTime(endTime);
    setEventTypes(data.keywords ? arrayFromCommaList(data.keywords) : []);
    setFeatures(data.features ? arrayFromCommaList(data.features) : []);
    setLocalities(data.localities ? arrayFromCommaList(data.localities) : []);
    setSearch(data.search);
    // Always set start time to today if no start time is provided and if showPastEvents is false
    setStartTime(startTime ? startTime : !showPastEvents && getApiFormattedDate(new Date()));
    setTypeId(data.typeId);

    // Set attribute state as loaded
    dispatch(setAttributesLoaded(true));
  });

  return (
    <TranslationProvider selectedLanguage={data.language}>
      <ThemeProvider theme={getTheme(data.theme)}>
        <CSSVariableProvider>
          <HashRouter hashType={'noslash'}>
            <Switch>
              <Route exact path={'/'} component={EventList} />
              <Route path="/event/:id" component={EventContent} />
            </Switch>
          </HashRouter>
        </CSSVariableProvider>
      </ThemeProvider>
    </TranslationProvider>
  );
};

export default App;
