import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Board from './components/Board';
import Join from './components/Join';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import spinner from './assets/main_spinner.svg';

import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [profileName, setProfileName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [authenticate, setAuthenticate] = useState(false);
  const [authLoad, setAuthLoad] = useState(false);
  useEffect(() => {
    setAuthLoad(true);
    axios
      .get('/login/success', {
        withCredentials: true,
      })
      .then((res) => {
        setAuthenticate(true);
        setUser(res.data.user);
        setProfileName(res.data.user.username);
        setProfilePic(res.data.user.picture);
        setAuthLoad(false);
      })
      .catch(() => {
        setAuthLoad(false);
        setAuthenticate(false);
      });
    return () => {
      setAuthLoad(false);
    };
  }, []);
  return (
    <>
      {authLoad ? (
        <div className="app__loading">
          <img className="app__loading__svg" src={spinner} alt="loading-icon" />
        </div>
      ) : (
        <div>
          <Navbar
            authenticate={authenticate}
            handleNotAuthenticated={() => setAuthenticate(false)}
            profileIMG={profilePic}
            profileName={profileName}
            loading={authLoad}
          />
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Join
                    authenticate={authenticate}
                    user={!user ? null : user}
                  />
                )}
              />
              <Route path="/board" render={() => <Board />} />
              <Route path="/404" render={() => <NotFound />} />
              <Redirect to="/404" />
            </Switch>
          </BrowserRouter>
        </div>
      )}
    </>
  );
}
export default App;
