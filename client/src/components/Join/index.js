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
      const owner = user.username;

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
        user && (
          <Board
            leave={() => setCreated(false)}
            nameq={user.username}
            boardname={board}
          />
        )
      ) : (
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
                You can copy the board name and share it with your friends to
                work together on the same board
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
              <div className="error-msg">{error}</div>
              <div className="access-box">
                <input
                  placeholder="Enter the Board name"
                  type="text"
                  onChange={(event) => setBoard(event.target.value)}
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
          )}
          <img className="splash" src={design} alt="design-splash" />
        </div>
      )}
    </div>
  );
};

Join.defaultProps = {
  user: '',
};

Join.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    picture: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
  }),
};

export default Join;
