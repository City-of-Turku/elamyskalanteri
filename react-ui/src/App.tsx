import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
import Nav from "./components/nav/Nav";
import EventContent from "./components/pages/events/EventContent";
import EventList from "./components/pages/events/EventList";
import CompactList from "./components/pages/events/CompactList";
import {
  whiteLabelTheme,
  vinkTheme,
  naantaliTheme,
  raisioTheme,
  kaarinaTheme,
  taiTheme,
} from "./styles/styles";
import "./translations/i18n";

export interface AppProps {
  data: {
    [key: string]: string;
  };
}

const App = (props: AppProps) => {
  const data = props.data;
  return (
    <ThemeProvider theme={vinkTheme}>
      <HashRouter hashType={"noslash"}>
        {/* {data.navbar !== "hidden" && <Route component={Nav} />} */}
        <Switch>
          <Route exact path={"/"}>
            {data.type === "normal" ? (
              <EventList advancedEditor={data.advancededitor === "true"} />
            ) : (
              <CompactList dataAttributes={data} />
            )}
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
