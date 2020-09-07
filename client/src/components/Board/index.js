import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import PropTypes, { string } from 'prop-types';
import Form from '../Form';
import Notes from '../Notes';
import EditForm from '../EditForm';
import Trash from '../../assets/trash.svg';
import OnlineUsers from '../OnlineUsers';
import Notifications from '../Notifications';
import LeaveBoard from '../LeaveBoard';
import Logo from '../../assets/logo.png';

import './style.css';

let socket;
const ENDPOINT = 'http://localhost:4000/';

const Board = ({ location }) => {
  const [board, setBoard] = useState('');
  const [notes, setNotes] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [notesToEdit, setNotesToEdit] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [notifyText, setNotifyText] = useState([]);

  useEffect(() => {
    const { nameq, boardname } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    window.history.pushState({}, document.title, '/');

    socket.emit('join', { nameq, boardname }, (error) => {
      setBoard(boardname);
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('notification', (text) => {
      setNotifyText([...notifyText, text]);
      setTimeout(() => {
        setNotifyText(notifyText.filter((p) => p !== text));
      }, 3000);
    });
    socket.on('boardData', ({ userss, data }) => {
      setUsers(userss);
      setNotes(data);
    });

    socket.on('createPost', (oldNotes) => {
      setNotes(oldNotes);
    });
    socket.on('delete', (newNotesArray) => {
      setNotes(newNotesArray);
    });
    socket.on('update', (oldNotes) => {
      setNotes(oldNotes);
    });
    return () => {
      socket.emit('disconnect');
      // returned when a user disconnects
      socket.off();
    };
  }, [users, notifyText]);

  // socket.emit('disconnect');

  // };

  const createPostit = (colour, title, content) => {
    const oldNotes = [...notes];
    const newNotes = {};
    newNotes.title = title;
    newNotes.content = content;
    newNotes.colour = colour;
    newNotes.key = title + Math.random();
    oldNotes.push(newNotes);
    socket.emit('createPost', { board, oldNotes });
  };

  const findPostToEdit = (key) => {
    const newNotesArray = [];
    const oldNotes = [...notes];
    let editedNote = {};

    oldNotes.forEach((note) => {
      if (note.key !== key) {
        newNotesArray.push(note);
      } else {
        editedNote = note;
      }
    });
    setNotes(newNotesArray);
    setNotesToEdit(editedNote);
    setEditForm(true);
  };

  const updatePostIt = (colour, title, content) => {
    const oldNotes = [...notes];
    const editedNote = notesToEdit;
    editedNote.colour = colour;
    editedNote.title = title;
    editedNote.content = content;
    editedNote.key = title + Math.random();
    oldNotes.push(editedNote);
    socket.emit('update', { board, oldNotes });
    setNotes(oldNotes);
    setEditForm(false);
  };

  const onDragStart = (key) => {
    const oldNotes = [...notes];
    let editedNote = {};
    oldNotes.forEach((note) => {
      if (note.key === key) {
        editedNote = note;
      }
      setNotesToEdit(editedNote);
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = () => {
    const { key } = notesToEdit;
    const newNotesArray = [];
    const oldNotes = [...notes];
    oldNotes.forEach((note) => {
      if (note.key !== key) {
        return newNotesArray.push(note);
      }
      return null;
    });
    socket.emit('delete', { board, newNotesArray });
  };

  const clearAllNotes = () => {
    socket.emit('delete', { board, newNotesArray: [] });
  };

  const renderNotes = (
    <div>
      {notes
        .map((p) => (
          <Notes
            key={p.key}
            colour={p.colour}
            title={p.title}
            content={p.content}
            onClick={() => findPostToEdit(p.key)}
            onDragStart={() => onDragStart(p.key)}
          />
        ))
        .reverse()}
    </div>
  );
  let editScreen;
  if (editForm) {
    editScreen = (
      <EditForm
        colour={notesToEdit.colour}
        title={notesToEdit.title}
        content={notesToEdit.content}
        editNote={updatePostIt}
      />
    );
  }

  return (
    <div className="App">
      {notifyText && <Notifications text={notifyText} />}
      <header className="App-header">
        <img className="app-title" src={Logo} alt="Logo-title" />
        <p className="App-header__board-name">
          Board Name <br /> {!board ? 'fetching..' : board}
        </p>
        <div className="wrapper">
          <OnlineUsers users={users} />
          <Form createPostit={createPostit} />
        </div>
        <div
          className="trash-can"
          onDrop={() => onDrop()}
          onDragOver={(e) => onDragOver(e)}
        >
          <button type="button" className="trash-btn" onClick={clearAllNotes}>
            Clear All
          </button>
          <img className="trash-img" src={Trash} alt="trash-bin" />
        </div>
        <LeaveBoard disconnet={() => socket.close()} />
      </header>
      <ul>{renderNotes}</ul>
      {editScreen}
    </div>
  );
};

Board.defaultProps = {
  Notifications: [],
};

Board.propTypes = {
  location: PropTypes.objectOf(string).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  Notifications: PropTypes.arrayOf(string),
};

export default Board;
