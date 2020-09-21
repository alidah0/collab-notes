import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Board from '../Board';

import design from '../../assets/svgApp.svg';
import './style.css';

const Join = ({ authenticate, user }) => {
  const [board, setBoard] = useState('');
  const [Loading, setLoading] = useState(false);
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState('');
  const storeBoard = async (e) => {
    e.preventDefault();
    if (board) {
      setCreated(false);
      setLoading(true);
      const owner = user;

      await axios
        .post('/addboard', { board, owner })
        // eslint-disable-next-line no-console
        .then((res) => console.log(res.data.msg))

        .then(() => {
          setError('');
          setLoading(false);
        })
        .then(() => setCreated(true))
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {isCreated ? (
        <Board leave={() => setCreated(false)} nameq={user} boardname={board} />
      ) : (
        <div>
          <form className="join-wraper">
            <div className="titles">
              {!authenticate ? (
                <>
                  <h3>Notice! Sign in to join the boards with your name</h3>
                  <p>you are now identified as a Guest</p>
                </>
              ) : (
                <h3>You are in!</h3>
              )}
              <h1>Welcome to Collab Notes!</h1>
              <p>
                Create a new board or write the board name then access to the
                board right away
              </p>
              <p>
                You can copy the board name and share it with your friends to
                work together collaborating on the same board
              </p>
            </div>
            <p>Enter : &apos; Tech Board &apos; a Baord for testing</p>
            <div className="error-msg">{error}</div>
            <div className="access-box">
              <input
                maxLength="51"
                placeholder="Enter the Board name"
                type="text"
                onChange={(event) => setBoard(event.target.value)}
                value={board}
              />

              <button
                onClick={storeBoard}
                disabled={Loading}
                className="btn"
                type="submit"
              >
                Access or create
              </button>
            </div>
          </form>
          <img className="splash" src={design} alt="design-splash" />
        </div>
      )}
    </div>
  );
};

Join.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};

export default Join;
