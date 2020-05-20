import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const Join = () => {
  const [board, setBoard] = useState('');
  const [user, setUser] = useState('');
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:4000/login/success', {
        withCredentials: true,
      })
      .then((res) => {
        setAuthenticate(true);
        setUser(res.data.user);
      })
      .catch(() => {
        setAuthenticate(false);
      });
  }, []);
  const storeBoard = async (e) => {
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
      />
      <div>
        {!authenticate ? (
          <h1>Welcome! Sign in to join a Board</h1>
        ) : (
          <div>
            <h1>You are in!</h1>
            <h1>Welcome {user.username}!</h1>
            <h1 className="heading">Join</h1>
            <div>
              <input
                placeholder="Enter the Board name"
                type="text"
                onChange={(event) => setBoard(event.target.value)}
              />
            </div>

            <Link
              onClick={storeBoard}
              to={`/chat?name=${user.username}&board=${board}`}
            >
              <button type="button">Access or create board</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
