import { bindActionCreators } from "@reduxjs/toolkit";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
import EventContent from "./components/pages/events/EventContent";
import EventList from "./components/pages/events/EventList";
import filterSlice from "./redux/slices/filterSlice";
import optionsSlice from './redux/slices/optionsSlice'
import { useAppDispatch, useAppSelector } from './hooks/rtkHooks';
import {
  whiteLabelTheme,
  vinkTheme,
  naantaliTheme,
  raisioTheme,
  kaarinaTheme,
  taiTheme,
} from "./styles/styles";
import "./translations/i18n";
import { useEffect } from "react";

export interface AppProps {
  data: {
    [key: string]: string;
  };
}

const App = (props: AppProps) => {
  const dispatch = useAppDispatch()
  const { setTitle, setDescription, setStyle, setListView, setNumOfView, setHideSearchCriteria, setLanguageSelection, setLinkContainer } = bindActionCreators(optionsSlice.actions, dispatch)
  const { setSearch, setEventTypes, setFeatures, setStartTime, setEndTime, addAudience, setTypeId } = bindActionCreators(filterSlice.actions, dispatch)
  const data = props.data;

  useEffect(() => {
    setTypeId(data.typeid);
    setSearch(data.search);
    setTitle(data.title);
    setDescription(data.description);
    setStyle(data.style);
    setListView(data.listview);
    setNumOfView(isNaN(parseInt(data.numofview)) ? null : parseInt(data.numofview));
    setHideSearchCriteria(data.hidesearchcriteria === "true" ? true : false);
    setLanguageSelection(data.languageselection);
    setLinkContainer(data.linkcontainer);
   })

  let theme;
  switch(data.style) {
    case "whitelabel":
      theme = whiteLabelTheme
      break
    case "vink":
      theme = vinkTheme
      break
    case "naantali":
      theme = naantaliTheme
      break
    case "raisio":
      theme = raisioTheme
      break
    case "kaarina":
      theme = kaarinaTheme
      break
    case "tai":
      theme = taiTheme
      break
    default:
      theme = vinkTheme
  }

  return (
    <ThemeProvider theme={theme}>
      <HashRouter hashType={"noslash"}>
        <Switch>
          <Route exact path={"/"}>
            <EventList />
          </Route>
          <Route path="/eventlist/:id" component={EventContent} />
          <Route path="/hobbies"  />
          <Route path="/educations"  />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
