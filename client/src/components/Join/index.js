import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import './style.css';

const Join = () => {
  const [board, setBoard] = useState('');
  const [user, setUser] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:4000/login/success', {
        withCredentials: true,
      })
      .then((res) => {
        setAuthenticate(true);
        setUser(res.data.user);
        setProfilePic(res.data.user.picture);
      })
      .catch(() => {
        setAuthenticate(false);
      });
  }, []);
  const storeBoard = async (e) => {
    console.log('this is name and board from join', user.username, board);
    const owner = user.username;
    if (!board) {
      e.preventDefault();
    }
    await axios
      .post('/addboard', { board, owner })
      .then((res) => console.log(res.data.msg))
      .catch(null);
    // clear state to clear the input
    // redirect to chat component to start work
  };

  const handleNotAuthenticated = () => setAuthenticate(false);

  return (
    <div>
      <Header
        authenticate={authenticate}
        handleNotAuthenticated={handleNotAuthenticated}
        profileIMG={profilePic}
      />
      <div>
        {!authenticate ? (
          <h1 className="titles">Welcome! Sign in to join a Board</h1>
        ) : (
          <div className="join-wraper">
            <div className="titles">
              <h1>You are in!</h1>
              <h1>Welcome {user.username}!</h1>
            </div>
            <br />
            <div>
              <input
                placeholder="Enter the Board name"
                type="text"
                onChange={(event) => setBoard(event.target.value)}
              />
            </div>

            <Link
              onClick={storeBoard}
              to={`/board?nameq=${user.username}&boardname=${board}`}
            >
              <button className="btn" type="button">
                Access or create
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
