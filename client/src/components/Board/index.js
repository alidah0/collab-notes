import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Form from '../Form';
import Notes from '../Notes';

import Trash from '../../assets/trash.svg';
import './style.css';

let socket;
const ENDPOINT = 'http://localhost:4000/';

const Board = ({ location }) => {
  const [name, setName] = useState('');
  const [board, setBoard] = useState('aliroom');
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
  // const [editForm, setEditForm] = useState(false);
  const [notesToEdit, setNotesToEdit] = useState(undefined);
  // const [users, setUsers] = useState('');
  useEffect(() => {
    const { nameq, boardname } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(nameq);
    setBoard(boardname);

    // window.history.pushState({}, document.title, '/');

    socket.emit('join', { nameq, board }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search, board]);

  useEffect(() => {
    // socket.on('boardData', ({ users, data }) => {
    //   console.log(users);
    //   setUsers(users);
    //   setNotes(data);
    // });

    socket.on('createPost', (oldNotes) => {
      setNotes(oldNotes);
    });
    socket.on('delete', (newNotesArray) => {
      setNotes(newNotesArray);
    });
    socket.on('update', (oldNotes) => {
      setNotes(oldNotes);
    });
  }, [notes]);

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
    // setEditForm(true);
  };

  // const updatePostIt = (colour, title, content) => {
  //   const oldNotes = [...notes];
  //   const editedNote = notesToEdit;
  //   editedNote.colour = colour;
  //   editedNote.title = title;
  //   editedNote.content = content;
  //   editedNote.key = title + Math.random();
  //   oldNotes.push(editedNote);
  //   socket.emit('update', { board, oldNotes });
  //   setNotes(oldNotes);
  //   setEditForm(false);
  // };

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
            colour={p.colour}
            title={p.title}
            content={p.content}
            key={p.key}
            onClick={() => findPostToEdit(p.key)}
            onDragStart={() => onDragStart(p.key)}
          />
        ))
        .reverse()}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Collab Notes</h1>
        <div className="wrapper">
          <Form createPostit={createPostit} />
        </div>
        <div
          className="trash-can"
          onDrop={() => onDrop()}
          onDragOver={(e) => onDragOver(e)}
        >
          {' '}
          <img className="trash-can" src={Trash} alt="trash-bin" />{' '}
          <h4> Drag & Drop</h4>
        </div>
      </header>
      <ul>{renderNotes}</ul>
    </div>
  );
};

Board.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Board;
