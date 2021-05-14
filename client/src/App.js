import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingPage from "./pages/Bookings";
import MainNavigation from "./component/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";

const App = (props) => {
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (userToken && userId) {
      setToken(userToken);
      setUserId(userId);
    }
  }, []);

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = ({ token, userId, tokenExpiration }) => {
    setToken(token);
    setUserId(userId);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("tokenExpires", tokenExpiration);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId", userId);
    localStorage.removeItem("tokenExpires");
  };

  return (
    <Router>
      <React.Fragment>
        <AuthContext.Provider value={{ token, userId, login, logout }}>
          {" "}
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {!token && <Redirect from="/" to="/auth" exact />}
              {token && <Redirect from="/" to="/events" exact />}
              {token && <Redirect from="/auth" to="/events" exact />}

              <Route path="/" exact component={null} />
              {!token && <Route path="/auth" exact component={AuthPage} />}
              {token && (
                <Route path="/bookings" exact component={BookingPage} />
              )}
              <Route path="/events" exact component={EventsPage} />
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </Router>
  );
};

export default App;
