import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import EducationList from "./components/pages/educations/EducationList";
import EventContent from "./components/pages/events/EventContent";
import EventList from "./components/pages/events/EventList";
import HobbyList from "./components/pages/hobbies/HobbyList";

function App() {
  return (
    <Router>
      <Route component={Nav} />
      <Switch>
        <Route exact path="/" component={EventList} />
        <Route path="/eventlist/:id" component={EventContent} />
        <Route path="/hobbies" component={HobbyList} />
        <Route path="/educations" component={EducationList} />
      </Switch>
    </Router>
  );
}

export default App;
