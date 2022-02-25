import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import EducationList from "./components/pages/Educations/EducationList";
import EventList from "./components/pages/Events/EventList";
import HobbyList from "./components/pages/Hobbies/HobbyList";

function App() {
  return (
    <Router>
      <Route component={Nav} />
      <Switch>
        <Route exact path="/" component={EventList} />
        <Route path="/hobbies" component={HobbyList} />
        <Route path="/educations" component={EducationList} />
      </Switch>
    </Router>
  );
}

export default App;
