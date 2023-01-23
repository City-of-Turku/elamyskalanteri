import { ThemeProvider } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import EventContent from './components/pages/events/EventContent';
import EventList from './components/pages/events/EventList';
import { getTheme } from './functions/getTheme';
import { useAppDispatch } from './hooks/rtkHooks';
import filterSlice from './redux/slices/filterSlice';
import optionsSlice from './redux/slices/optionsSlice';
import TranslationProvider from './translations/TranslationProvider';

export interface AppProps {
  data: Record<string, string>;
}

const App = (props: AppProps) => {
  const dispatch = useAppDispatch();
  const {
    setTitle,
    setDescription,
    setStyle,
    setListView,
    setNumOfView,
    setHideSearchCriteria,
    setLanguageSelection,
    setLinkContainer,
    setLinkText,
  } = bindActionCreators(optionsSlice.actions, dispatch);
  const {
    setSearch,
    setEventTypes,
    // setFeatures,
    // setStartTime,
    // setEndTime,
    // addAudience,
    setTypeId,
  } = bindActionCreators(filterSlice.actions, dispatch);
  const data = props.data;

  useEffect(() => {
    setEventTypes([data.keywords]);
    setTypeId(data.typeid);
    setSearch(data.search);
    setTitle(data.title);
    setDescription(data.description);
    setStyle(data.style);
    setListView(data.listview);
    setNumOfView(isNaN(parseInt(data.numofview)) ? null : parseInt(data.numofview));
    setHideSearchCriteria(data.hidesearchcriteria === 'true' ? true : false);
    setLanguageSelection(data.languageselection);
    setLinkContainer(data.linkcontainer);
    setLinkText(data.linktext);
  });

  return (
    <TranslationProvider selectedLanguage={data.languageselection}>
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
