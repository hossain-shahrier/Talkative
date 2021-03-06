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
// import Activate from "./pages/activate/Activate";
import Rooms from "./pages/rooms/Rooms";
import Auth from "./pages/authenticate/Auth";

import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import User from "./pages/user/User";
function App() {
  // Call refresh endpoint
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Loading, Please wait..." />
  ) : (
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
          {/* Registered */}
          <RegisteredRoute path="/authenticate" exact>
            <Auth />
          </RegisteredRoute>
          {/* Semi-Protected */}
          {/* <SemiProtectedRoute path="/register" exact>
            <Register />
          </SemiProtectedRoute> */}
          {/* Protected */}
          <ProtectedRoute path="/rooms" exact>
            <Rooms />
          </ProtectedRoute>
          <ProtectedRoute path="/:id" exact>
            <User />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}
const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.auth);
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
const RegisteredRoute = ({ children, ...rest }) => {
  const { isRegistered } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isRegistered ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/register",
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
};
// const SemiProtectedRoute = ({ children, ...rest }) => {
//   const { user, isAuth } = useSelector((state) => state.auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         !isAuth ? (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: location },
//             }}
//           />
//         ) : isAuth && !user.activated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/rooms",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     ></Route>
//   );
// };
const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
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
        ) : isAuth && !user ? (
          <Redirect
            to={{
              pathname: "/register",
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
