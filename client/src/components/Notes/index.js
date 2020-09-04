import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Notes = (props) => {
  const { colour, title, content, onClick, onDragStart } = props;
  const backgroundColour = colour;

  const colourstyle = {
    backgroundColor: backgroundColour,
  };

  return (
    <div
      draggable
      className="post-it"
      style={colourstyle}
      onDragStart={() => onDragStart()}
    >
      <ul>
        <h3>{title}</h3>
        <li>{content}</li>
        <button type="button" className="smallbtn" onClick={() => onClick()}>
          Edit
        </button>
      </ul>
    </div>
  );
};

Notes.propTypes = {
  colour: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default Notes;
