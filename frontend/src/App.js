import "./App.css";
import Register from "./pages/Register/Register";
import Navigation from "../src/components/shared/Navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Auth from "./pages/authenticate/Auth";
const isAuth = false;
function App() {
  return (
    <div className="container">
      <Router>
        <Navigation />
        <Switch>
          <GuestRoute path="/" exact>
            <Login />
          </GuestRoute>
          <GuestRoute path="/register" exact>
            <Register />
          </GuestRoute>

          {/* <GuestRoute path="/authenticate">
            <Auth />
          </GuestRoute> */}
        </Switch>
      </Router>
    </div>
  );
}
const GuestRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    ></Route>
  );
};

export default App;
