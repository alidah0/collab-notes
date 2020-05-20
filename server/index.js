const express = require('express');

const app = express();

const db = require('./database/db_connection');
const middlewares = require('./services/middlewares');
const { addUser, removeUser, getUsersInRoom } = require('./services/users');
const Board = require('./database/models/Board');

app.disable('x-powered-by');
app.set('port', process.env.PORT || 4000);
require('./services/passport');

app.use(middlewares);

db
  // eslint-disable-next-line no-console
  .on('open', () => console.log('db is connected'))
  .on('error', () => process.exit(1));

const server = app.listen(app.get('port'), () =>
  // eslint-disable-next-line no-console
  console.log(`app is listeing http://localhost:${app.get('port')}`)
);

// eslint-disable-next-line import/order
const io = require('socket.io')(server);

io.on('connect', (socket) => {
  socket.on('join', async ({ nameq, boardname }, callback) => {
    const { error, user } = addUser({ id: socket.id, nameq, boardname });

    if (error) return callback(error);

    await Board.find({ title: boardname }, (err, rows) => {
      if (err) {
        console.log('eroor');
      }
      socket.join(user.boardname);

      socket.broadcast
        .to(user.boardname)
        .emit('message', { text: `${user.nameq} has joined!` });
      io.to(user.boardname).emit('boardData', {
        userss: getUsersInRoom(user.boardname),
        data: rows[0].notes,
      });
    });

    return callback();
  });

  socket.on('createPost', ({ board, oldNotes }) => {
    Board.updateOne({ title: board }, { notes: oldNotes }).then(() => {
      io.to(board).emit('createPost', oldNotes);
    });
  });

  socket.on('delete', ({ board, newNotesArray }) => {
    Board.updateOne({ title: board }, { notes: newNotesArray }).then(() => {
      io.to(board).emit('delete', newNotesArray);
    });
  });
  socket.on('update', ({ board, oldNotes }) => {
    Board.updateOne({ title: board }, { notes: oldNotes }).then(() => {
      io.to(board).emit('update', oldNotes);
    });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.board).emit('message', {
        text: `${user.nameq} has left.`,
      });
      io.to(user.board).emit('boardData', {
        room: user.board,
        users: getUsersInRoom(user.board),
      });
    }
  });
});
