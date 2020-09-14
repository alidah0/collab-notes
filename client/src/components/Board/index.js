import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Form from '../Form';
import Notes from '../Notes';
import EditForm from '../EditForm';
import Toolbar from '../Toolbar';
import Trash from '../../assets/trash2.svg';
import OnlineUsers from '../OnlineUsers';
import Notifications from '../Notifications';
import spinner2 from '../../assets/main_spinner.svg';

import './style.css';

let socket;
const ENDPOINT = 'http://localhost:3000/';

const Board = ({ nameq, boardname, leave }) => {
  const [board, setBoard] = useState('');
  const [notes, setNotes] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [notesToEdit, setNotesToEdit] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [notifyText, setNotifyText] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showOnlineUsers, setOnlineUsers] = useState(false);
  const history = useHistory();
  const { location } = window;
  useEffect(() => {
    if (!nameq || !boardname) {
      history.push('/');
    }
    socket = io(ENDPOINT);

    socket.emit('join', { nameq, boardname }, (error) => {
      setBoard(boardname);
      if (error) {
        console.log(error);
      }
    });
    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [location.search, history, nameq, boardname]);

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
      socket.off();
    };
  }, [users, notifyText]);

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

  const leaveBoard = () => {
    leave();
    socket.close();
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
      <Toolbar
        usersLength={users.length}
        clearAllNotes={clearAllNotes}
        leaveBoard={leaveBoard}
        isFormClicked={() => setShowForm(!showForm)}
        isOnlineClicked={() => setOnlineUsers(!showOnlineUsers)}
      />
      <header className="App-header">
        <p className="App-header__board-name">
          {!board ? (
            <img
              src={spinner2}
              className="spinner_board"
              alt="loading-spinner"
            />
          ) : (
            board
          )}
        </p>
        <div className="wrapper">
          {showOnlineUsers ? <OnlineUsers users={users} /> : null}
          {showForm ? (
            <Form
              isClicked={() => setShowForm(false)}
              createPostit={createPostit}
            />
          ) : null}
        </div>
        <div
          className="trash-can"
          onDrop={() => onDrop()}
          onDragOver={(e) => onDragOver(e)}
        >
          <img className="trash-img" src={Trash} alt="trash-bin" />
        </div>
      </header>
      <ul className="App__notes">{renderNotes}</ul>
      {editScreen}
    </div>
  );
};

Board.propTypes = {
  nameq: PropTypes.string.isRequired,
  boardname: PropTypes.string.isRequired,
  leave: PropTypes.func.isRequired,
};

export default Board;
