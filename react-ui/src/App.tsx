import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
import Nav from "./components/nav/Nav";
import EducationList from "./components/pages/educations/EducationList";
import EventContent from "./components/pages/events/EventContent";
import EventList from "./components/pages/events/EventList";
import CompactList from "./components/pages/events/CompactList";
import HobbyList from "./components/pages/hobbies/HobbyList";
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
  console.log(props.data);
  return (
    <ThemeProvider theme={vinkTheme}>
      <HashRouter hashType={"noslash"}>
        {data.navbar !== "hidden" && <Route component={Nav} />}
        <Switch>
          <Route exact path={"/"}>
            {data.type === "normal" ? (
              <EventList />
            ) : (
              <CompactList dataAttributes={data} />
            )}
          </Route>
          <Route path="/eventlist/:id" component={EventContent} />
          <Route path="/hobbies" component={HobbyList} />
          <Route path="/educations" component={EducationList} />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
