import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import design from '../../assets/svgApp.svg';
import './style.css';

const Join = () => {
  const [board, setBoard] = useState('');
  const [user, setUser] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [authenticate, setAuthenticate] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [isCreated, setCreated] = useState(false);
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
        setProfilePic(res.data.user.picture);
        setAuthLoad(false);
      })
      .catch(() => {
        setAuthLoad(false);
        setAuthenticate(false);
      });
  }, []);
  const storeBoard = async (e) => {
    if (board) {
      setCreated(false);
      setLoading(true);
      const owner = user.username;
      if (!board) {
        e.preventDefault();
      }

      await axios
        .post('/addboard', { board, owner })
        // eslint-disable-next-line no-console
        .then((res) => console.log(res.data.msg))
        .then(() => setLoading(false))
        .then(() => setCreated(true))
        .catch(null);
    }
  };

  const handleNotAuthenticated = () => setAuthenticate(false);

  return (
    <div>
      <Header
        authenticate={authenticate}
        handleNotAuthenticated={handleNotAuthenticated}
        profileIMG={profilePic}
        loading={authLoad}
      />
      <div>
        {!authenticate ? (
          <h1 className="titles">Welcome! Sign in to join a Board</h1>
        ) : (
          <div className="join-wraper">
            <div className="titles">
              <h1>You are in!</h1>
              <h1>Welcome {user && user.username}!</h1>
            </div>
            <br />
            <div>
              <input
                placeholder="Enter the Board name"
                type="text"
                onChange={(event) => setBoard(event.target.value)}
              />
            </div>
            {isCreated && (
              <Redirect
                push
                to={`/board?nameq=${user.username}&boardname=${board}`}
              />
            )}
            <button
              onClick={storeBoard}
              disabled={Loading}
              className="btn"
              type="button"
            >
              Access or create
            </button>
          </div>
        )}
        <img className="splash" src={design} alt="design-splash" />
      </div>
    </div>
  );
};

export default Join;
