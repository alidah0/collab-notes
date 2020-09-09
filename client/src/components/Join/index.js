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
    return () => {
      setAuthLoad(false);
    };
  }, []);
  const storeBoard = async (e) => {
    e.preventDefault();
    if (board) {
      setCreated(false);
      setLoading(true);
      const owner = user.username;

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
        profileName={user ? user.username : ''}
        loading={authLoad}
      />
      <div>
        {!authenticate ? (
          <div className="titles">
            <h3>Notice! Sign in to join a Board</h3>
            <h1>Welcome to Collab Notes!</h1>
            <p>
              Create a new board or write the board name then access to the
              board right away
            </p>
            <p>
              You can copy the board name and share it with your friends to work
              together on the same board
            </p>
          </div>
        ) : (
          <form className="join-wraper">
            <div className="titles">
              <h3>You are in!</h3>
              <h1>Welcome to Collab Notes!</h1>
              <p>
                Create a new board or write the board name then access to the
                board right away
              </p>
              <p>
                You can copy the board name and share it with your friends to
                work together on the same board
              </p>
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
              type="submit"
            >
              Access or create
            </button>
          </form>
        )}
        <img className="splash" src={design} alt="design-splash" />
      </div>
    </div>
  );
};

export default Join;
