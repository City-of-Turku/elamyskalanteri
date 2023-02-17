import { ThemeProvider } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import CSSVariableProvider from './components/CSSVariableProvider/CSSVariableProvider';
import EventContent from './components/pages/EventContent';
import EventList from './components/pages/EventList';
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
    setShowSearch,
    setTheme,
    setTitle,
    setShowEmbedTool,
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
    // Apply options
    setDescription(data.description);
    setLanguageSelection(data.language);
    setLinkContainer(data.linkUrl);
    setLinkText(data.linkText);
    setListView(getLayoutOption(data.layout));
    setNumOfVisibleResults(
      isNaN(parseInt(data.numOfVisibleResults)) ? null : parseInt(data.numOfVisibleResults),
    );
    setShowSearch(data.showSearch === 'true' ? true : false);
    setTheme(data.theme);
    setTitle(data.title);
    setShowEmbedTool(data.showEmbedTool === 'true' ? true : false);
    // TODO
    // setOpenInNewWindow(data.openInNewWindow === 'true' ? true : false);

    // Apply filters
    setAudience(data.audience ? [data.audience] : []);
    setEndTime(getApiFormattedDate(data.timeEnd));
    setEventTypes(data.keywords ? [data.keywords] : []);
    setFeatures(data.features ? [data.features] : []);
    setSearch(data.search);
    setStartTime(
      // Always set start time to today if no start time is provided
      data.timeStart ? getApiFormattedDate(data.timeStart) : getApiFormattedDate(new Date()),
    );
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
