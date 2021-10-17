import "./App.css";
import Home from "./pages/Register/Register";
import Navigation from "../src/components/shared/Navigation/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
function App() {
  return (
    <div className="container">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
