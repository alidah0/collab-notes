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
import './style.css';

let socket;
const ENDPOINT = 'http://localhost:4000/';

const Board = ({ location }) => {
  const [board, setBoard] = useState('');
  const [notes, setNotes] = useState([
    {
      title: 'think about relish',
      content: 'mustard, tomato, fruit',
      colour: 'pink',
      key: '123hj$%656',
    },
    {
      title: 'pat the cat',
      content: 'scratch behind the airs and sing to him',
      colour: 'blue',
      key: '456k$%6lMy45',
    },
  ]);
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
      {notifyText.length > 0 && <Notifications text={notifyText} />}
      <header className="App-header">
        <h1 className="app-title">Collab Notes</h1>
        <h4>Board Name: {board}</h4>
        <div className="wrapper">
          <OnlineUsers users={users} />
          <Form createPostit={createPostit} />
        </div>
        <div
          className="trash-can"
          onDrop={() => onDrop()}
          onDragOver={(e) => onDragOver(e)}
        >
          {' '}
          <img className="trash-can" src={Trash} alt="trash-bin" />{' '}
        </div>
      </header>
      <ul>{renderNotes}</ul>
      {editScreen}
    </div>
  );
};

Board.propTypes = {
  location: PropTypes.objectOf(string).isRequired,
};

export default Board;
