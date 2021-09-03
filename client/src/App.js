import './App.css';
import { BrowserRouter as Router, 
Switch, Route, Link } from "react-router-dom";
import Landing from "./pages/landing/Landing.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
