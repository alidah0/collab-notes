import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Board from './components/Board';
import Join from './components/Join';
import NotFound from './components/NotFound';
import Header from './components/Header';

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
        <h1 style={{ textAlign: 'center', marginTop: '400px' }}>Loading...</h1>
      ) : (
        <div>
          <Header
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
                render={() => <Join authenticate={authenticate} user={user} />}
              />
              <Route path="/board" render={() => <Board />} />
              <Route path="/404" render={() => <NotFound />} />
              <Redirect to="/404" />
            </Switch>
          </BrowserRouter>
        </div>
      )}
      )
    </>
  );
}
export default App;
