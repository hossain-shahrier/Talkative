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
import Activate from "./pages/activate/Activate";
import Rooms from "./pages/rooms/Rooms";
const isAuth = true;
const user = {
  activated: true,
};
function App() {
  return (
    <div className="container">
      <Router>
        <Navigation />
        <Switch>
          {/* Guest */}
          <GuestRoute path="/" exact>
            <Login />
          </GuestRoute>
          <GuestRoute path="/register" exact>
            <Register />
          </GuestRoute>
          {/* Semi-Protected */}
          <SemiProtectedRoute path="/activate" exact>
            <Activate />
          </SemiProtectedRoute>
          {/* Protected */}
          <ProtectedRoute path="/rooms" exact>
            <Rooms />
          </ProtectedRoute>
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
const SemiProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
};
const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: "/activate",
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
